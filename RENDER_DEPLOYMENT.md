# Deploying Backend to Render

This guide will walk you through deploying your World Cup Sim backend to Render.

## Prerequisites

1. A Render account (sign up at [render.com](https://render.com))
2. A MongoDB database (MongoDB Atlas recommended for cloud deployment)
3. Your backend code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your MongoDB Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create/access your cluster
2. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`)
3. **Important**: Make sure to:
   - Replace `<password>` with your actual database password
   - Add your Render service IP to the IP whitelist (or use `0.0.0.0/0` for all IPs - less secure but easier for development)

## Step 2: Create a Web Service on Render

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Web Service"
3. Connect your Git repository:
   - If not connected, click "Connect account" and authorize Render
   - Select your repository containing the World Cup Sim code
4. Configure the service:
   - **Name**: `world-cup-sim-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend` (important!)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier is fine to start (or choose a paid plan)

## Step 3: Configure Environment Variables

In the Render dashboard, go to your service → Environment tab, and add:

1. **MONGO_URI**: Your MongoDB Atlas connection string
   ```
   mongodb+srv://username:password@cluster.mongodb.net/worldcupsim?retryWrites=true&w=majority
   ```
   (Replace with your actual credentials)

2. **PORT**: Render automatically sets this, but you can add it if needed:
   ```
   PORT=10000
   ```
   (Render provides PORT automatically, but your code uses `process.env.PORT || 5001` which is fine)

3. **NODE_ENV**: (Optional but recommended)
   ```
   NODE_ENV=production
   ```

## Step 4: Deploy

1. Click "Create Web Service"
2. Render will:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Start your server (`npm start`)
3. Wait for the deployment to complete (usually 2-5 minutes)
4. Once deployed, you'll get a URL like: `https://world-cup-sim-backend.onrender.com`

## Step 5: Verify Deployment

1. Visit your service URL in a browser
2. You should see: "API is running..."
3. Check the logs in Render dashboard to ensure:
   - "MongoDB connected" message appears
   - No errors in the logs

## Step 6: Connect Frontend to Render Backend

The frontend has been updated to use environment variables. Here's how to connect it:

### Option A: Using Environment Variable (Recommended)

1. **For Local Development:**
   - Create a file `world-cup-sim/.env` (if it doesn't exist)
   - Add this line:
     ```
     VITE_API_BASE_URL=http://localhost:5001
     ```
   - Restart your Vite dev server

2. **For Production Build:**
   - Create a file `world-cup-sim/.env.production` 
   - Add your Render backend URL:
     ```
     VITE_API_BASE_URL=https://your-backend-service.onrender.com
     ```
   - Replace `your-backend-service.onrender.com` with your actual Render service URL
   - Build your frontend: `npm run build`
   - The built files will use the production API URL

### Option B: Direct Code Update (Quick Fix)

If you want to quickly test, you can temporarily update `world-cup-sim/src/api/api.js`:

```javascript
const API_BASE_URL = 'https://your-backend-service.onrender.com';
```

**Note:** Replace `your-backend-service.onrender.com` with your actual Render service URL.

### Finding Your Render Backend URL

1. Go to your Render dashboard
2. Click on your backend service
3. Your service URL is shown at the top (format: `https://service-name.onrender.com`)

## Important Notes

### Environment File Location
Your `server.js` loads environment variables from `backend/.env`, but Render uses environment variables set in the dashboard. The `.env` file is for local development only.

### Free Tier Limitations
- Render free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds (cold start)
- Consider upgrading to a paid plan for production use

### MongoDB Atlas IP Whitelist
- Add `0.0.0.0/0` to allow all IPs (for development)
- Or add Render's IP ranges (check Render docs for current IPs)
- For production, use more restrictive IP whitelisting

### CORS Configuration
Your backend already has `cors()` enabled, which should work with your frontend. If you encounter CORS issues:
- Make sure your frontend URL is allowed (you may need to configure CORS more specifically)
- Check the `cors` middleware in `server.js`

## Troubleshooting

### Deployment Fails
- Check build logs in Render dashboard
- Ensure `package.json` has correct `start` script
- Verify root directory is set to `backend`

### MongoDB Connection Fails
- Double-check `MONGO_URI` environment variable
- Verify MongoDB Atlas IP whitelist includes Render IPs
- Check MongoDB Atlas network access settings

### Service Won't Start
- Check logs for error messages
- Verify `PORT` environment variable (Render sets this automatically)
- Ensure all dependencies are in `package.json`

### 502 Bad Gateway
- Service might be spinning up (free tier)
- Check service logs for errors
- Verify the start command is correct

## Alternative: Using render.yaml (Optional)

If you prefer infrastructure-as-code, you can use the `render.yaml` file included in this project. See the file for configuration details.

