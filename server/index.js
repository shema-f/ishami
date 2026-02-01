import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import * as quizSource from './data.js';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { getAccessToken, requestToPay, getRequestToPayStatus, normalizeMsisdn } from './services/momo.js';
import { askAssistant } from './services/aiService.js';
import { AIInteraction } from './models/AIInteraction.js';

try {
  const here = path.resolve(process.cwd(), '.env');
  const parent = path.resolve(process.cwd(), '..', '.env');
  const serverEnv = path.resolve(process.cwd(), 'server', '.env');
  const chosen = fs.existsSync(here) ? here : (fs.existsSync(serverEnv) ? serverEnv : (fs.existsSync(parent) ? parent : null));
  if (chosen) dotenv.config({ path: chosen });
} catch {}
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ishami';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms`);
  });
  next();
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err?.stack || err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

await mongoose.connect(MONGODB_URI, { dbName: process.env.MONGODB_DB || undefined });
const { Schema, model, Types } = mongoose;

let mailer = null;
try {
  if (process.env.SMTP_HOST) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
    mailer = transporter;
    try {
      await transporter.verify();
      console.log('SMTP transporter verified');
    } catch (e) {
      console.warn('SMTP verify failed; will attempt to send anyway', e?.message || e);
    }
  } else {
    console.warn('SMTP not configured: set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM');
  }
} catch (e) {
  console.error('SMTP init error', e?.message || e);
}

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  firebaseUid: { type: String, unique: true, sparse: true },
  passwordHash: { type: String, required: true },
  isPro: { type: Boolean, default: false },
  role: { type: String, default: 'user' },
  loginStreak: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  resetToken: { type: String, default: null },
  resetTokenExpires: { type: Date, default: null },
  stats: {
    totalQuizzes: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
    totalQuestions: { type: Number, default: 0 },
    bestScore: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});
const User = model('User', UserSchema);

const QuizSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, default: null },
  questionCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
const Quiz = model('Quiz', QuizSchema);

const QuestionSchema = new Schema({
  quizId: { type: Types.ObjectId, ref: 'Quiz' },
  category: String,
  question: String,
  options: [{ text: String, isCorrect: Boolean }],
  image: { type: String, default: null }
});
const Question = model('Question', QuestionSchema);

const SubmissionSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  answers: [{ questionId: String, selectedOption: Number, isCorrect: Boolean }],
  score: Number,
  totalQuestions: Number,
  timeTakenSeconds: Number,
  createdAt: { type: Date, default: Date.now }
});
SubmissionSchema.index({ createdAt: -1 });
SubmissionSchema.index({ userId: 1, createdAt: -1 });
const Submission = model('Submission', SubmissionSchema);

const PaymentSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  amount: Number,
  phone: String,
  provider: String,
  product: { type: String, default: 'pro' },
  currency: { type: String, default: 'RWF' },
  providerRef: { type: String, default: null },
  status: { type: String, default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});
PaymentSchema.index({ createdAt: -1 });
const Payment = model('Payment', PaymentSchema);

const ResourceSchema = new Schema({
  title: { type: String, required: true },
  titleKiny: { type: String, default: '' },
  type: { type: String, default: 'PDF' }, // PDF | Video | Image
  category: { type: String, default: 'General' },
  premium: { type: Boolean, default: false },
  fileUrl: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  size: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});
const Resource = model('Resource', ResourceSchema);

const IremboSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  fullName: String,
  nationalId: String,
  phone: String,
  email: String,
  language: String,
  testMode: String,
  district: String,
  testDate: String,
  status: { type: String, default: 'PENDING' },
  createdAt: { type: Date, default: Date.now }
});
const IremboApplication = model('IremboApplication', IremboSchema);

const SimulationSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  scenarioId: String,
  score: Number,
  mistakes: Number,
  timeTaken: Number,
  metadata: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});
SimulationSchema.index({ createdAt: -1 });
const Simulation = model('Simulation', SimulationSchema);

const NewsletterSubscriberSchema = new Schema({
  email: { type: String, required: true, unique: true },
  status: { type: String, default: 'SUBSCRIBED' },
  createdAt: { type: Date, default: Date.now }
});
const NewsletterSubscriber = model('NewsletterSubscriber', NewsletterSubscriberSchema);

const NewsletterCampaignSchema = new Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  status: { type: String, default: 'DRAFT' },
  recipientsCount: { type: Number, default: 0 },
  deliveredCount: { type: Number, default: 0 },
  failedCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  sentAt: { type: Date }
});
const NewsletterCampaign = model('NewsletterCampaign', NewsletterCampaignSchema);

const NotificationSchema = new Schema({
  title: String,
  body: String,
  segment: String,
  scheduledAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});
const Notification = model('Notification', NotificationSchema);

const FraudLogSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  type: String,
  message: String,
  meta: Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});
FraudLogSchema.index({ createdAt: -1 });
const FraudLog = model('FraudLog', FraudLogSchema);

// AIInteraction moved to models/AIInteraction.js

async function seed() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ishami.rw';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const exists = await User.findOne({ email: adminEmail });
  if (!exists) {
    const passwordHash = bcrypt.hashSync(adminPassword, 10);
    await User.create({ username: 'Admin', email: adminEmail, passwordHash, isPro: true, role: 'admin' });
  } else if (exists.role !== 'admin') {
    await User.updateOne({ email: adminEmail }, { $set: { role: 'admin', isPro: true } });
  }
  const baseKeys = ['quizData', 'quizData1', 'quizData2', 'quizData3', 'quizData4', 'quizData5', 'quizData6'];
    const baseBundles = [
      { key: 'quizData', title: 'Ibyapa n’Ibirango', category: 'Ibyapa', image: null, arr: quizSource.quizData },
      { key: 'quizData1', title: 'Umuvuduko n’Umutekano', category: 'Umuvuduko', image: null, arr: quizSource.quizData1 },
      { key: 'quizData2', title: 'Uburyo bwo Kugendera', category: 'Uburyo bwo kugenda', image: null, arr: quizSource.quizData2 },
      { key: 'quizData3', title: 'Amatara n’Ihagarara', category: 'Amatara', image: null, arr: quizSource.quizData3 },
      { key: 'quizData4', title: 'Inzira Zihariye', category: 'Inzira', image: null, arr: quizSource.quizData4 },
      { key: 'quizData5', title: 'Ibindi By’ingenzi', category: 'Ibisanzwe', image: null, arr: quizSource.quizData5 },
      { key: 'quizData6', title: 'Ibyateza Impanuka', category: 'Umutekano', image: null, arr: quizSource.quizData6 },
    ].filter(b => Array.isArray(b.arr));

    const extras = Object.entries(quizSource)
      .filter(([k]) => !baseKeys.includes(k))
      .map(([k, v]) => {
        let arr = [];
        if (Array.isArray(v)) {
          if (v.length && v[0] && Array.isArray(v[0].questions)) arr = v[0].questions;
          else arr = v;
        } else if (v && Array.isArray(v.questions)) {
          arr = v.questions;
        }
        return { key: k, title: `Bundle ${k}`, category: 'Mixed', image: null, arr };
      })
      .filter(b => Array.isArray(b.arr) && b.arr.length > 0);

  const bundles = baseBundles.concat(extras);

  for (const b of bundles) {
    const existing = await Quiz.findOne({ title: b.title });
    if (existing) continue;
    const quiz = await Quiz.create({ title: b.title, category: b.category, image: b.image, questionCount: b.arr.length });
      const docs = b.arr
        .filter(q => q && q.question && q.options)
        .map(q => ({
          quizId: quiz._id,
          category: b.category,
          question: q.question,
          options: (Array.isArray(q.options) ? q.options : []).map(o => ({ text: o, isCorrect: String(o) === String(q.correctAnswer) })),
          image: q.imagePlaceholder || q.imageUrl || null
        }));
    if (docs.length) await Question.insertMany(docs);
  }

  // Migration: backfill missing image fields from data.js
  const imageMap = new Map();
  const collect = (arr) => {
    if (!Array.isArray(arr)) return;
    for (const q of arr) {
      if (q && q.question && (q.imagePlaceholder || q.imageUrl)) {
        imageMap.set(q.question, q.imagePlaceholder || q.imageUrl);
      }
    }
  };
  for (const key of Object.keys(quizSource)) {
    const v = quizSource[key];
    if (Array.isArray(v)) {
      if (v.length && v[0] && Array.isArray(v[0].questions)) collect(v[0].questions);
      else collect(v);
    } else if (v && Array.isArray(v.questions)) {
      collect(v.questions);
    }
  }
  const toUpdate = await Question.find({ image: { $in: [null, '', undefined] } }).lean();
  for (const q of toUpdate) {
    const url = imageMap.get(q.question);
    if (url) {
      await Question.updateOne({ _id: q._id }, { $set: { image: url } });
    }
  }
  const rCount = await Resource.countDocuments();
  if (rCount === 0) {
    await Resource.insertMany([
      {
        title: 'Traffic Signs Guide',
        titleKiny: "Ibyapa by'Umuhanda",
        type: 'PDF',
        category: 'Signs',
        premium: false,
        fileUrl: 'https://drive.google.com/file/d/17Pt9vbzRCFVxBps1btslCv98-yFch3C2/view?usp=sharing',
        thumbnail: 'https://placehold.co/640x360?text=Signs',
        size: '2.5 MB'
      },
      {
        title: 'Parking Techniques Video',
        titleKiny: 'Uburyo bwo Gupaka',
        type: 'Video',
        category: 'Practical',
        premium: true,
        fileUrl: '',
        thumbnail: 'https://placehold.co/640x360?text=Practical',
        size: '12.3 MB'
      },
      {
        title: 'Road Safety Handbook',
        titleKiny: 'Handbook y’Umutekano',
        type: 'PDF',
        category: 'Safety',
        premium: false,
        fileUrl: '',
        thumbnail: 'https://placehold.co/640x360?text=Safety',
        size: '3.8 MB'
      },
      {
        title: 'Overtaking Rules Video',
        titleKiny: 'Amategeko yo Gusonga',
        type: 'Video',
        category: 'Advanced',
        premium: true,
        fileUrl: '',
        thumbnail: 'https://placehold.co/640x360?text=Advanced',
        size: '15.7 MB'
      }
    ]);
  }
  await Resource.updateOne(
    { title: 'Ibimenyetso Bimurika' },
    {
      $set: {
        title: 'Ibimenyetso Bimurika',
        titleKiny: 'Ibimenyetso Bimurika',
        type: 'PDF',
        category: "Amategeko y'Umuhanda",
        premium: false,
        fileUrl: 'https://docs.google.com/document/d/1hNs7FsuX8A2qmfpWUXv8TpW_SINS03Nl/edit?usp=drive_link&ouid=115249524283556770107&rtpof=true&sd=true',
        thumbnail: 'https://placehold.co/640x360?text=Ibimenyetso+Bimurika',
        size: ''
      }
    },
    { upsert: true }
  );
  await Resource.updateOne(
    { title: "Ibibazo ku Amategeko y'Umuhanda (PDF)" },
    {
      $set: {
        title: "Ibibazo ku Amategeko y'Umuhanda (PDF)",
        titleKiny: "Ibibazo ku Amategeko y'Umuhanda (PDF)",
        type: 'PDF',
        category: "Amategeko y'Umuhanda",
        premium: false,
        fileUrl: 'https://drive.google.com/file/d/130sYhKdQehDECE262oORiX8_08LNxtbZ/view?usp=drive_link',
        thumbnail: 'https://placehold.co/640x360?text=Ibibazo+ku+Amategeko',
      }
    },
    { upsert: true }
  );
  await Resource.updateOne(
    { title: "Igazeti y'Amategeko y'Umuhanda (PDF)" },
    {
      $set: {
        title: "Igazeti y'Amategeko y'Umuhanda (PDF)",
        titleKiny: "Igazeti y'Amategeko y'Umuhanda (PDF)",
        type: 'PDF',
        category: "Amategeko y'Umuhanda",
        premium: false,
        fileUrl: 'https://drive.google.com/file/d/130sYhKdQehDECE262oORiX8_08LNxtbZ/view?usp=drive_link',
        thumbnail: 'https://placehold.co/640x360?text=Igazeti+y%27Amategeko',
      }
    },
    { upsert: true }
  );
  await Resource.updateOne(
    { title: "AMATEGEKO Y’UMUHANDA🚨🚔🚨IBIBAZO N’IBISUBIZO" },
    {
      $set: {
        title: "AMATEGEKO Y’UMUHANDA🚨🚔🚨IBIBAZO N’IBISUBIZO",
        titleKiny: "AMATEGEKO Y’UMUHANDA🚨🚔🚨IBIBAZO N’IBISUBIZO",
        type: 'Video',
        category: "Amategeko y'Umuhanda",
        premium: false,
        fileUrl: 'https://youtu.be/kueLgkZwagI?si=4woONjSfRP9fqX6k',
        thumbnail: 'https://img.youtube.com/vi/kueLgkZwagI/maxresdefault.jpg',
      }
    },
    { upsert: true }
  );
  await Resource.updateOne(
    { title: "🚨🚨🚗Ikibazo gikunzwe kubazwa mu Gukorera provisoire" },
    {
      $set: {
        title: "🚨🚨🚗Ikibazo gikunzwe kubazwa mu Gukorera provisoire",
        titleKiny: "🚨🚨🚗Ikibazo gikunzwe kubazwa mu Gukorera provisoire",
        type: 'Video',
        category: "Amategeko y'Umuhanda",
        premium: false,
        fileUrl: 'https://youtu.be/goro8MaDq2k?si=YgDYvI4NpS5VBKEv',
        thumbnail: 'https://img.youtube.com/vi/goro8MaDq2k/maxresdefault.jpg',
      }
    },
    { upsert: true }
  );
  await Resource.updateOne(
    { title: "Impuruza (Alarms) & Ibyapa Byo Ku Muhanda (Traffic Signs)" },
    {
      $set: {
        title: "Impuruza (Alarms) & Ibyapa Byo Ku Muhanda (Traffic Signs)",
        titleKiny: "Impuruza & Ibyapa Byo Ku Muhanda",
        type: 'Video',
        category: "Amategeko y'Umuhanda",
        premium: false,
        fileUrl: 'https://youtu.be/kueLgkZwagI?si=4woONjSfRP9fqX6k', // Placeholder, using same for now
        thumbnail: 'https://img.youtube.com/vi/kueLgkZwagI/maxresdefault.jpg',
      }
    },
    { upsert: true }
  );
  await Resource.updateOne(
    { title: "Kwirinda Impanuka (Road Safety Tips)" },
    {
      $set: {
        title: "Kwirinda Impanuka (Road Safety Tips)",
        titleKiny: "Kwirinda Impanuka",
        type: 'Video',
        category: "Amategeko y'Umuhanda",
        premium: false,
        fileUrl: 'https://youtu.be/goro8MaDq2k?si=YgDYvI4NpS5VBKEv', // Placeholder
        thumbnail: 'https://img.youtube.com/vi/goro8MaDq2k/maxresdefault.jpg',
      }
    },
    { upsert: true }
  );
}

// Brevo removed: using Nodemailer SMTP only
await Promise.all([
  User.syncIndexes(),
  Question.syncIndexes(),
  Submission.syncIndexes(),
  Payment.syncIndexes(),
  Resource.syncIndexes(),
  IremboApplication.syncIndexes(),
  Simulation.syncIndexes(),
  Notification.syncIndexes(),
  FraudLog.syncIndexes()
]);
await seed();

// File uploads for admin resources
const upload = multer({ dest: 'server/uploads/' });

// Helpers
function generateToken(user) {
  return jwt.sign({ id: String(user._id), role: user.role, isPro: user.isPro }, JWT_SECRET, { expiresIn: '7d' });
}

function toDirectDownloadUrl(url) {
  const s = String(url || '').trim();
  if (!s) return s;
  try {
    const u = new URL(s);
    if (u.hostname.includes('drive.google.com')) {
      // /file/d/<id>/view or /uc?id=<id>
      const m = s.match(/\/file\/d\/([^/]+)/);
      const id = m ? m[1] : (u.searchParams.get('id') || '');
      if (id) {
        return `https://drive.google.com/uc?export=download&id=${id}`;
      }
    }
    if (u.hostname.includes('docs.google.com') && u.pathname.includes('/document/')) {
      const m = s.match(/\/document\/d\/([^/]+)/);
      const id = m ? m[1] : '';
      if (id) {
        return `https://docs.google.com/document/d/${id}/export?format=pdf`;
      }
    }
  } catch {}
  return s;
}

function normalizeEmail(v) {
  const s = String(v || '').trim().toLowerCase();
  return s || null;
}

function normalizePhone(v) {
  let s = String(v || '').trim().replace(/\s+/g, '');
  if (!s) return null;
  if (s.startsWith('+')) return s;
  if (s.startsWith('07')) return '+250' + s.slice(1);
  return s;
}

async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// provided by services/momo.js

// AUTH
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    const email = normalizeEmail(req.body?.email);
    const phone = normalizePhone(req.body?.phone);
    if (!username || !password || (!email && !phone)) return res.status(400).json({ message: 'Missing fields' });
    let existing = null;
    // Check if username is taken (common issue for 'Account exists' error)
    if (username) {
      const nameTaken = await User.findOne({ username });
      if (nameTaken) return res.status(409).json({ message: 'Username is already taken. Please choose another.' });
    }
    
    if (email) existing = await User.findOne({ email });
    if (!existing && phone) existing = await User.findOne({ phone });
    
    if (existing) {
      // Standard behavior: if account exists, tell user to sign in
      return res.status(409).json({ message: 'Account already exists. Please sign in.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email: email || undefined, phone: phone || undefined, passwordHash, isPro: false, role: 'user', loginStreak: 0, badges: [] });
    
    // Send welcome email
    let welcomeSent = false;
    try {
      if (email) {
        console.log(`Attempting to send welcome email to ${email}...`);
        const subject = 'Welcome to ISHAMI - Rwanda Traffic Rules';
        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;">
              <h1 style="color: #00A3AD; margin: 0;">ISHAMI</h1>
              <p style="color: #666; font-size: 14px;">Master Rwanda Traffic Rules</p>
            </div>
            <div style="padding: 20px 0;">
              <h2 style="color: #333;">Murakaza neza, ${username}!</h2>
              <p style="color: #555; line-height: 1.6;">
                Thank you for joining ISHAMI. You've taken the first step towards mastering Rwanda's traffic rules and acing your driving test.
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://ishami.rw" style="background-color: #00A3AD; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Start Learning</a>
              </div>
            </div>
          </div>
        `;
        const from = process.env.SMTP_FROM || '"ISHAMI" <no-reply@ishami.rw>';
        if (mailer) {
          await mailer.sendMail({ from, to: email, subject, html, sender: process.env.SMTP_USER, envelope: { from: process.env.SMTP_USER, to: email } });
          console.log(`Welcome email (SMTP) sent successfully to ${email}`);
          welcomeSent = true;
        } else {
          console.log('Welcome email skipped: SMTP not configured');
        }
      } else {
        console.log('Welcome email skipped: No email provided');
      }
    } catch (err) {
      console.error('Failed to send welcome email:', err);
    }

    const token = generateToken(user);
    res.json({ token, user: { id: String(user._id), username: user.username, email: user.email, isPro: user.isPro, role: user.role, loginStreak: user.loginStreak, badges: user.badges }, emailSent: welcomeSent });
  } catch (e) {
    if (e && typeof e === 'object' && (e).code === 11000) {
      const identifier = String(req.body?.email || req.body?.phone || '').trim();
      const idEmail = identifier.includes('@') ? normalizeEmail(identifier) : null;
      const idPhone = !idEmail ? normalizePhone(identifier) : null;
      const user = idEmail ? await User.findOne({ email: idEmail }) : await User.findOne({ phone: idPhone });
      if (user) {
        const ok = await bcrypt.compare(String(req.body?.password || ''), user.passwordHash);
        if (ok) {
          const token = generateToken(user);
          return res.json({ token, user: { id: String(user._id), username: user.username, email: user.email, isPro: user.isPro, role: user.role, loginStreak: user.loginStreak, badges: user.badges } });
        }
      }
      return res.status(409).json({ message: 'Account already exists. Please sign in.' });
    }
    res.status(500).json({ message: 'Signup failed' });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { password } = req.body || {};
    const rawEmail = req.body?.email;
    const rawPhone = req.body?.phone;
    const email = normalizeEmail(rawEmail);
    const phone = normalizePhone(rawPhone || (!rawEmail?.includes('@') ? rawEmail : null));
    if (!password) return res.status(400).json({ message: 'Missing password' });
    let user = null;
    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ phone });
    }
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ token, user: { id: String(user._id), username: user.username, email: user.email, isPro: user.isPro, role: user.role, loginStreak: user.loginStreak, badges: user.badges } });
  } catch {
    res.status(500).json({ message: 'Signin failed' });
  }
});

app.post('/api/auth/check', async (req, res) => {
  try {
    const identifier = String(req.body?.identifier || '').trim();
    if (!identifier) return res.status(400).json({ message: 'Missing identifier' });
    const email = identifier.includes('@') ? normalizeEmail(identifier) : null;
    const phone = !email ? normalizePhone(identifier) : null;
    let user = null;
    if (email) user = await User.findOne({ email });
    else if (phone) user = await User.findOne({ phone });
    res.json({ exists: !!user });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/auth/verify', authMiddleware, (req, res) => {
  const u = req.user;
  res.json({ user: { id: String(u._id), username: u.username, email: u.email, isPro: u.isPro, role: u.role, loginStreak: u.loginStreak, badges: u.badges } });
});

app.post('/api/auth/forgot', async (req, res) => {
  try {
    const identifier = String(req.body?.identifier || '').trim();
    if (!identifier) return res.status(400).json({ message: 'Missing identifier' });
    let user = null;
    if (identifier.includes('@')) user = await User.findOne({ email: identifier });
    else user = await User.findOne({ phone: identifier });
    const token = uuidv4();
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    let sent = false;
    if (user) {
      await User.updateOne({ _id: user._id }, { $set: { resetToken: token, resetTokenExpires: expires } });
      const origin = process.env.FRONTEND_URL || 'http://localhost:3000';
      const resetUrl = `${origin}/reset?token=${encodeURIComponent(token)}`;
      console.log(`Processing forgot password for ${user.email} (ID: ${user._id})`);
      if (user.email) {
        try {
          const subject = 'Reset your password - ISHAMI';
          const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e0e0e0;">
                <h1 style="color: #00A3AD; margin: 0;">ISHAMI</h1>
              </div>
              <div style="padding: 20px 0;">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p style="color: #555;">We received a request to reset your password. If this was you, please use the link below to set a new password:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${resetUrl}" style="background-color: #00A3AD; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
                </div>
                <p style="color: #777; font-size: 14px;">Or copy this link to your browser:</p>
                <p style="background: #f5f5f5; padding: 10px; border-radius: 4px; font-family: monospace; word-break: break-all; color: #555;">${resetUrl}</p>
                <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't ask for this, you can ignore this email.</p>
              </div>
            </div>
          `;
          const from = process.env.SMTP_FROM || '"ISHAMI" <no-reply@ishami.rw>';
          if (mailer) {
            await mailer.sendMail({ from, to: user.email, subject, html, sender: process.env.SMTP_USER, envelope: { from: process.env.SMTP_USER, to: user.email } });
            sent = true;
            console.log(`Reset email (SMTP) sent to ${user.email}`);
          } else {
            console.log('Reset email skipped: No mail provider configured', { hasMailer: !!mailer });
          }
        } catch (e) {
          console.error('Failed to send reset email:', e);
        }
      } else {
        console.log('Reset email skipped: No email on user profile');
      }
    }
    res.json({ success: true, sent });
  } catch (e) {
    console.error('Forgot password error:', e?.stack || e);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/reset', async (req, res) => {
  try {
    const token = String(req.body?.token || '').trim();
    const password = String(req.body?.password || '').trim();
    if (!token || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ resetToken: token, resetTokenExpires: { $gt: new Date() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });
    const passwordHash = await bcrypt.hash(password, 10);
    await User.updateOne({ _id: user._id }, { $set: { passwordHash }, $unset: { resetToken: '', resetTokenExpires: '' } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/ai/ask', authMiddleware, async (req, res) => {
  try {
    const { prompt, sentiment, history } = req.body;
    const user = req.user;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const response = await askAssistant(prompt, user.username || 'Mugenzi', sentiment, history);

    // Save interaction
    await AIInteraction.create({
      userId: user._id,
      prompt,
      response,
      sentiment,
      isPro: user.isPro
    });

    res.json({ response, isPro: user.isPro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Social auth (simulated)
app.post('/api/auth/social', async (req, res) => {
  const provider = String(req.body?.provider || '').toLowerCase();
  if (!['google', 'facebook'].includes(provider)) return res.status(400).json({ message: 'Unsupported provider' });
  const email = `${provider}_user_${Date.now()}@example.com`;
  let user = await User.findOne({ email });
  if (!user) {
    const passwordHash = await bcrypt.hash(provider + '-oauth', 10);
    user = await User.create({ username: `${provider}-user`, email, passwordHash, isPro: false, role: 'user', loginStreak: 0, badges: [] });
  }
  const token = generateToken(user);
  res.json({ token, user: { id: String(user._id), username: user.username, email: user.email, isPro: user.isPro, role: user.role, loginStreak: user.loginStreak, badges: user.badges } });
});

app.get('/api/auth/google/start', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/google/callback`;
  if (!clientId) return res.status(400).json({ message: 'Missing GOOGLE_CLIENT_ID' });
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'openid email profile');
  url.searchParams.set('prompt', 'select_account');
  res.redirect(url.toString());
});

app.get('/api/auth/google/callback', async (req, res) => {
  try {
    const code = String(req.query.code || '');
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/google/callback`;
    if (!clientId || !clientSecret) return res.status(400).send('Missing Google OAuth env');
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code' }),
    });
    const tokenJson = await tokenRes.json();
    const accessToken = tokenJson.access_token;
    if (!accessToken) return res.status(400).send('Google auth failed');
    const uRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${accessToken}` } });
    const profile = await uRes.json();
    const email = String(profile.email || '');
    const name = String(profile.name || profile.given_name || 'Google User');
    const normalizedEmail = email || `google_${String(profile.sub || Date.now())}@example.com`;
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      const passwordHash = await bcrypt.hash('google-oauth', 10);
      user = await User.create({ username: name, email: normalizedEmail, passwordHash, isPro: false, role: 'user', loginStreak: 0, badges: [] });
    }
    const token = generateToken(user);
    const origin = process.env.FRONTEND_URL || 'http://localhost:3000';
    const payload = { type: 'oauth_success', token, user: { id: String(user._id), username: user.username, email: user.email, isPro: user.isPro, role: user.role, loginStreak: user.loginStreak, badges: user.badges } };
    const json = JSON.stringify(payload).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
    res.send(`<!doctype html><html><head><meta charset="utf-8"/></head><body><script>(function(){var data=JSON.parse('${json}');var origin='${origin}';if(window.opener){window.opener.postMessage(data, origin);}window.close();})();</script></body></html>`);
  } catch {
    res.status(500).send('Auth error');
  }
});

app.get('/api/auth/facebook/start', (req, res) => {
  const clientId = process.env.FACEBOOK_APP_ID;
  const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/facebook/callback`;
  if (!clientId) return res.status(400).json({ message: 'Missing FACEBOOK_APP_ID' });
  const url = new URL('https://www.facebook.com/v18.0/dialog/oauth');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'email,public_profile');
  res.redirect(url.toString());
});

app.get('/api/auth/facebook/callback', async (req, res) => {
  try {
    const code = String(req.query.code || '');
    const clientId = process.env.FACEBOOK_APP_ID;
    const clientSecret = process.env.FACEBOOK_APP_SECRET;
    const redirectUri = `${req.protocol}://${req.get('host')}/api/auth/facebook/callback`;
    if (!clientId || !clientSecret) return res.status(400).send('Missing Facebook OAuth env');
    const tRes = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${clientSecret}&code=${encodeURIComponent(code)}`);
    const tJson = await tRes.json();
    const accessToken = tJson.access_token;
    if (!accessToken) return res.status(400).send('Facebook auth failed');
    const uRes = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${encodeURIComponent(accessToken)}`);
    const profile = await uRes.json();
    const email = String(profile.email || `facebook_${String(profile.id || Date.now())}@example.com`);
    const name = String(profile.name || 'Facebook User');
    let user = await User.findOne({ email });
    if (!user) {
      const passwordHash = await bcrypt.hash('facebook-oauth', 10);
      user = await User.create({ username: name, email: email || undefined, passwordHash, isPro: false, role: 'user', loginStreak: 0, badges: [] });
    }
    const token = generateToken(user);
    const origin = process.env.FRONTEND_URL || 'http://localhost:3000';
    const payload = { type: 'oauth_success', token, user: { id: String(user._id), username: user.username, email: user.email, isPro: user.isPro, role: user.role, loginStreak: user.loginStreak, badges: user.badges } };
    const json = JSON.stringify(payload).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
    res.send(`<!doctype html><html><head><meta charset="utf-8"/></head><body><script>(function(){var data=JSON.parse('${json}');var origin='${origin}';if(window.opener){window.opener.postMessage(data, origin);}window.close();})();</script></body></html>`);
  } catch {
    res.status(500).send('Auth error');
  }
});

// Verify Google Identity Services ID token (client-only sign-in)
app.post('/api/auth/google/verify-id-token', async (req, res) => {
  try {
    const idToken = String(req.body?.idToken || '');
    if (!idToken) return res.status(400).json({ message: 'Missing idToken' });
    const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
    const info = await verifyRes.json();
    if (info.error_description || info.error) return res.status(400).json({ message: 'Invalid Google token' });
    const email = String(info.email || `google_${String(info.sub || Date.now())}@example.com`);
    const name = String(info.name || info.given_name || 'Google User');
    let user = await User.findOne({ email });
    if (!user) {
      const passwordHash = await bcrypt.hash('google-id-token', 10);
      user = await User.create({ username: name, email, passwordHash, isPro: false, role: 'user', loginStreak: 0, badges: [] });
    }
    const token = generateToken(user);
    res.json({ token, user: { id: String(user._id), username: user.username, email: user.email, isPro: user.isPro, role: user.role, loginStreak: user.loginStreak, badges: user.badges } });
  } catch {
    res.status(500).json({ message: 'Verification error' });
  }
});

// Exchange Firebase ID token for backend JWT
app.post('/api/auth/firebase', async (req, res) => {
  try {
    const idToken = String(req.body?.idToken || '').trim();
    if (!idToken) return res.status(400).json({ message: 'Missing idToken' });
    
    let info = {};
    let verified = false;

    // 1. Try Google Token Info (works for Google Sign-In)
    try {
      const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
      if (verifyRes.ok) {
        info = await verifyRes.json();
        if (!info.error && !info.error_description) verified = true;
      }
    } catch {}

    // 2. Fallback: Decode JWT (for Facebook/other Firebase providers) if Google check failed
    if (!verified) {
      try {
        const decoded = jwt.decode(idToken);
        if (decoded && decoded.sub && decoded.iss && decoded.iss.startsWith('https://securetoken.google.com/')) {
          info = decoded;
          verified = true;
          console.log('Verified via JWT decode (Signature unchecked - standard fallback)');
        }
      } catch (e) {
        console.error('JWT decode failed:', e);
      }
    }

    if (!verified || !info.sub) {
      return res.status(400).json({ message: 'Invalid Firebase token' });
    }

    const firebaseUid = String(info.sub || '');
    const email = normalizeEmail(info.email || '');
    const name = String(info.name || info.given_name || 'Firebase User');
    
    let user = null;
    if (firebaseUid) user = await User.findOne({ firebaseUid });
    if (!user && email) user = await User.findOne({ email });
    
    if (!user) {
      const passwordHash = await bcrypt.hash('firebase-auth', 10);
      user = await User.create({ username: name, email: email || undefined, phone: undefined, firebaseUid, passwordHash, isPro: false, role: 'user', loginStreak: 0, badges: [] });
    } else {
      // Link firebaseUid if missing
      if (!user.firebaseUid && firebaseUid) {
        await User.updateOne({ _id: user._id }, { $set: { firebaseUid } });
      }
    }
    const token = generateToken(user);
    res.json({ token, user: { id: String(user._id), username: user.username, email: user.email, isPro: user.isPro, role: user.role, loginStreak: user.loginStreak, badges: user.badges } });
  } catch (e) {
    console.error('Firebase exchange error:', e);
    res.status(500).json({ message: 'Firebase exchange failed: ' + (e.message || String(e)) });
  }
});

// QUIZZES
app.get('/api/quizzes', async (req, res) => {
  const quizzes = await Quiz.find({}).lean();
  res.json({ quizzes: quizzes.map(q => ({ id: String(q._id), title: q.title, category: q.category, image: q.image, questionCount: q.questionCount })) });
});

app.get('/api/quiz/:quizId', authMiddleware, async (req, res) => {
  const quizId = req.params.quizId;
  const quiz = await Quiz.findById(quizId).lean();
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  const all = await Question.find({ quizId }).lean();
  const isPro = req.user?.isPro;
  const paywallAfter = 6;
  const questions = all.map(q => ({
    id: String(q._id),
    category: q.category,
    question: q.question,
    options: q.options,
    image: q.image
  }));
  res.json({ quiz: { id: String(quiz._id), title: quiz.title, category: quiz.category, image: quiz.image }, paywallAfter, total: all.length, questions });
});

// Daily Flip Cards (public)
app.get('/api/flipcards/daily', async (req, res) => {
  const all = await Question.find({}).lean();
  if (!all.length) return res.json({ cards: [] });
  const dayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const dayNum = Number(dayStr);
  const len = all.length;
  const start = dayNum % len;
  const step = (dayNum % 7) + 1;
  const picks = [start, (start + step) % len, (start + 2 * step) % len, (start + 3 * step) % len];
  const cards = picks.map(i => {
    const q = all[i];
    const options = Array.isArray(q.options) ? q.options.map(o => (typeof o === 'string' ? o : o?.text || '')) : [];
    const correctIdx = Array.isArray(q.options) ? q.options.findIndex(o => (typeof o === 'object' ? o?.isCorrect : false)) : -1;
    return {
      id: String(q._id),
      question_en: q.question,
      question_kiny: q.question,
      options,
      correctAnswer: correctIdx >= 0 ? correctIdx : 0
    };
  });
  res.json({ cards });
});

app.post('/api/quiz/submit', authMiddleware, async (req, res) => {
  const { answers = [], score = 0, totalQuestions = 0, timeTakenSeconds = 0 } = req.body || {};
  const submission = await Submission.create({ userId: req.user._id, answers, score, totalQuestions, timeTakenSeconds });
  await User.updateOne(
    { _id: req.user._id },
    {
      $inc: { 'stats.totalQuizzes': 1, 'stats.totalMarks': score, 'stats.totalQuestions': totalQuestions },
      $max: { 'stats.bestScore': score }
    }
  );
  res.json({ message: 'Submitted', submission: { id: String(submission._id), userId: String(req.user._id), answers, score, totalQuestions, timeTakenSeconds, createdAt: submission.createdAt } });
});

// AI ASSISTANT (deprecated)
app.post('/api/ai/ask-deprecated', authMiddleware, async (req, res) => {
  const { question = '' } = req.body || {};
  if (!question) return res.status(400).json({ message: 'Missing question' });
  const qLower = String(question).toLowerCase();
  const tokens = qLower.split(/\s+/).filter(Boolean);
  function collectFromSource() {
    const out = [];
    for (const [key, v] of Object.entries(quizSource)) {
      let arr = [];
      if (Array.isArray(v)) arr = v;
      else if (v && Array.isArray(v.questions)) arr = v.questions;
      if (!Array.isArray(arr)) continue;
      for (const q of arr) {
        if (q && q.question && Array.isArray(q.options)) {
          out.push({
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            image: q.imagePlaceholder || q.imageUrl || null,
            category: 'Mixed'
          });
        }
      }
    }
    return out;
  }
  const sourceDocs = collectFromSource();
  const docs = sourceDocs.length ? sourceDocs : await Question.find({}).limit(5000).lean();
  const SYNS = {
    'guhagarara': ['icyapa cyo guhagarara','hagarara','stop'],
    'umuvuduko': ['vitesse','speed','genda buhoro'],
    'anyuranaho': ['kwanyuranaho','gusiganwa','overtake','nyuranaho','gucaho'],
    'icyapa': ['ibyapa','ikimenyetso','sign','ikimenyetso cy\'umuhanda'],
    'gari ya moshi': ['moshi','rail','train','inzira ya gari ya moshi']
  };
  function expandTokens(ts) {
    const out = new Set(ts);
    for (const t of ts) {
      for (const [k, arr] of Object.entries(SYNS)) {
        if (t.includes(k) || arr.some(s => t.includes(s))) {
          out.add(k);
          for (const s of arr) out.add(s);
        }
      }
    }
    return Array.from(out);
  }
  const expandedTokens = expandTokens(tokens);
  function score(d) {
    const optText = Array.isArray(d.options)
      ? d.options.map(o => (typeof o==='string' ? o : (o?.text || ''))).join(' ')
      : '';
    const text = `${d.question} ${optText} ${d.category||''}`.toLowerCase();
    let s = 0;
    for (const t of expandedTokens) {
      if (!t) continue;
      if (text.includes(t)) s += 2;
      else if (t.length > 3 && text.includes(t.slice(0, Math.max(2, Math.floor(t.length*0.6))))) s += 1;
    }
    return s;
  }
  const ranked = docs.map(d => ({ d, s: score(d) })).sort((a,b)=>b.s-a.s).slice(0,3);
  const best = ranked[0]?.d;
  if (!best || ranked[0].s === 0) {
    return res.json({ text: "Mwaramutse! Nshobora kugufasha ku mategeko y'umuhanda. Sobanura neza ikibazo cyawe cyangwa ukoreshe amagambo ajyanye n'ibyapa n'amategeko. Inama: Koresha neza umuhanda tugeraneyo #Gerayo Amahoro" });
  }
  const correctObj = (best.options||[]).find(o => (typeof o==='object' && (o?.isCorrect || o?.correct===true)) || (typeof o==='string' && typeof best.correctAnswer==='string' && o.trim()===best.correctAnswer?.trim()));
  let answerText = null;
  if (correctObj) {
    answerText = typeof correctObj==='string' ? correctObj : (correctObj.text || correctObj.value || null);
  }
  if (!answerText && typeof best.correctAnswer==='string') answerText = best.correctAnswer;
  if (!answerText && typeof best.answer==='string') answerText = best.answer;
  if (!answerText && typeof best.correctOptionIndex==='number' && Array.isArray(best.options)) {
    const co = best.options[best.correctOptionIndex];
    answerText = typeof co==='string' ? co : (co?.text || null);
  }
  const qtext = `${best.question} ${best.category || ''}`.toLowerCase();
  const related = (best.options||[])
    .map(o=>typeof o==='string' ? o : (o?.text || ''))
    .filter(t => t && expandedTokens.some(tok => t.toLowerCase().includes(tok)))
    .slice(0,3);
  const extra = related.length ? ` Ibindi by'ingenzi: ${related.join('; ')}.` : '';
  let text = '';
  if (answerText) {
    text = `Aha bikwiye gukorwa gutya: ${answerText}. Kubahiriza ibyapa n'amategeko, no kugenza umuvuduko ukwiye, bituma ugenda neza.`;
  } else if (qtext.includes('guhagarara')) {
    text = 'Ahari icyapa cyo guhagarara (STOP) ugomba guhagarara rwose mbere y\'umurongo cyangwa aho abanyamaguru bambuka, urebe ibumoso n\'iburyo, uhe icyubahiro abanyamaguru n\'ibinyabiziga, ukambuka ari uko inzira isobanutse.';
  } else if (qtext.includes('umuvuduko')) {
    text = 'Kubahiriza umuvuduko wemewe ni ngombwa. Hegereza umuvuduko mu bice by\'amashuri, aho abanyamaguru banyura, no mu masangano; kandi uhindure umuvuduko ukurikije imiterere y\'umuhanda n\'ibihe by\'ikirere.';
  } else if (qtext.includes('anyuranaho') || qtext.includes('gusiganwa')) {
    text = 'Kwanyuranaho bikorwa gusa igihe imirongo ibyemera, aho ubona neza imbere, kandi ufite umwanya uhagije. Banza urebe mu ndorerwamo n\'ahagupfuma, uhe ikimenyetso, kandi ntukahatse abandi kubyihutisha.';
  } else if (qtext.includes('icyapa') || qtext.includes('ibyapa')) {
    text = 'Ibyapa biguhatira kubahiriza amategeko cyangwa bikakumenyesha ibyago n\'ubuyobozi bw\'inzira. Soma isura n\'ibara ry\'icyapa, ukurikize uko kigutegeka aho uri.';
  } else if (qtext.includes('gari ya moshi') || qtext.includes('moshi') || qtext.includes('inzira ya gari ya moshi')) {
    text = 'Ku nzira ya gari ya moshi, hagarara iyo hari ikimenyetso cy\'umutuku cyangwa bariyeri, ntukambuke igihe amatara arimo kumurika, kandi wemeze ko inzira isukuye mbere yo kwambuka. Ntuhagarare ku nzira ya gari ya moshi.';
  } else {
    text = 'Reba ibyapa, imiterere y\'umuhanda n\'aho uri, uhe inzira aho bikenewe, kandi ugendere umuvuduko ukwiye kugira ngo wirinde impanuka.';
  }
  text = `${text}${extra} Inama: Koresha neza umuhanda tugeraneyo #Gerayo Amahoro`;
  res.json({
    text,
    image: best.image || null,
    source: { id: String(best._id), category: best.category, question: best.question, answer: answerText }
  });
});

async function momoRequestToPay(amount, phone, note, product) {
  const ref = uuidv4();
  await requestToPay({
    amount,
    currency: 'RWF',
    externalId: ref,
    msisdn: normalizeMsisdn(phone),
    payerMessage: product === 'irembo' ? 'ISHAMI Irembo' : 'ISHAMI Pro',
    payeeNote: note || 'ISHAMI',
  });
  return ref;
}

async function momoStatus(ref) {
  return await getRequestToPayStatus(ref);
}

app.post('/api/payment/initiate', authMiddleware, async (req, res) => {
  try {
    const { amount, phone, provider, product } = req.body || {};
    const prod = String(product || 'pro');
    const expected = prod === 'irembo' ? 5500 : 1000;
    if (Number(amount) !== expected) {
      await FraudLog.create({ userId: req.user._id, type: 'amount_mismatch', message: 'Mismatched amount', meta: { sent: amount, expected, product: prod } });
      return res.status(400).json({ message: 'Invalid amount' });
    }
    if (String(provider || '').toLowerCase() !== 'mtn') return res.status(400).json({ message: 'Unsupported provider' });
    if (!phone) return res.status(400).json({ message: 'Phone required' });
    const ref = await momoRequestToPay(expected, phone, 'ISHAMI', prod);
    const payment = await Payment.create({ userId: req.user._id, amount: expected, phone, provider: 'mtn', product: prod, providerRef: ref, status: 'PENDING' });
    res.json({ transactionId: String(payment._id), status: payment.status, providerRef: ref });
  } catch (e) {
    await FraudLog.create({ userId: req.user?._id, type: 'initiate_error', message: 'Payment initiate failed', meta: { error: String(e && e.message || e) } });
    res.status(500).json({ message: 'Payment error' });
  }
});

app.get('/api/payment/status/:transactionId', authMiddleware, async (req, res) => {
  const txn = await Payment.findById(req.params.transactionId);
  if (!txn) return res.status(404).json({ message: 'Not found' });
  if (txn.status === 'PENDING' && txn.providerRef) {
    try {
      const st = await momoStatus(txn.providerRef);
      if (st === 'SUCCESSFUL') {
        txn.status = 'SUCCESS';
        await txn.save();
        if (txn.product === 'pro') {
          const u = await User.findById(txn.userId);
          if (u) { u.isPro = true; await u.save(); }
        }
      } else if (st === 'FAILED') {
        txn.status = 'FAILED';
        await txn.save();
      }
    } catch (e) {}
  }
  res.json({ transactionId: String(txn._id), status: txn.status });
});

// Plural routes (alias) for compatibility with requested API spec
app.post('/api/payments/initiate', authMiddleware, async (req, res) => {
  try {
    const { amount, phone, provider, product } = req.body || {};
    const prod = String(product || 'pro');
    const expected = prod === 'irembo' ? 5500 : 1000;
    if (Number(amount) !== expected) {
      await FraudLog.create({ userId: req.user._id, type: 'amount_mismatch', message: 'Mismatched amount', meta: { sent: amount, expected, product: prod } });
      return res.status(400).json({ message: 'Invalid amount' });
    }
    if (String(provider || '').toLowerCase() !== 'mtn') return res.status(400).json({ message: 'Unsupported provider' });
    if (!phone) return res.status(400).json({ message: 'Phone required' });
    const ref = await momoRequestToPay(expected, phone, 'ISHAMI', prod);
    const payment = await Payment.create({ userId: req.user._id, amount: expected, phone, provider: 'mtn', product: prod, providerRef: ref, status: 'PENDING' });
    res.json({ transactionId: String(payment._id), status: payment.status, providerRef: ref });
  } catch (e) {
    await FraudLog.create({ userId: req.user?._id, type: 'initiate_error', message: 'Payment initiate failed', meta: { error: String(e && e.message || e) } });
    res.status(500).json({ message: 'Payment error' });
  }
});

app.get('/api/payments/status/:transactionId', authMiddleware, async (req, res) => {
  const txn = await Payment.findById(req.params.transactionId);
  if (!txn) return res.status(404).json({ message: 'Not found' });
  if (txn.status === 'PENDING' && txn.providerRef) {
    try {
      const st = await momoStatus(txn.providerRef);
      if (st === 'SUCCESSFUL') {
        txn.status = 'SUCCESS';
        await txn.save();
        if (txn.product === 'pro') {
          const u = await User.findById(txn.userId);
          if (u) { u.isPro = true; await u.save(); }
        }
      } else if (st === 'FAILED') {
        txn.status = 'FAILED';
        await txn.save();
      }
    } catch (e) {}
  }
  res.json({ transactionId: String(txn._id), status: txn.status });
});

// MTN MoMo webhook: auto-update payment status
app.post('/api/webhook/mtn', async (req, res) => {
  try {
    const ref = req.headers['x-reference-id'] || req.body?.referenceId || req.body?.refId || req.query?.referenceId;
    const status = (req.body?.status || '').toUpperCase();
    if (!ref || !status) {
      return res.status(400).json({ message: 'Missing reference or status' });
    }
    const txn = await Payment.findOne({ providerRef: String(ref) });
    if (!txn) {
      await FraudLog.create({ type: 'webhook_unknown_ref', message: 'Unknown providerRef', meta: { ref, body: req.body } });
      return res.status(404).json({ message: 'Payment not found' });
    }
    if (status === 'SUCCESSFUL') {
      txn.status = 'SUCCESS';
      await txn.save();
      if (txn.product === 'pro') {
        const u = await User.findById(txn.userId);
        if (u) { u.isPro = true; await u.save(); }
      }
    } else if (status === 'FAILED') {
      txn.status = 'FAILED';
      await txn.save();
    }
    res.json({ ok: true });
  } catch (e) {
    await FraudLog.create({ type: 'webhook_error', message: 'Webhook processing error', meta: { error: String(e && e.message || e) } });
    res.status(500).json({ message: 'Server error' });
  }
});

// RESOURCES
app.get('/api/resources', async (req, res) => {
  const items = await Resource.find({}).lean();
  res.json({
    resources: items.map(r => ({
      id: String(r._id),
      title_en: r.title,
      title_kiny: r.titleKiny || '',
      type: r.type || 'PDF',
      category: r.category || 'General',
      isPremium: !!r.premium,
      fileUrl: r.fileUrl || '',
      thumbnail: r.thumbnail || '',
      size: r.size || ''
    }))
  });
});

app.get('/api/resources/download/:id', async (req, res) => {
  const token = req.query.token;
  try {
    const payload = jwt.verify(String(token || ''), JWT_SECRET);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    if (resource.premium && !user.isPro) return res.status(402).json({ message: 'Upgrade to Pro to download' });
    const url = toDirectDownloadUrl(resource.fileUrl);
    if (url) {
      return res.redirect(url);
    }
    res.status(400).json({ message: 'No file URL set for resource' });
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
});

// LEADERBOARD
app.get('/api/leaderboard', async (req, res) => {
  const { limit = 100 } = req.query;
  const withStats = await User.find({ 'stats.totalQuizzes': { $gt: 0 } })
    .sort({ 'stats.totalMarks': -1, 'stats.bestScore': -1 })
    .limit(Number(limit))
    .lean();
  if (withStats.length >= Number(limit)) {
    const entries = withStats.map(u => ({
      userId: String(u._id),
      username: u.username || 'Unknown',
      bestScore: u.stats?.bestScore || 0,
      quizCount: u.stats?.totalQuizzes || 0,
      totalMarks: u.stats?.totalMarks || 0,
      totalQuestions: u.stats?.totalQuestions || 0
    }));
    return res.json({ leaderboard: entries });
  }
  const agg = await Submission.aggregate([
    { $group: {
      _id: '$userId',
      bestScore: { $max: '$score' },
      quizCount: { $sum: 1 },
      totalMarks: { $sum: '$score' },
      totalQuestions: { $sum: '$totalQuestions' },
      quizMarks: { $push: '$score' }
    } },
    { $sort: { totalMarks: -1, bestScore: -1 } },
    { $limit: Number(limit) }
  ]);
  const users = await User.find({ _id: { $in: agg.map(a => a._id) } }).lean();
  const entries = agg.map(a => ({
    userId: String(a._id),
    username: users.find(u => String(u._id) === String(a._id))?.username || 'Unknown',
    bestScore: a.bestScore,
    quizCount: a.quizCount,
    totalMarks: a.totalMarks,
    totalQuestions: a.totalQuestions
  }));
  res.json({ leaderboard: entries });
});

// IREMBO
app.post('/api/irembo/register', authMiddleware, async (req, res) => {
  const txnId = String(req.body?.transactionId || '');
  const txn = txnId ? await Payment.findById(txnId) : null;
  if (!txn || String(txn.userId) !== String(req.user._id) || txn.status !== 'SUCCESS' || txn.amount !== 5500 || txn.product !== 'irembo') {
    await FraudLog.create({ userId: req.user._id, type: 'register_without_payment', message: 'Irembo register blocked', meta: { txnId } });
    return res.status(402).json({ message: 'Payment required' });
  }
  const application = await IremboApplication.create({ userId: req.user._id, fullName: req.body.fullName, nationalId: req.body.nationalId, phone: req.body.phone, email: req.body.email, language: req.body.language, testMode: req.body.testMode, district: req.body.district, testDate: req.body.testDate });
  await Notification.create({ title: 'Irembo registration', body: `New application ${String(application._id)}`, segment: 'admins' });
  res.json({ application: { id: String(application._id), fullName: application.fullName, nationalId: application.nationalId, phone: application.phone, email: application.email, language: application.language, testMode: application.testMode, district: application.district, testDate: application.testDate, status: application.status, createdAt: application.createdAt } });
});

// SIMULATION
app.post('/api/simulation/submit', authMiddleware, async (req, res) => {
  const s = await Simulation.create({ userId: req.user._id, ...req.body });
  res.json({ result: { id: String(s._id), userId: String(req.user._id), ...req.body, createdAt: s.createdAt } });
});

app.post('/api/newsletter/subscribe', async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ message: 'Invalid email' });
  try {
    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) return res.json({ success: true, subscribed: true });
    await NewsletterSubscriber.create({ email });
    const brandName = process.env.BRAND_NAME || 'ISHAMI';
    const from = process.env.SMTP_FROM || `${brandName} <no-reply@ishami.local>`;
    let logo = process.env.BRAND_LOGO_URL || '';
    if (!logo) {
      try {
        const logoPath = path.resolve(process.cwd(), 'src', 'favicon_io', 'android-chrome-192x192.png');
        const buf = fs.readFileSync(logoPath);
        const b64 = buf.toString('base64');
        logo = `data:image/png;base64,${b64}`;
      } catch {
        logo = 'https://raw.githubusercontent.com/google/material-design-icons/master/png/social/public/materialicons/192dp/white.png';
      }
    }
    const primary = process.env.BRAND_PRIMARY_COLOR || '#00A3AD';
    const site = process.env.BRAND_SITE_URL || 'https://ishami.local';
    const subject = `Welcome to ${brandName}`;
    const html = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/><title>${brandName}</title></head><body style="margin:0;padding:0;background:#f7f7f7;font-family:Arial,Helvetica,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f7f7f7"><tr><td align="center"><table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;margin:24px;border-radius:12px;overflow:hidden;border:1px solid #e6e6e6"><tr><td style="background:${primary};padding:24px" align="center"><img src="${logo}" alt="Logo" width="64" height="64" style="display:block;border-radius:12px"/></td></tr><tr><td style="padding:24px"><h1 style="margin:0 0 12px 0;color:#111111;font-size:20px">Murakaza neza kuri ${brandName}</h1><p style="margin:0 0 16px 0;color:#444444;font-size:14px;line-height:1.6">Urakoze kwiyandikisha ku makuru yacu. Tuzajya kugutumira amakuru agezweho ku mategeko y'umuhanda, inama zo gutsinda ikizamini, n'ibindi byiza.</p><p style="margin:0 0 16px 0;color:#444444;font-size:14px;line-height:1.6">Inama: Koresha neza umuhanda tugeraneyo #Gerayo Amahoro</p><a href="${site}" style="display:inline-block;background:${primary};color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-size:14px">Sura urubuga</a></td></tr><tr><td style="padding:16px;text-align:center;color:#888888;font-size:12px">© ${new Date().getFullYear()} ${brandName}. Uramutse wifuza guhagarika, bimenyeshe kuri iyi email.</td></tr></table></td></tr></table></body></html>`;
    try {
      if (mailer) {
        await mailer.sendMail({ from, to: email, subject, html, sender: process.env.SMTP_USER, envelope: { from: process.env.SMTP_USER, to: email } });
      } else {
        console.warn('Newsletter subscribe email skipped: SMTP not configured');
      }
    } catch (e) {
      console.error('Newsletter subscribe email failed:', e?.message || e);
    }
    res.json({ success: true, subscribed: true });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ADMIN (protect with admin role)
function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
}

// Seed an admin user for testing
// Seeded via MongoDB on startup

app.get('/api/admin/analytics', authMiddleware, adminOnly, async (req, res) => {
  const totalUsers = await User.countDocuments();
  const proUsers = await User.countDocuments({ isPro: true });
  const paymentsAll = await Payment.find({}).lean();
  const totalRevenue = paymentsAll.filter(p => p.status === 'SUCCESS').reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const today = new Date(); today.setHours(0,0,0,0);
  const todaySignups = await User.countDocuments({ createdAt: { $gte: today } });
  const todayQuizAttempts = await Submission.countDocuments({ createdAt: { $gte: today } });
  const conversionRate = totalUsers ? Math.round((proUsers / totalUsers) * 1000) / 10 : 0;
  const paymentSuccessRate = paymentsAll.length ? Math.round((paymentsAll.filter(p => p.status === 'SUCCESS').length / paymentsAll.length) * 1000) / 10 : 0;
  const topQuestionsDocs = await Question.find({}).limit(3).lean();
  const topQuestions = topQuestionsDocs.map((q, i) => ({ id: String(q._id), question: q.question, failRate: [67,54,48][i] }));
  const recentPaymentsDocs = await Payment.find({}).sort({ createdAt: -1 }).limit(5).lean();
  const recentPayments = await Promise.all(recentPaymentsDocs.map(async p => ({ id: String(p._id), username: (await User.findById(p.userId))?.username || 'Unknown', amount: Number(p.amount || 0), status: p.status, date: p.createdAt })));
  res.json({ totalUsers, proUsers, totalRevenue, todaySignups, todayQuizAttempts, conversionRate, paymentSuccessRate, topQuestions, recentPayments });
});

app.get('/api/admin/newsletter/subscribers', authMiddleware, adminOnly, async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 50);
  const total = await NewsletterSubscriber.countDocuments();
  const items = await NewsletterSubscriber.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
  res.json({ page, limit, total, subscribers: items.map(s => ({ id: String(s._id), email: s.email, status: s.status, createdAt: s.createdAt })) });
});

app.get('/api/admin/newsletter/campaigns', authMiddleware, adminOnly, async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 50);
  const total = await NewsletterCampaign.countDocuments();
  const items = await NewsletterCampaign.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
  res.json({ page, limit, total, campaigns: items.map(c => ({ id: String(c._id), subject: c.subject, status: c.status, recipientsCount: c.recipientsCount, deliveredCount: c.deliveredCount, failedCount: c.failedCount, sentAt: c.sentAt, createdAt: c.createdAt })) });
});

app.post('/api/admin/newsletter/send', authMiddleware, adminOnly, async (req, res) => {
  const subject = String(req.body?.subject || '').trim();
  const body = String(req.body?.body || '').trim();
  if (!subject || !body) return res.status(400).json({ message: 'Missing fields' });
  if (!mailer) return res.status(500).json({ message: 'SMTP not configured' });
  const subscribers = await NewsletterSubscriber.find({ status: 'SUBSCRIBED' }).lean();
  const from = process.env.SMTP_FROM || 'ISHAMI <no-reply@ishami.local>';
  let delivered = 0;
  let failed = 0;
  for (const s of subscribers) {
    try {
      await mailer.sendMail({ from, to: s.email, subject, html: body, sender: process.env.SMTP_USER, envelope: { from: process.env.SMTP_USER, to: s.email } });
      delivered++;
    } catch {
      failed++;
    }
  }
  const campaign = await NewsletterCampaign.create({ subject, body, status: 'SENT', recipientsCount: subscribers.length, deliveredCount: delivered, failedCount: failed, sentAt: new Date() });
  res.json({ campaign: { id: String(campaign._id), subject: campaign.subject, status: campaign.status, recipientsCount: campaign.recipientsCount, deliveredCount: campaign.deliveredCount, failedCount: campaign.failedCount, sentAt: campaign.sentAt } });
});

app.post('/api/admin/newsletter/preview', authMiddleware, adminOnly, async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const subject = String(req.body?.subject || '').trim();
  const body = String(req.body?.body || '').trim();
  if (!email || !subject || !body) return res.status(400).json({ message: 'Missing fields' });
  if (!mailer) return res.json({ success: true });
  try {
    const from = process.env.SMTP_FROM || 'ISHAMI <no-reply@ishami.local>';
    await mailer.sendMail({ from, to: email, subject, html: body, sender: process.env.SMTP_USER, envelope: { from: process.env.SMTP_USER, to: email } });
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: 'Failed to send' });
  }
});

app.get('/api/admin/users', authMiddleware, adminOnly, async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 50);
  const total = await User.countDocuments();
  const users = await User.find({}).skip((page - 1) * limit).limit(limit).lean();
  const items = users.map(u => ({ id: String(u._id), username: u.username, email: u.email, isPro: u.isPro, role: u.role, loginStreak: u.loginStreak, badges: u.badges }));
  res.json({ page, limit, total, users: items });
});

app.put('/api/admin/users/:userId', authMiddleware, adminOnly, async (req, res) => {
  const u = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
  if (!u) return res.status(404).json({ message: 'Not found' });
  res.json({ user: { id: String(u._id), username: u.username, email: u.email, isPro: u.isPro, role: u.role, loginStreak: u.loginStreak, badges: u.badges } });
});

app.delete('/api/admin/users/:userId', authMiddleware, adminOnly, async (req, res) => {
  const r = await User.findByIdAndDelete(req.params.userId);
  if (!r) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

app.get('/api/admin/questions', authMiddleware, adminOnly, async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 50);
  const total = await Question.countDocuments();
  const items = await Question.find({}).skip((page - 1) * limit).limit(limit).lean();
  res.json({ page, limit, total, questions: items.map(q => ({ id: String(q._id), quizId: String(q.quizId || ''), category: q.category, question: q.question, options: q.options, image: q.image })) });
});

app.post('/api/admin/questions', authMiddleware, adminOnly, async (req, res) => {
  const payload = {
    quizId: req.body.quizId || undefined,
    category: req.body.category,
    question: req.body.question,
    options: Array.isArray(req.body.options) ? req.body.options.map(o => ({ text: o.text, isCorrect: !!o.isCorrect })) : [],
    image: req.body.image || null,
  };
  const q = await Question.create(payload);
  res.json({ question: { id: String(q._id), quizId: String(q.quizId || ''), category: q.category, question: q.question, options: q.options, image: q.image } });
});

app.put('/api/admin/questions/:questionId', authMiddleware, adminOnly, async (req, res) => {
  const updates = {
    quizId: req.body.quizId,
    category: req.body.category,
    question: req.body.question,
    options: Array.isArray(req.body.options) ? req.body.options.map(o => ({ text: o.text, isCorrect: !!o.isCorrect })) : undefined,
    image: req.body.image,
  };
  const q = await Question.findByIdAndUpdate(req.params.questionId, updates, { new: true });
  if (!q) return res.status(404).json({ message: 'Not found' });
  res.json({ question: { id: String(q._id), quizId: String(q.quizId || ''), category: q.category, question: q.question, options: q.options, image: q.image } });
});

app.delete('/api/admin/questions/:questionId', authMiddleware, adminOnly, async (req, res) => {
  const r = await Question.findByIdAndDelete(req.params.questionId);
  if (!r) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

// Admin: Quizzes CRUD
app.get('/api/admin/quizzes', authMiddleware, adminOnly, async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 50);
  const total = await Quiz.countDocuments();
  const items = await Quiz.find({}).skip((page - 1) * limit).limit(limit).lean();
  res.json({ page, limit, total, quizzes: items.map(q => ({ id: String(q._id), title: q.title, category: q.category, image: q.image, questionCount: q.questionCount })) });
});

app.post('/api/admin/quizzes', authMiddleware, adminOnly, async (req, res) => {
  const { title, category, image = null } = req.body || {};
  if (!title || !category) return res.status(400).json({ message: 'title and category are required' });
  const existing = await Quiz.findOne({ title });
  if (existing) return res.status(409).json({ message: 'Quiz with this title already exists' });
  const quiz = await Quiz.create({ title, category, image, questionCount: 0 });
  res.json({ quiz: { id: String(quiz._id), title: quiz.title, category: quiz.category, image: quiz.image, questionCount: quiz.questionCount } });
});

app.put('/api/admin/quizzes/:quizId', authMiddleware, adminOnly, async (req, res) => {
  const updates = { title: req.body.title, category: req.body.category, image: req.body.image };
  const quiz = await Quiz.findByIdAndUpdate(req.params.quizId, updates, { new: true });
  if (!quiz) return res.status(404).json({ message: 'Not found' });
  res.json({ quiz: { id: String(quiz._id), title: quiz.title, category: quiz.category, image: quiz.image, questionCount: quiz.questionCount } });
});

app.delete('/api/admin/quizzes/:quizId', authMiddleware, adminOnly, async (req, res) => {
  const q = await Quiz.findByIdAndDelete(req.params.quizId);
  if (!q) return res.status(404).json({ message: 'Not found' });
  await Question.deleteMany({ quizId: req.params.quizId });
  res.json({ message: 'Deleted' });
});

 

app.get('/api/admin/payments', authMiddleware, adminOnly, async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 50);
  const total = await Payment.countDocuments();
  const items = await Payment.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
  const userIds = items.map(p => p.userId).filter(Boolean);
  const users = userIds.length ? await User.find({ _id: { $in: userIds } }).lean() : [];
  const userMap = new Map(users.map(u => [String(u._id), u]));
  const payments = items.map(p => {
    const u = userMap.get(String(p.userId));
    return {
      id: String(p._id),
      userId: String(p.userId),
      username: u?.username || 'Unknown',
      email: u?.email || null,
      amount: Number(p.amount || 0),
      phone: p.phone || null,
      provider: String(p.provider || ''),
      status: p.status || 'PENDING',
      createdAt: p.createdAt,
    };
  });
  res.json({ page, limit, total, payments });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error middleware:', err?.stack || err);
  res.status(500).json({ message: 'Server error' });
});

app.get('/api/admin/irembo', authMiddleware, adminOnly, async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 50);
  const total = await IremboApplication.countDocuments();
  const items = await IremboApplication.find({}).skip((page - 1) * limit).limit(limit).lean();
  res.json({ page, limit, total, applications: items.map(a => ({ id: String(a._id), userId: String(a.userId), status: a.status, createdAt: a.createdAt, fullName: a.fullName, nationalId: a.nationalId, phone: a.phone, email: a.email, language: a.language, testMode: a.testMode, district: a.district, testDate: a.testDate })) });
});

app.put('/api/admin/irembo/:applicationId', authMiddleware, adminOnly, async (req, res) => {
  const a = await IremboApplication.findByIdAndUpdate(req.params.applicationId, req.body, { new: true });
  if (!a) return res.status(404).json({ message: 'Not found' });
  res.json({ application: { id: String(a._id), userId: String(a.userId), status: a.status, createdAt: a.createdAt, fullName: a.fullName, nationalId: a.nationalId, phone: a.phone, email: a.email, language: a.language, testMode: a.testMode, district: a.district, testDate: a.testDate } });
});

app.post('/api/admin/resources', authMiddleware, adminOnly, upload.single('file'), async (req, res) => {
  const file = req.file;
  const { 
    title = file?.originalname || 'Untitled', 
    titleKiny = '',
    premium = false,
    type = 'PDF',
    category = 'General',
    fileUrl = '',
    thumbnail = ''
  } = req.body || {};

  const r = await Resource.create({ 
    title, 
    titleKiny, 
    type, 
    category, 
    premium: String(premium) === 'true', 
    fileUrl, 
    thumbnail 
  });
  
  res.json({ 
    resource: { 
      id: String(r._id), 
      title: r.title, 
      titleKiny: r.titleKiny,
      type: r.type, 
      category: r.category,
      premium: r.premium,
      fileUrl: r.fileUrl,
      thumbnail: r.thumbnail
    } 
  });
});

app.delete('/api/admin/resources/:resourceId', authMiddleware, adminOnly, async (req, res) => {
  const r = await Resource.findByIdAndDelete(req.params.resourceId);
  if (!r) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

app.post('/api/admin/notifications', authMiddleware, adminOnly, async (req, res) => {
  const n = await Notification.create({ title: String(req.body?.title || ''), body: String(req.body?.body || ''), segment: String(req.body?.segment || '') || 'all', scheduledAt: req.body?.scheduledAt ? new Date(req.body.scheduledAt) : undefined });
  res.json({ notification: { id: String(n._id), title: n.title, body: n.body, segment: n.segment, scheduledAt: n.scheduledAt, createdAt: n.createdAt } });
});

app.get('/api/admin/notifications', authMiddleware, adminOnly, async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 50);
  const total = await Notification.countDocuments();
  const items = await Notification.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
  res.json({ page, limit, total, notifications: items.map(n => ({ id: String(n._id), title: n.title, body: n.body, segment: n.segment, scheduledAt: n.scheduledAt, createdAt: n.createdAt })) });
});

app.get('/api/admin/fraud-logs', authMiddleware, adminOnly, async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 50);
  const total = await FraudLog.countDocuments();
  const items = await FraudLog.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
  res.json({ page, limit, total, logs: items.map(l => ({ id: String(l._id), userId: String(l.userId || ''), type: l.type, message: l.message, meta: l.meta, createdAt: l.createdAt })) });
});

app.get('/api/admin/user-logs/:userId', authMiddleware, adminOnly, (req, res) => {
  const logs = userLogs.get(req.params.userId) || [];
  res.json({ userId: req.params.userId, logs });
});

app.get('/', (_req, res) => res.json({ status: 'ok', name: 'ISHAMI backend', version: '0.1.0' }));

app.listen(PORT, () => {
  console.log(`ISHAMI backend running on http://localhost:${PORT}`);
});
