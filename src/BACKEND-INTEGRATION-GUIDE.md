# Complete Backend Integration Guide

This guide shows you exactly how to connect the ISHAMI frontend to your backend API.

## 🔧 Step-by-Step Integration

### Step 1: Set Up Environment Variables

Create a `.env` file in your project root:

```bash
# Frontend Environment Variables
VITE_API_URL=http://localhost:5000
VITE_ENVIRONMENT=development

# For production
# VITE_API_URL=https://api.ishami.rw
# VITE_ENVIRONMENT=production
```

### Step 2: Update API Service URLs

The API service layer is in `/services/api.ts`. All API calls are centralized here.

**Current State:** All functions have `// TODO: Replace with actual API call` comments.

**What You Need To Do:**

1. **Set Your Backend URL**
   - Line 8 in `/services/api.ts`:
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```
   
2. **Uncomment API Calls**
   - Find all `// TODO: Replace with actual API call` comments
   - Uncomment the real API call
   - Remove or comment out mock data

**Example - Before:**
```typescript
const loadQuestions = async () => {
  try {
    // TODO: Replace with actual API call
    // const data = await adminAPI.getQuestions();
    
    // Mock data
    const mockQuestions = [...]
    
    setQuestions(mockQuestions);
  } catch (error) {
    console.error('Failed to load questions:', error);
  }
};
```

**Example - After:**
```typescript
const loadQuestions = async () => {
  try {
    // Real API call
    const data = await adminAPI.getQuestions();
    
    setQuestions(data.questions);
  } catch (error) {
    console.error('Failed to load questions:', error);
  }
};
```

### Step 3: Update Auth Context

File: `/contexts/AuthContext.tsx`

**Replace mock functions with real API calls:**

```typescript
// Before (Mock)
const login = async (email: string, password: string) => {
  const mockUser: User = {...};
  localStorage.setItem('authToken', 'mock-jwt-token');
  setUser(mockUser);
};

// After (Real)
const login = async (email: string, password: string) => {
  const response = await authAPI.signin(email, password);
  
  if (response.success) {
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setUser(response.user);
  } else {
    throw new Error(response.message);
  }
};
```

**Do the same for:**
- `signup` function
- `logout` function (call backend to invalidate token)

### Step 4: Update Quiz Page

File: `/pages/Quiz.tsx`

**Load questions from backend:**

```typescript
// Add import
import { quizAPI } from '../services/api';

// In component
useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const data = await quizAPI.getQuestions('en');
      setQuestions(data.questions);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };
  
  fetchQuestions();
}, []);

// Submit quiz results
const handleQuizComplete = async () => {
  try {
    await quizAPI.submitQuiz({
      userId: user.id,
      answers: userAnswers,
      score: score,
      totalQuestions: 20,
      timeTakenSeconds: timeSpent
    });
    
    setQuizCompleted(true);
  } catch (error) {
    console.error('Failed to submit quiz:', error);
  }
};
```

### Step 5: Update AI Assistant

File: `/pages/AIAssistant.tsx`

**Connect to AI backend:**

```typescript
import { aiAPI } from '../services/api';

const handleSend = async () => {
  if (!input.trim() || !user) return;

  try {
    const response = await aiAPI.askQuestion(
      user.id,
      input,
      questionCount
    );
    
    await simulateTyping(response.response);
    setQuestionCount(prev => prev + 1);
  } catch (error) {
    console.error('Failed to get AI response:', error);
    // Fallback to mock response
    const mockResponse = getMockResponse(input);
    await simulateTyping(mockResponse);
  }
};
```

### Step 6: Update Payment Integration

**Create payment component:**

```typescript
// In any component with "Upgrade to Pro" button
import { paymentAPI } from '../services/api';

const handleUpgrade = async () => {
  try {
    const response = await paymentAPI.initiatePayment({
      userId: user.id,
      amount: 1000,
      phone: user.phone || '+250788000000',
      provider: 'mtn' // or 'airtel'
    });
    
    if (response.success) {
      // Show payment instructions
      alert(`Transaction ID: ${response.transactionId}. Please complete payment on your phone.`);
      
      // Poll for payment status
      pollPaymentStatus(response.transactionId);
    }
  } catch (error) {
    console.error('Payment failed:', error);
  }
};

const pollPaymentStatus = async (transactionId: string) => {
  const maxAttempts = 20;
  let attempts = 0;
  
  const interval = setInterval(async () => {
    attempts++;
    
    try {
      const status = await paymentAPI.checkStatus(transactionId);
      
      if (status.status === 'SUCCESS') {
        clearInterval(interval);
        // Update user pro status
        updateUser({ isPro: true });
        alert('Payment successful! You are now a Pro user.');
      } else if (status.status === 'FAILED' || attempts >= maxAttempts) {
        clearInterval(interval);
        alert('Payment failed or timed out. Please try again.');
      }
    } catch (error) {
      console.error('Failed to check payment status:', error);
    }
  }, 5000); // Check every 5 seconds
};
```

### Step 7: Update Resources Page

File: `/pages/Resources.tsx`

```typescript
import { resourcesAPI } from '../services/api';

useEffect(() => {
  const fetchResources = async () => {
    try {
      const data = await resourcesAPI.getResources();
      setResources(data.resources);
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    }
  };
  
  fetchResources();
}, []);

const handleDownload = async (resource: Resource) => {
  if (resource.isPremium && !user?.isPro) {
    setShowPaywall(true);
    return;
  }
  
  await resourcesAPI.downloadResource(resource.id);
};
```

### Step 8: Update Leaderboard

File: `/pages/Leaderboard.tsx`

```typescript
import { leaderboardAPI } from '../services/api';

useEffect(() => {
  const fetchLeaderboard = async () => {
    try {
      const data = await leaderboardAPI.getLeaderboard(100);
      setLeaderboard(data.leaderboard);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  };
  
  fetchLeaderboard();
}, []);
```

### Step 9: Update Irembo Page

File: `/pages/Irembo.tsx`

```typescript
import { iremboAPI } from '../services/api';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validate()) return;
  
  try {
    const response = await iremboAPI.register({
      userId: user?.id || '',
      ...formData
    });
    
    if (response.success) {
      setBillingId(response.billingId);
      setSubmitted(true);
    }
  } catch (error) {
    console.error('Failed to submit Irembo application:', error);
    alert('Failed to submit application. Please try again.');
  }
};
```

### Step 10: Update Admin Pages

All admin pages follow the same pattern. Here's an example for the Dashboard:

**File:** `/pages/admin/Dashboard.tsx`

```typescript
import { adminAPI } from '../../services/api';

const loadAnalytics = async () => {
  try {
    setLoading(true);
    
    // Real API call
    const data = await adminAPI.getAnalytics();
    
    setAnalytics(data);
  } catch (error) {
    console.error('Failed to load analytics:', error);
  } finally {
    setLoading(false);
  }
};
```

**Apply the same pattern to:**
- `/pages/admin/Users.tsx` → `adminAPI.getUsers()`, `adminAPI.updateUser()`, `adminAPI.deleteUser()`
- `/pages/admin/Questions.tsx` → `adminAPI.getQuestions()`, `adminAPI.createQuestion()`, etc.
- `/pages/admin/Payments.tsx` → `adminAPI.getPayments()`
- `/pages/admin/IremboApplications.tsx` → `adminAPI.getIremboApplications()`, `adminAPI.updateIremboApplication()`

---

## 🔐 Authentication Flow

### 1. User Signs In

```
User enters email/password
  ↓
Frontend calls authAPI.signin()
  ↓
Backend validates credentials
  ↓
Backend returns JWT token + user data
  ↓
Frontend stores token in localStorage
  ↓
Frontend updates AuthContext
  ↓
User is redirected to home page
```

### 2. Authenticated Requests

```
User makes a request
  ↓
Frontend includes JWT in Authorization header
  ↓
Backend validates JWT
  ↓
Backend checks user permissions
  ↓
Backend processes request
  ↓
Backend returns response
```

### 3. Admin Access

```
User tries to access /admin/*
  ↓
AdminLayout checks user.role === 'admin'
  ↓
If not admin, redirect to home
  ↓
If admin, render admin page
```

---

## 💾 Data Flow Examples

### Example 1: Quiz Flow

```
1. User clicks "Start Quiz"
2. Frontend: quizAPI.getQuestions('en')
3. Backend: GET /api/quiz/get_latest?lang=en
4. Backend checks: user.isPro or question.isPremium === false
5. Backend returns: 20 questions (filtered by access)
6. Frontend displays questions
7. User completes quiz
8. Frontend: quizAPI.submitQuiz(data)
9. Backend: POST /api/quiz/submit
10. Backend calculates score, updates streak, saves to DB
11. Backend returns: score, percentage, passed
12. Frontend displays results
```

### Example 2: Payment Flow

```
1. User clicks "Upgrade to Pro"
2. Frontend: paymentAPI.initiatePayment()
3. Backend: POST /api/payment/initiate
4. Backend calls MTN/Airtel API
5. Backend returns: transactionId, status: 'PENDING'
6. Frontend displays: "Check your phone"
7. User completes payment on phone
8. MTN/Airtel calls: POST /api/payment/webhook
9. Backend validates webhook
10. Backend updates: user.isPro = true
11. Backend saves payment record
12. Frontend polls: paymentAPI.checkStatus()
13. Frontend detects: status === 'SUCCESS'
14. Frontend updates: user state
15. User gains Pro access
```

### Example 3: Admin Creates Question

```
1. Admin fills form
2. Admin clicks "Save Question"
3. Frontend: adminAPI.createQuestion(data)
4. Backend: POST /api/admin/questions
5. Backend validates: user.role === 'admin'
6. Backend validates: question data
7. Backend saves to MongoDB
8. Backend returns: created question with ID
9. Frontend adds to local state
10. Frontend displays success message
```

---

## 🛡️ Security Checklist

### Frontend Security

✅ **JWT Storage**
- Store in localStorage (acceptable for MVP)
- For production, consider httpOnly cookies

✅ **Token Expiry**
```typescript
// Add to api.ts
if (response.status === 401) {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  window.location.href = '/auth';
}
```

✅ **Input Validation**
- All forms have validation
- Use browser's built-in validation
- Validate on backend too

✅ **XSS Protection**
- React automatically escapes content
- Don't use dangerouslySetInnerHTML
- Sanitize user-generated content on backend

### Backend Security (Your Responsibility)

⚠️ **Password Hashing**
```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashedPassword = await bcrypt.hash(password, saltRounds);
```

⚠️ **JWT Generation**
```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { id: user._id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
```

⚠️ **Input Validation**
```javascript
const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const { error } = schema.validate(req.body);
```

⚠️ **Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 🧪 Testing Your Integration

### Test Checklist

- [ ] **Authentication**
  - [ ] Sign up creates user in database
  - [ ] Sign in returns valid JWT
  - [ ] Invalid credentials return error
  - [ ] JWT is included in subsequent requests

- [ ] **Quiz**
  - [ ] Questions load from database
  - [ ] First 5 questions accessible without Pro
  - [ ] Paywall blocks question 6 for non-Pro users
  - [ ] Quiz submission saves to database
  - [ ] Score calculated correctly

- [ ] **Payment**
  - [ ] Payment initiation calls gateway API
  - [ ] Webhook updates user.isPro
  - [ ] User gains access after payment
  - [ ] Failed payments don't grant access

- [ ] **Admin**
  - [ ] Only admins can access /admin/*
  - [ ] Analytics display correct data
  - [ ] CRUD operations work on all entities
  - [ ] Changes reflect in database

### Test Manually

```bash
# 1. Sign up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"test1234"}'

# 2. Sign in
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test1234"}'

# 3. Get questions (with token)
curl -X GET "http://localhost:5000/api/quiz/get_latest?lang=en" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# 4. Submit quiz
curl -X POST http://localhost:5000/api/quiz/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"userId":"USER_ID","score":15,"totalQuestions":20,"timeTakenSeconds":600}'
```

---

## 🚨 Common Issues & Solutions

### Issue 1: CORS Errors

**Problem:** Browser blocks requests to backend

**Solution:** Add CORS headers in backend
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
```

### Issue 2: 401 Unauthorized

**Problem:** Backend rejects requests

**Solutions:**
1. Check JWT token in localStorage
2. Verify Authorization header is sent
3. Check token hasn't expired
4. Verify JWT secret matches between frontend/backend

### Issue 3: Data Not Updating

**Problem:** Changes don't appear immediately

**Solutions:**
1. Check if API call is successful
2. Verify local state is updated after API call
3. Add loading states
4. Implement optimistic updates

### Issue 4: Payment Not Completing

**Problem:** User pays but doesn't get Pro access

**Solutions:**
1. Check webhook is being called
2. Verify webhook validates payment
3. Ensure database transaction is atomic
4. Add logging to track payment flow

---

## 📊 Monitoring & Debugging

### Add Logging

```typescript
// In api.ts, update apiCall function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  console.log(`API Call: ${options.method || 'GET'} ${endpoint}`);
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options });
    console.log(`API Response: ${response.status}`);
    
    const data = await response.json();
    console.log('API Data:', data);
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

### Monitor Network Requests

1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Make a request
4. Check:
   - Request URL
   - Request Method
   - Request Headers (Authorization)
   - Request Payload
   - Response Status
   - Response Data

---

## ✅ Final Checklist

Before deploying to production:

- [ ] All mock data removed
- [ ] All API calls use real backend
- [ ] Environment variables set correctly
- [ ] HTTPS enabled (both frontend and backend)
- [ ] CORS configured properly
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Success/error messages shown to users
- [ ] Authentication persists across page reloads
- [ ] Admin access properly restricted
- [ ] Payment webhook tested
- [ ] Database backups configured
- [ ] Monitoring/logging set up

---

## 🎉 You're Ready!

Once you've completed all these steps, your frontend and backend will be fully integrated. The app will work with real data, real authentication, and real payments.

Need help? Check:
1. Browser console for frontend errors
2. Network tab for API issues
3. Backend logs for server errors
4. MongoDB logs for database issues

Good luck! 🚀
