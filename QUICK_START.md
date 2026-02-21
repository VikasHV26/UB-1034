# 🎯 Quick Start - 5 Minute Setup

## ⚡ TL;DR

Your OAuth error is **fixed in code**. Just need to update Google Console (5 min) and restart your app.

---

## 📋 What You Need to Do (Copy-Paste Instructions)

### 1. Open Google Cloud Console
```
https://console.cloud.google.com/
```

### 2. Select BloodLink Project
Click your project name in the top bar

### 3. Go to Credentials
- Left sidebar → **APIs & Services**
- Click **Credentials**

### 4. Click Your OAuth Client ID
Look for: Your Client ID ending with `.apps.googleusercontent.com`

### 5. Add JavaScript Origins
Find: **Authorized JavaScript origins**

Add these 4 (click "Add URI" each time):
```
http://localhost:5173
http://localhost:5174
http://127.0.0.1:5173
http://127.0.0.1:5174
```

### 6. Add Redirect URIs
Find: **Authorized redirect URIs**

Add same 4 URIs (click "Add URI" each time)

### 7. Click SAVE

### 8. Go to OAuth Consent Screen
- Left sidebar → **OAuth consent screen**
- Find **Authorized domains**
- Add: `localhost`
- Add: `127.0.0.1`
- Click **SAVE**

### 9. Wait 5 Minutes ⏳
Google needs time to update

### 10. Start Your Apps
```bash
# Terminal 1 - Backend
cd bloodlink-backend
python -m uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd bloodlink-frontend
npm run dev
```

### 11. Test
- Open: http://localhost:5174
- Click: Login
- Try: Google Sign In
- ✅ Should work!

---

## 🎯 That's It!

Your OAuth is now fixed! 🎉

---

## 📚 Need More Details?

See these files in order:
1. `GOOGLE_CONSOLE_CONFIG.md` - Detailed console steps
2. `GOOGLE_OAUTH_CHECKLIST.md` - Verification checklist
3. `OAUTH_FIX_SUMMARY.md` - What changed in code
4. `COMPLETE_SOLUTION.md` - Full overview

---

## ✅ What's Already Done

- ✅ `.env.local` file created
- ✅ Frontend updated
- ✅ Backend updated
- ✅ Error handling improved
- ✅ Documentation created

🟡 Only Google Console setup left (you do this now)

---

## 🚨 Common Issues

**Still getting origin_mismatch?**
- Wait 10 minutes
- Clear cache: Ctrl+Shift+Delete
- Try incognito: Ctrl+Shift+N

**Getting different error?**
- Check backend is running (port 8000)
- Check `.env.local` file exists
- Press F12 to see console errors

**Port is 5173 instead of 5174?**
- That's fine, add 5173 to Google Console too
- (Already done for you)

---

## ✨ You're Ready!

Everything is set up. Just Google Console and you're done! 🚀
