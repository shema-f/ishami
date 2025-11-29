# 📂 Complete File Structure

## Overview

This document shows you exactly where everything is and what each file does.

---

## 🌲 Full File Tree

```
ishami-frontend/
│
├── 📄 App.tsx                          # Main app entry point
├── 📄 index.html                       # HTML with PWA meta tags
│
├── 📁 pages/                           # All application pages
│   ├── 📄 Home.tsx                     # Landing page
│   ├── 📄 AIAssistant.tsx             # Moto-Sensei AI chat
│   ├── 📄 Quiz.tsx                    # Interactive quiz with paywall
│   ├── 📄 Simulation.tsx              # 3D simulation preview
│   ├── 📄 Resources.tsx               # Downloadable resources
│   ├── 📄 Leaderboard.tsx             # User rankings
│   ├── 📄 Auth.tsx                    # Sign in/Sign up
│   ├── 📄 Irembo.tsx                  # Test registration form
│   ├── 📄 NotFound.tsx                # 404 error page
│   │
│   └── 📁 admin/                       # Admin dashboard pages
│       ├── 📄 Dashboard.tsx            # Analytics overview
│       ├── 📄 Users.tsx                # User management
│       ├── 📄 Questions.tsx            # Quiz CRUD
│       ├── 📄 Payments.tsx             # Transaction tracking
│       └── 📄 IremboApplications.tsx   # Test registration management
│
├── 📁 components/                      # Reusable components
│   ├── 📄 Root.tsx                     # Main layout wrapper
│   ├── 📄 AdminLayout.tsx              # Admin layout with sidebar
│   ├── 📄 Navigation.tsx               # Top navigation bar
│   ├── 📄 Footer.tsx                   # Site footer
│   ├── 📄 FlipCard.tsx                 # Interactive flip cards
│   ├── 📄 TestimonialCarousel.tsx      # Auto-rotating reviews
│   │
│   ├── 📁 figma/                       # Protected Figma components
│   │   └── 📄 ImageWithFallback.tsx    # Image component (DO NOT EDIT)
│   │
│   └── 📁 ui/                          # ShadCN UI components
│       ├── 📄 button.tsx               # Pre-built button
│       ├── 📄 card.tsx                 # Card component
│       ├── 📄 dialog.tsx               # Modal dialog
│       ├── 📄 input.tsx                # Input field
│       └── ... (30+ other components)
│
├── 📁 contexts/                        # React Context providers
│   ├── 📄 ThemeContext.tsx             # Dark/Light theme state
│   └── 📄 AuthContext.tsx              # Authentication state
│
├── 📁 services/                        # API integration layer
│   └── 📄 api.ts                       # ⭐ ALL API CALLS HERE
│
├── 📁 utils/                           # Utility functions
│   └── 📄 routes.tsx                   # React Router configuration
│
├── 📁 styles/                          # CSS files
│   └── 📄 globals.css                  # Global styles + Tailwind
│
├── 📁 public/                          # Static assets
│   ├── 📄 manifest.json                # PWA manifest
│   ├── 📄 sw.js                        # Service worker
│   ├── 📄 vite.svg                     # Favicon
│   └── ... (icons, images)
│
└── 📁 Documentation/                   # All guides
    ├── 📄 README.md                    # Main readme (you are here!)
    ├── 📄 IMPLEMENTATION-GUIDE.md      # Feature guide
    ├── 📄 BACKEND-INTEGRATION-GUIDE.md # ⭐ How to connect backend
    ├── 📄 README-BACKEND.md            # Backend API specs
    ├── 📄 DEPENDENCIES.md              # Required packages
    ├── 📄 PROJECT-SUMMARY.md           # Executive summary
    └── 📄 FILE-STRUCTURE.md            # This file
```

---

## 🎯 Key Files to Know

### 1. `/services/api.ts` ⭐⭐⭐

**Most Important File for Backend Integration**

Contains ALL API calls in one place:
```typescript
export const authAPI = { signup, signin, verifyToken }
export const quizAPI = { getQuestions, submitQuiz }
export const aiAPI = { askQuestion }
export const paymentAPI = { initiatePayment, checkStatus }
export const resourcesAPI = { getResources, downloadResource }
export const leaderboardAPI = { getLeaderboard }
export const iremboAPI = { register }
export const adminAPI = { 
  getAnalytics, getUsers, updateUser, deleteUser,
  getQuestions, createQuestion, updateQuestion, deleteQuestion,
  getPayments, getIremboApplications, updateIremboApplication
}
```

**What You Need To Do:**
1. Set `API_BASE_URL` to your backend
2. Find all `// TODO: Replace with actual API call`
3. Uncomment the real API call
4. Remove mock data

---

### 2. `/contexts/AuthContext.tsx`

**Authentication State Management**

Manages:
- Current user
- Login/logout functions
- JWT token storage
- User role and Pro status

**What You Need To Do:**
- Replace mock `login()` with real API call
- Replace mock `signup()` with real API call
- Add token refresh logic

---

### 3. `/utils/routes.tsx`

**All Application Routes**

Defines every URL in your app:
```typescript
/ → Home
/quiz → Quiz
/ai-assistant → AI Assistant
/admin/dashboard → Admin Dashboard
/admin/users → User Management
... etc
```

**What You Need To Do:**
- Add new routes as needed
- Update redirect logic

---

### 4. `/components/AdminLayout.tsx`

**Admin Panel Layout**

Features:
- Sidebar navigation
- Admin role check
- Responsive mobile menu
- Logout button

**What You Need To Do:**
- Customize sidebar items
- Add new admin pages

---

## 📱 User Pages Breakdown

### `/pages/Home.tsx`
- Hero section
- Feature cards
- Flip cards (interactive questions)
- Testimonial carousel
- Newsletter form
- Irembo CTA
- Footer

**Mock Data:** Testimonials, flip card questions  
**API Needed:** None (static content)

---

### `/pages/Quiz.tsx`
- 20-minute timer
- Question display (bilingual)
- Answer selection
- Progress tracker
- **Freemium Paywall** at question 6
- Results screen

**Mock Data:** 20 quiz questions  
**API Needed:**
- `quizAPI.getQuestions(lang)`
- `quizAPI.submitQuiz(data)`

---

### `/pages/AIAssistant.tsx`
- Chat interface
- Typing animation
- Suggested prompts
- Message history
- **Freemium Paywall** at 5 questions

**Mock Data:** AI responses  
**API Needed:**
- `aiAPI.askQuestion(userId, question, count)`

---

### `/pages/Resources.tsx`
- Resource grid
- Type filtering (PDF/Video/Image)
- Premium locks
- Download buttons

**Mock Data:** Resource list  
**API Needed:**
- `resourcesAPI.getResources()`
- `resourcesAPI.downloadResource(id)`

---

### `/pages/Leaderboard.tsx`
- Top 3 podium
- Full rankings table
- User stats
- Badges display

**Mock Data:** User rankings  
**API Needed:**
- `leaderboardAPI.getLeaderboard(limit)`

---

### `/pages/Auth.tsx`
- Sign in/Sign up toggle
- Form validation
- Password visibility toggle
- Social login placeholders

**Mock Data:** None  
**API Needed:**
- `authAPI.signup(username, email, password)`
- `authAPI.signin(email, password)`

---

### `/pages/Irembo.tsx`
- Complete registration form
- All Rwanda districts
- Form validation
- Billing ID generation
- Payment instructions

**Mock Data:** Billing ID  
**API Needed:**
- `iremboAPI.register(data)`

---

## 🔧 Admin Pages Breakdown

### `/pages/admin/Dashboard.tsx`
- Revenue stats
- User count
- Conversion rate
- Payment success rate
- Most failed questions
- Recent payments

**Mock Data:** All analytics  
**API Needed:**
- `adminAPI.getAnalytics()`

---

### `/pages/admin/Users.tsx`
- User list table
- Search functionality
- Edit user modal
- Delete user
- Toggle Pro status
- Change role

**Mock Data:** User list  
**API Needed:**
- `adminAPI.getUsers(page, limit)`
- `adminAPI.updateUser(userId, updates)`
- `adminAPI.deleteUser(userId)`

---

### `/pages/admin/Questions.tsx`
- Question list
- Create new question
- Edit existing question
- Delete question
- Bilingual input fields
- Mark as premium

**Mock Data:** Question list  
**API Needed:**
- `adminAPI.getQuestions(page, limit)`
- `adminAPI.createQuestion(question)`
- `adminAPI.updateQuestion(questionId, updates)`
- `adminAPI.deleteQuestion(questionId)`

---

### `/pages/admin/Payments.tsx`
- Payment history table
- Status filtering
- Search by transaction ID
- Revenue tracking
- MTN/Airtel breakdown

**Mock Data:** Payment list  
**API Needed:**
- `adminAPI.getPayments(page, limit)`

---

### `/pages/admin/IremboApplications.tsx`
- Application list
- Status management
- Admin notes
- View details modal
- Update status

**Mock Data:** Application list  
**API Needed:**
- `adminAPI.getIremboApplications(page, limit)`
- `adminAPI.updateIremboApplication(appId, updates)`

---

## 🎨 Component Breakdown

### `/components/Navigation.tsx`
**Top navigation bar**
- Logo
- Menu items
- Theme toggle
- Auth button
- Mobile menu

---

### `/components/Footer.tsx`
**Site footer**
- Social links
- Quick links
- Legal links
- Copyright

---

### `/components/FlipCard.tsx`
**Interactive flip cards**
- Front: Question
- Back: Answer
- Click to flip animation
- Used on home page

---

### `/components/TestimonialCarousel.tsx`
**Auto-rotating testimonials**
- 5-second auto-advance
- Manual navigation
- Smooth transitions
- Used on home page

---

### `/components/AdminLayout.tsx`
**Admin panel layout**
- Sidebar navigation
- Top bar
- Mobile responsive
- Role-based access

---

## 🔄 Data Flow

### Example: User Takes Quiz

```
1. User clicks "Start Quiz"
   ↓
2. Quiz.tsx loads
   ↓
3. useEffect calls quizAPI.getQuestions()
   ↓
4. api.ts sends GET /api/quiz/get_latest
   ↓
5. Backend returns questions
   ↓
6. Frontend displays questions
   ↓
7. User answers questions
   ↓
8. At Q6, check if user.isPro
   ↓
9. If not Pro, show paywall
   ↓
10. User completes quiz
    ↓
11. Frontend calls quizAPI.submitQuiz()
    ↓
12. api.ts sends POST /api/quiz/submit
    ↓
13. Backend saves score, updates streak
    ↓
14. Frontend displays results
```

---

## 📝 Where to Make Changes

### Change Colors
**File:** `/styles/globals.css`
- Search for `#00A3AD` (primary)
- Search for `#FF6B6B` (secondary)
- Search for `#1A1A2E` (dark bg)

### Add New Page
1. Create `/pages/NewPage.tsx`
2. Add route in `/utils/routes.tsx`
3. Add nav link in `/components/Navigation.tsx`

### Add New Admin Page
1. Create `/pages/admin/NewPage.tsx`
2. Add route in `/utils/routes.tsx`
3. Add nav item in `/components/AdminLayout.tsx`

### Change Paywall Limit
**Files:**
- `/pages/Quiz.tsx` - Change `>= 5` to new limit
- `/pages/AIAssistant.tsx` - Change `>= 5` to new limit

### Change Payment Amount
**Files:**
- Search for `1000` in all files
- Update to new price (e.g., 2000 RWF)

### Add New API Endpoint
**File:** `/services/api.ts`
1. Add function to appropriate object (e.g., `quizAPI`)
2. Use `apiCall()` helper function
3. Add JSDoc comment with endpoint details

---

## 🚫 Files You Should NOT Edit

### Protected Files
- `/components/figma/ImageWithFallback.tsx` - System component
- `/components/ui/*` - ShadCN components (edit if needed, but carefully)

### Auto-Generated Files
- `/node_modules/` - Never edit
- `/dist/` - Build output, regenerated on build
- `package-lock.json` - Auto-managed by npm

---

## ✅ Files You WILL Edit

### For Backend Integration
1. `/services/api.ts` - Uncomment API calls
2. `/contexts/AuthContext.tsx` - Replace mock auth
3. All page files - Replace mock data with API calls

### For Customization
1. `/styles/globals.css` - Change colors
2. `/pages/Home.tsx` - Update content
3. `/components/Navigation.tsx` - Add/remove links
4. `/utils/routes.tsx` - Add new routes

### For Admin Features
1. `/pages/admin/*.tsx` - Update admin pages
2. `/components/AdminLayout.tsx` - Customize sidebar
3. `/services/api.ts` - Add admin API calls

---

## 🎯 Quick Reference

| Need to... | Edit this file |
|------------|---------------|
| Add API endpoint | `/services/api.ts` |
| Change colors | `/styles/globals.css` |
| Add new page | `/pages/NewPage.tsx` + `/utils/routes.tsx` |
| Modify auth logic | `/contexts/AuthContext.tsx` |
| Update navigation | `/components/Navigation.tsx` |
| Change paywall | `/pages/Quiz.tsx` or `/pages/AIAssistant.tsx` |
| Add admin feature | `/pages/admin/` + `/components/AdminLayout.tsx` |
| Update footer | `/components/Footer.tsx` |
| Modify PWA settings | `/public/manifest.json` + `/public/sw.js` |

---

## 🎉 That's Everything!

You now have a complete map of the entire codebase. Every file has a purpose, and you know exactly where to find what you need.

**Pro Tip:** Use your IDE's search function (Ctrl+Shift+F or Cmd+Shift+F) to find specific code across all files.

---

**Need Help?**
1. Check the file-specific comments in the code
2. Read `/BACKEND-INTEGRATION-GUIDE.md` for API integration
3. Check `/README.md` for general overview
4. Look at browser console for errors

Good luck! 🚀
