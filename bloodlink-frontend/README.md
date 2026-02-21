# BloodLink Frontend

A modern React + TypeScript web application for blood donation management with role-based dashboards for Patients, Hospitals, and Blood Banks.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Components](#components)
- [Styling](#styling)
- [Configuration](#configuration)
- [Authentication Flow](#authentication-flow)
- [How to Use](#how-to-use)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

BloodLink Frontend is a responsive web application that provides:

- **Google OAuth Authentication** - Secure login with multiple role selection
- **Role-Based Dashboards** - Different UI for Patients, Hospitals, and Blood Banks
- **Blood Request Management** - Create and manage blood requests
- **Inventory Tracking** - View blood availability in real-time
- **Real-time Updates** - Live dashboard statistics
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Modern UI** - Professional interface with Tailwind CSS

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Framework** | React 18+ |
| **Language** | TypeScript 5+ |
| **Build Tool** | Vite 5+ |
| **Styling** | Tailwind CSS 3+ |
| **HTTP Client** | Axios |
| **State Management** | React Context API |
| **Routing** | React Router v6 |
| **Authentication** | Google OAuth 2.0 |
| **Package Manager** | npm or yarn |

---

## 📁 Project Structure

```
bloodlink-frontend/
├── src/
│   ├── main.tsx
│   ├── index.css
│   ├── app/
│   │   └── App.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── ProtectedRoute.tsx
│   ├── layouts/
│   │   └── DashboardLayout.tsx
│   ├── pages/
│   │   └── Landing.tsx
│   ├── features/
│   │   ├── auth/
│   │   ├── patient/
│   │   ├── hospital/
│   │   ├── bloodbank/
│   │   └── admin/
│   └── services/
│       └── api.ts
├── public/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Git
- Modern web browser

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Create .env.local

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_API_URL=http://localhost:8000
```

### Step 3: Get Google Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials (Web app)
3. Add `http://localhost:5173` to authorized origins
4. Copy Client ID to `.env.local`

---

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

---

## ✨ Features

- **Google OAuth Login** with role selection
- **Patient Dashboard** for blood requests
- **Hospital Dashboard** for request management
- **Blood Bank Dashboard** for inventory
- **Admin Dashboard** for system management
- **Role-Based Access Control**
- **Responsive Design** for all devices
- **Real-time Updates** and notifications
- **Error Handling** and validation

---

## 🏗️ Architecture

### Components
- **App.tsx**: Main router
- **AuthContext.tsx**: State management
- **Login.tsx**: Google OAuth
- **Navbar.tsx**: Navigation
- **DashboardLayout.tsx**: Main layout
- **Role-specific Dashboards**: Patient, Hospital, Blood Bank, Admin

### Data Flow
```
User Action → Service Call → API Request → Backend → Response → State Update → Re-render
```

### Authentication
1. User selects role and clicks login
2. Google OAuth popup
3. Frontend sends token to backend
4. Backend validates and creates JWT
5. Frontend stores JWT and role
6. Redirects to role-specific dashboard

---

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom CSS** in `src/index.css`
- **Responsive Design** with mobile-first approach
- **Color Scheme**:
  - Primary: Red (#DC2626)
  - Secondary: Gray (#6B7280)

---

## ⚙️ Configuration

### Environment Variables
```env
VITE_GOOGLE_CLIENT_ID  # Google OAuth Client ID
VITE_API_URL           # Backend API URL
VITE_APP_NAME          # App name
```

### Vite Config
- Port: 5173
- Hot reload enabled
- TypeScript support
- Tailwind CSS

---

## 📖 How to Use

### Patients
1. Login with Patient role
2. Create blood requests
3. Track request status
4. View request history

### Hospitals
1. Login with Hospital role
2. View patient requests
3. Approve/reject requests
4. Mark requests as fulfilled

### Blood Banks
1. Login with Blood Bank role
2. Add blood inventory
3. Manage blood units
4. Track expiry dates

---

## 🐛 Troubleshooting

**Login fails?**
- Check `.env.local` has correct Google Client ID
- Verify frontend URL is in Google Console authorized origins
- Clear browser cache and try again

**Cannot reach backend?**
- Verify backend is running on `localhost:8000`
- Check `VITE_API_URL` is correct
- Look for CORS errors in console

**Dashboard not loading?**
- Check browser console (F12) for errors
- Verify backend is accessible
- Refresh the page

**Forms not submitting?**
- Check browser console for errors
- Verify all required fields filled
- Check network tab for failed requests

---

## 🔍 DevTools Tips

### Check Authentication
1. F12 → Application
2. Local Storage → localhost:5173
3. Look for `token` and `role` keys

### Check Network
1. F12 → Network
2. Perform action
3. Click request to see details

### Check Errors
1. F12 → Console
2. Look for red error messages

---

## 🚀 Production Deployment

### Build
```bash
npm run build
```

### Deploy with Vercel
```bash
npm i -g vercel
vercel
```

### Deploy with Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

---

## 📊 Performance

- **Code Splitting** via Vite
- **Image Optimization** for faster load
- **Caching** strategies
- **Bundle Analysis** tools available

---

## 🔒 Security

- Never commit `.env.local`
- Use HTTPS in production
- Validate all inputs
- Sanitize displayed data
- Regular dependency updates

---

## 📚 Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

---

## 📞 Support

1. Check Troubleshooting section
2. Review browser console (F12)
3. Check network tab (F12 → Network)
4. Verify `.env.local` configuration
5. Ensure backend is running

---

## 🚀 Quick Start

```bash
npm install
# Create .env.local with VITE_GOOGLE_CLIENT_ID and VITE_API_URL
npm run dev
# Open http://localhost:5173
```

---

**Version**: 1.0  
**Last Updated**: February 2026  
**Status**: Production Ready ✅

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
