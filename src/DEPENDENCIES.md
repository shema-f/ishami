# Required Dependencies

This document lists all the npm packages you need to install for the ISHAMI frontend to work.

## Installation Command

Run this command in your project root:

```bash
npm install react react-dom react-router lucide-react motion sonner@2.0.3
```

## Dependency List

### Core Framework
- **react** (v18+) - UI library
- **react-dom** (v18+) - React DOM rendering
- **react-router** (v7+) - Client-side routing with data APIs

### UI & Icons
- **lucide-react** - Icon library (modern, customizable icons)
- **motion** - Animation library (formerly Framer Motion)
  - Import as: `import { motion } from 'motion/react'`

### Notifications
- **sonner@2.0.3** - Toast notifications
  - Import as: `import { toast } from "sonner@2.0.3"`

### Styling
- **tailwindcss** (v4+) - Utility-first CSS (already included in Figma Make)

## Dev Dependencies (usually included)

These should already be configured in your environment:
- **vite** - Build tool and dev server
- **typescript** - Type checking
- **@types/react** - React TypeScript types
- **@types/react-dom** - React DOM TypeScript types

## ShadCN UI Components (Already Available)

The following UI components are pre-installed in `/components/ui/`:
- accordion, alert, alert-dialog, avatar
- badge, breadcrumb, button, calendar
- card, carousel, chart, checkbox
- collapsible, command, context-menu, dialog
- drawer, dropdown-menu, form, hover-card
- input, input-otp, label, menubar
- navigation-menu, pagination, popover, progress
- radio-group, resizable, scroll-area, select
- separator, sheet, sidebar, skeleton
- slider, sonner, switch, table
- tabs, textarea, toast, toggle, toggle-group, tooltip

## Optional Enhancements (Not Required but Recommended)

### If You Want to Add Later:

1. **Form Validation**
   ```bash
   npm install react-hook-form@7.55.0 zod
   ```

2. **Date Handling**
   ```bash
   npm install date-fns
   ```

3. **HTTP Client (for API calls)**
   ```bash
   npm install axios
   # or use native fetch (already available)
   ```

4. **State Management (if needed)**
   ```bash
   npm install zustand
   # or @reduxjs/toolkit react-redux
   ```

5. **Charts & Graphs (for admin dashboard)**
   ```bash
   npm install recharts
   ```

## Import Examples

### React & Routing
```typescript
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
```

### Icons
```typescript
import { Home, User, Menu, X, ChevronRight } from 'lucide-react';
```

### Animations
```typescript
import { motion, AnimatePresence } from 'motion/react';
```

### Notifications
```typescript
import { toast } from 'sonner@2.0.3';

// Usage
toast.success('Quiz submitted successfully!');
toast.error('Payment failed');
```

### ShadCN Components
```typescript
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Dialog } from './components/ui/dialog';
```

## Troubleshooting

### If you get "Module not found" errors:

1. **Clear node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check imports match exactly:**
   - ✅ `import { motion } from 'motion/react'`
   - ❌ `import { motion } from 'framer-motion'`

3. **For sonner, use version 2.0.3:**
   - ✅ `import { toast } from 'sonner@2.0.3'`
   - ❌ `import { toast } from 'sonner'`

4. **React Router v7 syntax:**
   - ✅ `import { Link } from 'react-router'`
   - ❌ `import { Link } from 'react-router-dom'`

## Version Compatibility

| Package | Version | Notes |
|---------|---------|-------|
| react | 18+ | Latest stable |
| react-router | 7+ | New data APIs |
| motion | Latest | Replaces framer-motion |
| lucide-react | Latest | Icon library |
| sonner | 2.0.3 | Toast notifications |
| tailwindcss | 4+ | Utility CSS |

## Build Configuration

Your `package.json` scripts should include:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx"
  }
}
```

## Environment Setup

No environment variables needed for the frontend to run with mock data.

When connecting to backend, you may want to create `.env`:

```bash
VITE_API_URL=https://api.ishami.rw
VITE_ENVIRONMENT=production
```

Then use in code:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

---

That's it! All packages are standard and widely-used in the React ecosystem. The app should work immediately after running `npm install`.
