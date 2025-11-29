# ISHAMI Backend Implementation Guide

This document provides instructions for implementing the backend API to make the ISHAMI frontend fully functional.

## Tech Stack Requirements

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: MTN Mobile Money & Airtel Money APIs

## Required API Endpoints

### 1. Authentication Routes (`/api/auth`)

#### POST `/api/auth/signup`
```javascript
// Request Body
{
  "username": "string",
  "email": "string",
  "password": "string"
}

// Response
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "username": "string",
    "email": "string",
    "isPro": false,
    "role": "user",
    "loginStreak": 0,
    "badges": []
  }
}
```

#### POST `/api/auth/signin`
```javascript
// Request Body
{
  "email": "string",
  "password": "string"
}

// Response (same as signup)
```

### 2. Quiz Routes (`/api/quiz`)

#### GET `/api/quiz/get_latest?lang=en`
```javascript
// Query params: lang (en, kiny, fr)
// Response
{
  "success": true,
  "questions": [
    {
      "id": "question-id",
      "category_en": "Traffic Signs",
      "category_kiny": "Ibyapa",
      "question_kiny": "Icyapa gifite ibara...",
      "question_en": "What does a red sign...",
      "options": [
        {
          "text_kiny": "Ibibujijwe",
          "text_en": "Prohibition",
          "isCorrect": true
        }
      ],
      "imageUrl": "https://...",
      "isPremium": false
    }
  ]
}
```

#### POST `/api/quiz/submit`
```javascript
// Request Body
{
  "userId": "user-id",
  "answers": [
    { "questionId": "q1", "selectedOption": 0, "isCorrect": true }
  ],
  "score": 18,
  "totalQuestions": 20,
  "timeTakenSeconds": 1200
}

// Response
{
  "success": true,
  "result": {
    "score": 18,
    "percentage": 90,
    "passed": true,
    "newStreak": 6
  }
}
```

### 3. Payment Routes (`/api/payment`)

#### POST `/api/payment/initiate`
```javascript
// Request Body
{
  "userId": "user-id",
  "amount": 1000,
  "phone": "+250788000000",
  "provider": "mtn" // or "airtel"
}

// Response
{
  "success": true,
  "transactionId": "TXN-123456",
  "status": "PENDING",
  "message": "Check your phone to complete payment"
}
```

#### POST `/api/payment/webhook`
```javascript
// Webhook from MTN/Airtel
// Verify payment and update user's isPro status
// Send response to payment gateway
```

### 4. AI Assistant Routes (`/api/ai`)

#### POST `/api/ai/ask`
```javascript
// Request Body
{
  "userId": "user-id",
  "question": "What does a red sign mean?",
  "questionCount": 3
}

// Response
{
  "success": true,
  "response": "A red octagonal sign is a STOP sign...",
  "remainingQuestions": 2 // If not Pro
}
```

### 5. Resources Routes (`/api/resources`)

#### GET `/api/resources`
```javascript
// Response
{
  "success": true,
  "resources": [
    {
      "id": "res-1",
      "title_en": "Traffic Signs Guide",
      "title_kiny": "Ibyapa by'Umuhanda",
      "type": "PDF",
      "category": "Signs",
      "isPremium": false,
      "fileUrl": "https://cdn.../file.pdf",
      "size": "2.5 MB"
    }
  ]
}
```

### 6. Leaderboard Routes (`/api/leaderboard`)

#### GET `/api/leaderboard?limit=100`
```javascript
// Response
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "userId": "user-id",
      "username": "Jean Claude",
      "score": 980,
      "totalQuizzes": 50,
      "streak": 15,
      "badges": ["SignMaster", "SpeedDemon"]
    }
  ]
}
```

### 7. Irembo Routes (`/api/irembo`)

#### POST `/api/irembo/register`
```javascript
// Request Body
{
  "userId": "user-id",
  "fullName": "Jean Claude Mugabo",
  "nationalId": "1234567890123456",
  "phone": "+250788000000",
  "email": "jean@example.com",
  "language": "Kinyarwanda",
  "testMode": "Computer-based",
  "district": "Gasabo",
  "testDate": "2024-12-20"
}

// Response
{
  "success": true,
  "applicationId": "APP-123456",
  "billingId": "IREMBO-789012",
  "amount": 5500,
  "expiresAt": "2024-12-01T16:00:00Z"
}
```

### 8. Simulation Routes (`/api/simulation`)

#### POST `/api/simulation/submit`
```javascript
// Request Body (from Unity WebGL)
{
  "userId": "user-id",
  "scenarioId": "parking-01",
  "score": 85,
  "mistakes": 3,
  "timeTaken": 180,
  "metadata": {
    "collisions": 1,
    "trafficViolations": 2
  }
}

// Response
{
  "success": true,
  "leaderboardPosition": 45
}
```

## MongoDB Collections Schema

### users
```javascript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // bcrypt hashed
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  isPro: { type: Boolean, default: false },
  quizAttemptsToday: { type: Number, default: 0 },
  loginStreak: { type: Number, default: 0 },
  badges: [String],
  createdAt: { type: Date, default: Date.now }
}
```

### quizzes
```javascript
{
  category_en: { type: String, required: true },
  category_kiny: { type: String, required: true },
  question_kiny: { type: String, required: true },
  question_en: { type: String, required: true },
  options: [{
    text_kiny: String,
    text_en: String,
    isCorrect: Boolean
  }],
  imageUrl: String,
  isPremium: { type: Boolean, default: false },
  timesFailed: { type: Number, default: 0 }
}
```

### quizResults
```javascript
{
  userId: { type: ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, default: 20 },
  timeTakenSeconds: Number,
  incorrectAnswers: [String],
  completedAt: { type: Date, default: Date.now }
}
```

### payments
```javascript
{
  userId: { type: ObjectId, ref: 'User', required: true },
  transactionId: { type: String, required: true, unique: true },
  amountRWF: { type: Number, default: 1000 },
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'] },
  source: { type: String, enum: ['MTN', 'Airtel'] },
  paidAt: Date
}
```

### resources
```javascript
{
  title_kiny: String,
  title_en: String,
  type: { type: String, enum: ['PDF', 'Video', 'Image'] },
  fileUrl: String,
  isPremium: { type: Boolean, default: false },
  category: String,
  size: String
}
```

### iremboApplications
```javascript
{
  userId: { type: ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  nationalId: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  language: String,
  testMode: String,
  district: String,
  testDate: Date,
  billingId: { type: String, unique: true },
  status: { type: String, default: 'PENDING' },
  adminNotes: String,
  submittedAt: { type: Date, default: Date.now }
}
```

## Security Implementation

### 1. JWT Authentication Middleware
```javascript
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
}
```

### 2. Pro Access Middleware
```javascript
async function requirePro(req, res, next) {
  const user = await User.findById(req.user.id);
  if (!user.isPro) {
    return res.status(403).json({ error: 'Pro access required' });
  }
  next();
}
```

### 3. Input Validation (using Joi)
```javascript
const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});
```

## Environment Variables (.env)

```bash
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb://localhost:27017/ishami

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Payment Gateways
MTN_API_KEY=your-mtn-api-key
MTN_API_SECRET=your-mtn-api-secret
AIRTEL_API_KEY=your-airtel-api-key
AIRTEL_API_SECRET=your-airtel-api-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Frontend URL
FRONTEND_URL=https://ishami.rw
```

## Deployment Checklist

- [ ] Set up MongoDB Atlas or self-hosted MongoDB
- [ ] Configure environment variables
- [ ] Set up SSL/TLS certificates (Let's Encrypt)
- [ ] Configure CORS for frontend domain
- [ ] Set up payment gateway webhooks
- [ ] Implement rate limiting (express-rate-limit)
- [ ] Set up error logging (winston, sentry)
- [ ] Configure backup strategy for MongoDB
- [ ] Set up CI/CD pipeline
- [ ] Test all API endpoints
- [ ] Implement admin dashboard routes

## Testing with Frontend

The frontend is configured to work with mock data. To connect to your backend:

1. Update API calls in the frontend to point to your backend URL
2. Replace mock functions in AuthContext with actual API calls
3. Update quiz, payment, and resource fetching logic
4. Test authentication flow
5. Verify payment integration with test credentials
6. Test PWA offline functionality

## Support

For questions about the backend implementation, refer to the MERN stack documentation and Rwanda payment gateway APIs.
