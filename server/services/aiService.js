import { GoogleGenerativeAI } from "@google/generative-ai";
import Fuse from "fuse.js";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

// Ensure .env is loaded from server directory
const envPath = path.resolve(process.cwd(), 'server', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
    dotenv.config(); // Fallback to default
}

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse'); 
import { AIInteraction } from '../models/AIInteraction.js';
import definitionsData from '../definations.js';
import roadSignsData from '../roadsigns.js';
import speedLimitsData from '../speedlimits.js';
import evaluationQuestionsData from '../evaluation_questions.js';

// --- CONFIGURATION ---
// Use provided key if env var is missing
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("🔑 Gemini Key:", GEMINI_API_KEY ? `${GEMINI_API_KEY.substring(0, 8)}...` : "MISSING");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Global Context Storage
let localPdfContext = "";
let isPdfLoaded = false;

// --- PDF LOADING ---
const loadPDFs = async () => {
  if (isPdfLoaded) return;
  console.log("📚 Loading Traffic Rules PDFs...");
  
  try {
    const uploadsDir = path.resolve(process.cwd(), 'server', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      console.warn("⚠️ Uploads directory not found:", uploadsDir);
      return;
    }

    const files = fs.readdirSync(uploadsDir).filter(f => f.toLowerCase().endsWith('.pdf'));
    
    let combinedText = "";
    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      try {
        const dataBuffer = fs.readFileSync(filePath);
        const parser = new PDFParse({ 
          data: dataBuffer,
          verbosity: -1 
        });
        const result = await parser.getText();
        let rawText = result.text || "";
        // Clean text aggressively
        rawText = rawText
          .replace(/\u00A0/g, ' ')
          .replace(/\u00AD/g, '')
          .replace(/[^\S\r\n]+/g, ' ')
          .replace(/[\u0000-\u001F\u007F]/g, (c) => (c === '\n' || c === '\t') ? c : ' ')
          .replace(/-\s*\n\s*/g, '')
          .replace(/\n{3,}/g, '\n\n');
        const cleanText = rawText.substring(0, 50000);
        combinedText += `\n\n--- DOCUMENT: ${file} ---\n${cleanText}`;
        console.log(`✅ Loaded PDF: ${file}`);
      } catch (err) {
        console.error(`❌ Failed to parse PDF ${file}:`, err.message);
      }
    }
    
    localPdfContext = combinedText;
    isPdfLoaded = true;
    console.log("📚 Local PDF Knowledge Base Ready.");
  } catch (error) {
    console.error("PDF Load Error:", error);
  }
};

// Start loading PDFs immediately
loadPDFs();

// --- SEARCH FUNCTIONS ---

const searchPDFs = (query) => {
  if (!localPdfContext) return "";
  
  const q = query.toLowerCase();
  const keywords = q.split(' ').filter(w => w.length > 3);
  
  const paragraphs = localPdfContext.split(/\n+/);
  
  let matches = [];
  let totalLength = 0;
  const MAX_CONTEXT_LENGTH = 4000;

  for (const p of paragraphs) {
      const pLower = p.toLowerCase();
      if (p.length > 20 && p.length < 2000 && keywords.some(k => pLower.includes(k))) {
           if (totalLength + p.length > MAX_CONTEXT_LENGTH) break;
           matches.push(p);
           totalLength += p.length;
      }
  }
  
  if (matches.length > 0) {
    return `**AMAKURU YAVUYE MURI PDF (PDF Context):**\n${matches.join('\n...\n')}`;
  }
  return "";
};

const searchLocalJS = (query) => {
  const q = query.toLowerCase();
  let foundInfo = [];

  const defList = Array.isArray(definitionsData?.ibisobanuro) ? definitionsData.ibisobanuro : [];
  const signList = Array.isArray(roadSignsData?.ibyapa) ? roadSignsData.ibyapa : [];
  const fuseDef = new Fuse(defList, { keys: ['ijambo', 'ibisobanuro'], threshold: 0.35, includeScore: true });
  const fuseSigns = new Fuse(signList, { keys: ['izina', 'code', 'icyo_gisobanura'], threshold: 0.35, includeScore: true });
  const defResults = fuseDef.search(q).slice(0, 5).map(r => r.item);
  const signResults = fuseSigns.search(q).slice(0, 5).map(r => r.item);

  if (defResults.length > 0) {
    const matches = defResults;
      foundInfo.push(`**IBISOBANURO (Definitions):**\n` + matches.map(m => 
        `- **${m.ijambo}**: ${m.ibisobanuro} (Ingingo: ${m.ingingo})`
      ).join('\n'));
  }

  if (signResults.length > 0) {
    const matches = signResults.slice(0, 5);
      foundInfo.push(`**IBYAPA (Road Signs):**\n` + matches.map(m => 
        `- **${m.izina} (${m.code})**: ${m.icyo_gisobanura}`
      ).join('\n'));
  }

  if (q.includes('umuvuduko') || q.includes('speed') || q.includes('km')) {
    if (speedLimitsData?.umuvuduko_ntarengwa) {
      const limits = speedLimitsData.umuvuduko_ntarengwa;
      let limitText = "**UMUVUDUKO NTARENGWA (Speed Limits):**\n";
      if (limits.mu_nsisiro) limitText += "- Mu Nsisiro: " + limits.mu_nsisiro.map(l => `${l.ubwoko_bwikinyabiziga}: ${l.umuvuduko}`).join('; ') + "\n";
      if (limits.ahataratuye) limitText += "- Ahataratuye: " + limits.ahataratuye.map(l => `${l.ubwoko_bwikinyabiziga}: ${l.umuvuduko}`).join('; ') + "\n";
      foundInfo.push(limitText);
    }
  }

  if (evaluationQuestionsData) {
     const strData = JSON.stringify(evaluationQuestionsData).toLowerCase();
     if (strData.includes(q)) {
        const recursiveSearch = (obj) => {
            let res = [];
            if (Array.isArray(obj)) {
                for (const item of obj) {
                    if (JSON.stringify(item).toLowerCase().includes(q)) res.push(item);
                }
            } else if (typeof obj === 'object' && obj !== null) {
                for (const key in obj) {
                    res = res.concat(recursiveSearch(obj[key]));
                }
            }
            return res;
        };
        const matches = recursiveSearch(evaluationQuestionsData).slice(0, 2);
        if (matches.length > 0) {
            foundInfo.push(`**IBIBAZO N'IBISUBIZO (Quiz Data):**\n${matches.map(m => JSON.stringify(m, null, 2)).join('\n')}`);
        }
     }
  }

  return foundInfo.join('\n\n');
};

const safeCache = async (query, response) => {
  if (mongoose.connection.readyState === 1) {
    try {
      await AIInteraction.create({ prompt: query, response: response });
    } catch (e) {
      console.warn("⚠️ Failed to cache response:", e.message);
    }
  }
};

// --- MAIN AI HANDLER ---
export const askAssistant = async (prompt, userName, sentiment, history = []) => {
  const query = prompt.toLowerCase().trim();

  // 1. CACHE CHECK
  try {
    if (mongoose.connection.readyState === 1) {
      const cached = await AIInteraction.findOne({ prompt: query, response: { $exists: true, $ne: "" } });
      if (cached) {
        console.log("🚀 Serving from Cache");
        return cached.response;
      }
    }
  } catch (e) { console.error("Cache Check Error:", e.message); }

  // 2. CONTEXT GATHERING (MongoDB / Local JS / PDFs)
  if (!isPdfLoaded) await loadPDFs();
  
  const pdfContext = searchPDFs(query);
  const jsContext = searchLocalJS(query);
  
  let combinedContext = [pdfContext, jsContext].filter(Boolean).join("\n\n");
  
  // Truncate context if too large
  if (combinedContext.length > 8000) {
      combinedContext = combinedContext.substring(0, 8000) + "\n...(truncated)...";
  }

  const systemInstruction = `ROLE: You are Moto-Sensei, the premier Rwandan Driving Instructor for "Ishami".
TONE: Professional, encouraging, culturally authentic.
URURIMI: Kinyarwanda cyonyine (ONLY Kinyarwanda).
IBUJIJWE: Ntuzigere ukoresha Igiswayiri (Swahili) cyangwa amagambo yaryo.
SAFETY: End with #GerayoAmahoro.
EMOJIS: Use relevant emojis (🚦, 🚗, 🛑, 🇷🇼).

INSTRUCTIONS:
1. FIRST, check the "LOCAL KNOWLEDGE BASE" provided below. If the answer is found there, use it as your primary source.
2. IF AND ONLY IF the answer is NOT in the Local Knowledge Base, use Google Search to find the answer.
3. If using Google Search, ensure the information is relevant to Rwanda Traffic Rules.
4. Explain the answer clearly in Kinyarwanda.
5. Never mention "PDFs", "database", or "files". Speak as an expert.
`;

  // 3. GEMINI CALL (With Google Search Grounding)
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      tools: [
        { googleSearch: {} } // Enable Google Search grounding
      ]
    });

    const parts = [
      { text: systemInstruction },
      { text: `LOCAL KNOWLEDGE BASE (Primary Source):\n${combinedContext}` },
      { text: `USER QUERY: ${prompt}` }
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts: parts }]
    });

    let response = result.response.text();
    
    // Append supportive nudge
    const nudge = "Uko usobanukiwe neza, niko uba uri hafi yo kubona permi yawe! 🚦";
    if (!response.includes("Uko usobanukiwe neza")) {
      response = response.trim() + "\n\n" + nudge;
    }

    // Sentiment-based humanization
    if (sentiment === 'angry') {
      response = "Wihangane, mwene wacu. Ndumva ko bibabaje. " + response;
    } else if (sentiment === 'happy') {
      response = "Nibyo rwose! Ishami rishimiye intambwe uteye. " + response;
    } else if (sentiment === 'sad') {
      response = "Humura, turi kumwe ku rugendo rwo kwiga. " + response;
    }
    
    // 4. CACHE RESULT
    await safeCache(query, response);
    return response;

  } catch (error) {
    console.error("⚠️ Gemini API Failed:", error.message);
    return "Habaye ikibazo. Ntabwo mbashije kubona igisubizo aka kanya. Banza urebe muri Polisi y'u Rwanda cyangwa wongere ugerageze mukanya. #GerayoAmahoro";
  }
};
