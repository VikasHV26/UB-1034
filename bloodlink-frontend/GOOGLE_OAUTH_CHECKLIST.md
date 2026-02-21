# ✅ Google OAuth Fix - Quick Checklist

## 🎯 What Was Done

Your code has been updated to support environment-based Google OAuth configuration. Here's what changed:

### 1. Environment Variables Created ✅
- **File**: `.env.local`
- **Contains**:
  - `VITE_GOOGLE_CLIENT_ID` → Your Google OAuth Client ID
  - `VITE_API_URL` → Backend API URL
  
### 2. Code Updated ✅
- **main.tsx** → Now loads Client ID from environment
- **Login.tsx** → Improved error handling
- **api.ts** → Dynamic API URL with 401 handling

---

## 🔴 What YOU Need to Do (CRITICAL)

### ⏱️ **Takes 5 minutes**

Open your browser and follow these steps:

### 1. Go to Google Cloud Console
```
https://console.cloud.google.com/
```

### 2. Select Your Project
Look for: **BloodLink** or similar project name

### 3. Navigate to Credentials
- Left sidebar → **APIs & Services**
- Click **Credentials**

### 4. Add Authorized Origins
Find your **OAuth 2.0 Client ID** (ID: `165842518661...`)

Click it to open → **Authorized JavaScript origins**

**Add these origins:**
```
http://localhost:5173
http://localhost:5174
http://127.0.0.1:5173
http://127.0.0.1:5174
```

### 5. Add Authorized Redirect URIs
In the same page, find **Authorized redirect URIs**

**Add these URIs:**
```
http://localhost:5173
http://localhost:5174
http://127.0.0.1:5173
http://127.0.0.1:5174
```

### 6. Click SAVE ✅

### 7. Restart Your App
```bash
npm run dev
```

---

## 🧪 Test It Works

1. Go to `http://localhost:5174`
2. Click **Login**
3. Select a role (Patient, Hospital, etc.)
4. Click **Sign in with Google**
5. ✅ Should work without "origin_mismatch" error

---

## 🚨 If Still Getting Error

**Wait 5-10 minutes** - Google takes time to update

Then try:
1. **Clear browser cache**: Ctrl+Shift+Delete
2. **Try incognito mode**: Ctrl+Shift+N
3. **Check console**: F12 → Console tab → look for errors
4. **Check port**: Is it still 5174? (or 5173?)

---

## 🔧 Troubleshooting

### Port is Different?
If Vite says port is `5173`, update Google Console:
- Replace `5174` with `5173`

### Error: "Client ID not found"?
- Make sure `.env.local` exists
- Make sure you restarted the dev server (`npm run dev`)

### Error: "Backend not running"?
```bash
cd bloodlink-backend
python -m uvicorn app.main:app --reload
```

---

## 📋 Files Configuration

| File | Status | What It Does |
|------|--------|-------------|
| `.env.local` | ✅ Created | Stores Google Client ID & API URL |
| `src/main.tsx` | ✅ Updated | Loads Client ID from env |
| `src/features/auth/Login.tsx` | ✅ Updated | Better error messages |
| `src/services/api.ts` | ✅ Updated | Uses env API URL |

---

## 🎉 After Google Console Update

Your app will:
- ✅ Allow Google login without "origin_mismatch" error
- ✅ Automatically logout if token expires (401 error)
- ✅ Load different configs for dev/production
- ✅ Show helpful error messages

---

## 📱 For Production

When deploying to production:

1. Create `.env.production` with:
```
VITE_GOOGLE_CLIENT_ID=YOUR_PRODUCTION_CLIENT_ID
VITE_API_URL=https://your-api-domain.com
```

2. Add to Google Console:
```
https://yourdomain.com
https://www.yourdomain.com
https://api.yourdomain.com
```

3. Deploy with: `npm run build`

---

## ⏭️ Next Steps

1. **Now**: Go to Google Cloud Console (5 minutes)
2. **After that**: Restart your app
3. **Then**: Test login
4. **Finally**: Start building! 🚀

---

**Questions?** Check `OAUTH_SETUP.md` for detailed instructions.
