# 🚀 JTask - Vercel Deployment Guide

## Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free)
3. **MongoDB Atlas Account** - Sign up at [mongodb.com/atlas](https://mongodb.com/atlas) (free)

---

## Step 1: Set Up MongoDB Atlas

### Create Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account or sign in
3. Create a new **Project** → Name it "JTask"
4. Click **Build a Database** → Choose **M0 FREE** tier
5. Select a cloud provider and region close to you
6. Click **Create**

### Configure Database Access
1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Enter a username (e.g., `jtaskuser`)
5. Generate or enter a secure password (**SAVE THIS!**)
6. Set privileges to **Read and write to any database**
7. Click **Add User**

### Configure Network Access
1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (adds `0.0.0.0/0`)
4. Click **Confirm**

### Get Connection String
1. Go to **Database** → Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Add `jtask` as database name before the `?`

**Example:**
```
mongodb+srv://jtaskuser:YourPassword123@cluster0.abc123.mongodb.net/jtask?retryWrites=true&w=majority
```

---

## Step 2: Push Code to GitHub

### Initialize Git (if not already done)
```bash
# In backend folder
cd backend
git init
git add .
git commit -m "Initial commit - JTask Backend"

# In frontend folder  
cd ../frontend
git init
git add .
git commit -m "Initial commit - JTask Frontend"
```

### Create GitHub Repositories
1. Go to [GitHub](https://github.com) → New Repository
2. Create `jtask-backend` repository
3. Create `jtask-frontend` repository

### Push to GitHub
```bash
# Backend
cd backend
git remote add origin https://github.com/YOUR_USERNAME/jtask-backend.git
git branch -M main
git push -u origin main

# Frontend
cd ../frontend
git remote add origin https://github.com/YOUR_USERNAME/jtask-frontend.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your `jtask-backend` repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as is)
   
5. Add **Environment Variables**:

   | Name | Value |
   |------|-------|
   | `MONGO_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/jtask?retryWrites=true&w=majority` |
   | `SESSION_SECRET` | `your-super-secret-random-string-here-make-it-long` |
   | `CLIENT_URL` | `https://jtask-frontend.vercel.app` (update after frontend deploy) |
   | `NODE_ENV` | `production` |

6. Click **Deploy**
7. **Copy your backend URL** (e.g., `https://jtask-backend.vercel.app`)

---

## Step 4: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your `jtask-frontend` repository
4. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./`

5. Add **Environment Variables**:

   | Name | Value |
   |------|-------|
   | `REACT_APP_API_URL` | `https://jtask-backend.vercel.app` (your backend URL from Step 3) |

6. Click **Deploy**
7. **Copy your frontend URL** (e.g., `https://jtask-frontend.vercel.app`)

---

## Step 5: Update Backend CORS

1. Go to Vercel Dashboard → Backend Project → Settings → Environment Variables
2. Update `CLIENT_URL` to your actual frontend URL
3. Go to **Deployments** → Click **...** → **Redeploy**

---

## ✅ Deployment Complete!

Your JTask app should now be live at:
- **Frontend**: `https://jtask-frontend.vercel.app`
- **Backend API**: `https://jtask-backend.vercel.app`

---

## 🔧 Troubleshooting

### CORS Errors
- Ensure `CLIENT_URL` in backend matches your frontend URL exactly
- Make sure there's no trailing slash

### Database Connection Issues
- Check MongoDB Atlas Network Access allows `0.0.0.0/0`
- Verify password in connection string is correct
- Ensure database name `jtask` is in the connection string

### Session/Login Issues
- Verify `SESSION_SECRET` is set in Vercel
- Check `NODE_ENV` is set to `production`
- Sessions require `sameSite: 'none'` and `secure: true` in production

### Build Failures
- Check Vercel build logs for specific errors
- Ensure all dependencies are in `package.json`

---

## 📝 Environment Variables Summary

### Backend (Vercel)
```
MONGO_URI=mongodb+srv://...
SESSION_SECRET=your-secret-key
CLIENT_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend.vercel.app
```
