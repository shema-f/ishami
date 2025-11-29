# ⚡ ISHAMI - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install (1 minute)

```bash
npm install
```

### Step 2: Run (30 seconds)

```bash
npm run dev
```

Open: [http://localhost:5173](http://localhost:5173)

### Step 3: Explore

✅ **Frontend is 100% complete and working!**

All features work with mock data. You can:
- Browse all pages
- Take the quiz (5 free questions)
- Chat with AI (5 free questions)
- See leaderboard
- View resources
- Fill Irembo form
- Access admin dashboard (sign in as admin)

---

## 📊 What You Have

### ✅ Complete User Features
- 🏠 Home Page - Hero, features, testimonials
- 📝 Quiz - 20 questions with timer and paywall
- 🤖 AI Assistant - Moto-Sensei chat
- 🎮 3D Simulation - Coming soon preview
- 📚 Resources - Downloadable content
- 🏆 Leaderboard - User rankings
- 🔐 Auth - Sign in/Sign up
- 📋 Irembo - Test registration form

### ⚙️ Complete Admin Dashboard
- 📊 Analytics Dashboard
- 👥 User Management (CRUD)
- ❓ Question Management (CRUD)
- 💳 Payment Tracking
- 📋 Irembo Applications

### 🛠️ Technical Features
- ✅ PWA (installable, offline-ready)
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Dark/Light theme toggle
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Motion animations
- ✅ SEO optimized
- ✅ API service layer ready

---

## 🔌 Connect to Backend (3 Steps)

### 1. Set API URL

Create `.env`:
```bash
VITE_API_URL=http://localhost:5000
```

### 2. Update API Calls

File: `/services/api.ts`

Find lines with:
```typescript
// TODO: Replace with actual API call
```

Uncomment the real API call below it.

### 3. Test

```bash
npm run dev
```

Your frontend now talks to your backend! 🎉

**Full Integration Guide:** See `/BACKEND-INTEGRATION-GUIDE.md`

---

## 🎨 Admin Access

### Quick Test Admin Panel

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Sign in** (or create mock admin in AuthContext)

3. **Navigate to:** [http://localhost:5173/admin/dashboard](http://localhost:5173/admin/dashboard)

4. **Explore:**
   - Dashboard with analytics
   - User management
   - Question CRUD
   - Payment tracking
   - Irembo applications

### Admin Features Checklist

- ✅ Analytics dashboard with charts
- ✅ User list with search and filters
- ✅ Edit/delete users
- ✅ Toggle Pro status
- ✅ Create/edit/delete quiz questions
- ✅ Bilingual question forms
- ✅ Payment transaction history
- ✅ Irembo application management
- ✅ Responsive sidebar navigation
- ✅ Mobile-friendly interface

---

## 📂 Important Files

| File | What It Does | When You Need It |
|------|-------------|-----------------|
| `/services/api.ts` | **ALL API CALLS** | Backend integration |
| `/contexts/AuthContext.tsx` | User authentication | Login/logout logic |
| `/utils/routes.tsx` | Page routing | Add new pages |
| `/components/AdminLayout.tsx` | Admin sidebar | Add admin pages |
| `/styles/globals.css` | Colors and theme | Change branding |
| `/BACKEND-INTEGRATION-GUIDE.md` | Integration steps | Connect backend |

---

## 🎯 Common Tasks

### Change Colors

**File:** `/styles/globals.css`

Search and replace:
- `#00A3AD` → Your primary color
- `#FF6B6B` → Your secondary color

### Add New Page

1. Create: `/pages/NewPage.tsx`
2. Add route: `/utils/routes.tsx`
3. Add nav link: `/components/Navigation.tsx`

### Change Paywall Limit

**Files:**
- `/pages/Quiz.tsx` - Change `>= 5`
- `/pages/AIAssistant.tsx` - Change `>= 5`

### Test Admin Panel

1. Set user role to 'admin' in `AuthContext.tsx`
2. Go to `/admin/dashboard`
3. Test CRUD operations

### Deploy Frontend

**Netlify:**
```bash
npm run build
netlify deploy --prod
```

**Vercel:**
```bash
vercel --prod
```

---

## 📖 Documentation

We have **7 comprehensive guides**:

1. **README.md** - Main overview (start here!)
2. **QUICK-START.md** - This file (fastest way to get running)
3. **IMPLEMENTATION-GUIDE.md** - Every feature explained
4. **BACKEND-INTEGRATION-GUIDE.md** - Step-by-step API integration
5. **README-BACKEND.md** - Backend API specifications
6. **FILE-STRUCTURE.md** - Complete file tree
7. **PROJECT-SUMMARY.md** - Executive overview

**Start with:** README.md → QUICK-START.md → BACKEND-INTEGRATION-GUIDE.md

---

## 🆘 Troubleshooting

### App Won't Start

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### "Module not found" Error

Check these imports:
- `import { motion } from 'motion/react'` ✅
- `import { toast } from 'sonner@2.0.3'` ✅
- `import { Link } from 'react-router'` ✅

### Admin Page Shows 404

1. Check route exists in `/utils/routes.tsx`
2. Verify user role is 'admin'
3. Check `AdminLayout.tsx` redirect logic

### API Calls Failing

1. Check `.env` has correct `VITE_API_URL`
2. Verify backend is running
3. Check browser console for CORS errors
4. Verify JWT token in localStorage

### Dark Mode Not Working

1. Check `ThemeContext` is in `App.tsx`
2. Verify Tailwind `dark:` classes
3. Check `document.documentElement.classList`

---

## 💡 Pro Tips

1. **Use Mock Data First**
   - App works out of the box with mock data
   - Test UI/UX before connecting backend
   - Great for demos!

2. **Check Browser Console**
   - All API calls are logged
   - Errors show exact problem
   - Network tab shows requests

3. **Test on Mobile**
   - Use Chrome DevTools Device Mode
   - Or test on real phone
   - PWA works best on mobile

4. **Use Admin Panel**
   - Mock data is editable
   - Test CRUD operations
   - See how data flows

5. **Read Code Comments**
   - Every file has helpful comments
   - `// TODO:` marks integration points
   - JSDoc explains functions

---

## ✅ Verification Checklist

Before you start coding:

- [ ] App runs without errors
- [ ] All pages load correctly
- [ ] Theme toggle works
- [ ] Navigation works on mobile
- [ ] Quiz displays questions
- [ ] AI assistant responds
- [ ] Admin panel accessible
- [ ] Mock data displays properly

After backend integration:

- [ ] Authentication works
- [ ] Quiz loads from database
- [ ] Answers are saved
- [ ] Payments process
- [ ] Admin CRUD works
- [ ] Leaderboard updates
- [ ] Resources download

---

## 🎉 You're Ready!

You have everything you need:
- ✅ Complete, working frontend
- ✅ Full admin dashboard
- ✅ API integration framework
- ✅ Comprehensive documentation
- ✅ Clear next steps

### Next Steps:

1. ✅ **Done!** - Frontend is complete
2. **Build Backend** - See `/README-BACKEND.md`
3. **Integrate APIs** - See `/BACKEND-INTEGRATION-GUIDE.md`
4. **Test Everything** - Use checklists
5. **Deploy** - Netlify + Your backend
6. **Launch!** 🚀

---

## 📞 Need Help?

**For Frontend Issues:**
- Check browser console
- Read code comments
- Search in `/documentation/`

**For Backend Issues:**
- Check server logs
- Test API with Postman
- Verify database connection

**For Integration:**
- Follow `/BACKEND-INTEGRATION-GUIDE.md`
- Check Network tab in DevTools
- Verify API responses

---

**You're all set! Time to build something amazing! 🚀**

*Built with ❤️ for Rwanda's Future Drivers*
