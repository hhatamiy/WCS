# Migrating Backend from Render to Railway

This guide will walk you through migrating your World Cup Sim backend from Render to Railway for better performance and faster response times.

## Why Migrate to Railway?

- **Faster cold starts**: 2-5 seconds vs 30-60 seconds on Render free tier
- **Better CPU performance**: More consistent performance for CPU-intensive Monte Carlo simulations
- **No spin-down delays**: Services stay active longer, reducing cold start frequency
- **Affordable pricing**: $5/month starter plan with $5 free credit monthly
- **Easy deployment**: Simple GitHub integration

## Prerequisites

1. A Railway account (sign up at [railway.app](https://railway.app))
2. Your existing MongoDB database (MongoDB Atlas - can reuse from Render)
3. Your backend code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
4. Your Render deployment URL (for reference during migration)

## Step 1: Create Railway Account and Project

1. Go to [railway.app](https://railway.app) and sign up (GitHub login recommended)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub account if prompted
5. Select your repository containing the World Cup Sim code

## Step 2: Create a New Service

1. In your Railway project, click "+ New"
2. Select "GitHub Repo" (if not already connected)
3. Select your repository
4. Railway will automatically detect it's a Node.js project

## Step 3: Configure Service Settings

1. Click on the newly created service
2. Go to the "Settings" tab
3. Configure the following:

   **Service Settings:**
   - **Root Directory**: `backend` (important!)
   - **Build Command**: `npm install` (or leave empty, Railway auto-detects)
   - **Start Command**: `npm start`

   **Environment Variables:**
   Click "Variables" tab and add:
   
   - **MONGO_URI**: Your MongoDB Atlas connection string
     ```
     mongodb+srv://username:password@cluster.mongodb.net/worldcupsim?retryWrites=true&w=majority
     ```
     (Use the same connection string from Render - no changes needed)
   
   - **NODE_ENV**: 
     ```
     production
     ```
   
   - **PORT**: Railway automatically sets this, but your code handles it with `process.env.PORT || 5001`

## Step 4: Deploy

1. Railway will automatically start deploying once you connect the repo
2. You can watch the deployment progress in the "Deployments" tab
3. Wait for deployment to complete (usually 1-3 minutes)
4. Once deployed, Railway will provide a URL like: `https://your-service-name.up.railway.app`

## Step 5: Configure Custom Domain (Optional)

1. Go to your service → Settings → Networking
2. Click "Generate Domain" to get a Railway-provided domain
3. Or add a custom domain if you have one

## Step 6: Verify Deployment

1. Visit your Railway service URL in a browser
2. You should see: "API is running..."
3. Check the logs in Railway dashboard (Deployments tab → View Logs) to ensure:
   - "MongoDB connected" message appears
   - No errors in the logs
   - Service is running successfully

## Step 7: Test API Endpoints

Test your API endpoints to ensure everything works:

```bash
# Test root endpoint
curl https://your-service-name.up.railway.app/

# Test betting odds endpoint
curl "https://your-service-name.up.railway.app/api/betting/odds?team1=Argentina&team2=France&type=group"

# Test group winner endpoint
curl "https://your-service-name.up.railway.app/api/betting/group-winner?teams=[\"Argentina\",\"France\",\"Brazil\",\"Germany\"]"
```

## Step 8: Update Frontend to Use Railway Backend

### Option A: Using Environment Variable (Recommended)

1. **For Local Development:**
   - Keep `world-cup-sim/.env` with:
     ```
     VITE_API_BASE_URL=http://localhost:5001
     ```

2. **For Production Build (Vercel):**
   - Go to your Vercel project settings
   - Navigate to Environment Variables
   - Add or update:
     ```
     VITE_API_BASE_URL=https://your-service-name.up.railway.app
     ```
   - Replace `your-service-name.up.railway.app` with your actual Railway service URL
   - Redeploy your frontend on Vercel

### Option B: Update .env.production File

1. Create or update `world-cup-sim/.env.production`:
   ```
   VITE_API_BASE_URL=https://your-service-name.up.railway.app
   ```
2. Rebuild and redeploy your frontend

## Step 9: Monitor Performance

After migration, you should notice:

- **Faster cold starts**: 2-5 seconds vs 30-60 seconds
- **Faster response times**: Optimized simulations with MongoDB caching
- **More consistent performance**: Better CPU allocation

Monitor your Railway dashboard:
- **Metrics**: View CPU, memory, and network usage
- **Logs**: Check for any errors or warnings
- **Deployments**: Track deployment history

## Step 10: Keep Render Active (Temporary)

During the migration period:

1. **Keep Render deployment active** for a few days as backup
2. **Test Railway thoroughly** with real user traffic
3. **Monitor both services** for any issues
4. **Once confident**, update frontend to Railway URL
5. **After 1-2 weeks**, you can decommission Render if desired

## Important Notes

### MongoDB Atlas IP Whitelist

Railway uses dynamic IPs, so you'll need to:

1. Go to MongoDB Atlas → Network Access
2. Add `0.0.0.0/0` to allow all IPs (for development)
3. Or check Railway docs for their IP ranges (if available)
4. For production, consider using MongoDB Atlas VPC peering if available

### Environment Variables

- Railway automatically provides `PORT` - your code handles this with `process.env.PORT || 5001`
- All environment variables set in Railway dashboard override any `.env` files
- The `backend/.env` file is for local development only

### CORS Configuration

Your backend already has `cors()` enabled. If you encounter CORS issues:

1. Check that your frontend domain is allowed
2. Verify CORS middleware in `server.js` allows your frontend URL
3. Railway services automatically get HTTPS, so ensure your frontend uses HTTPS too

### Pricing

- **Free tier**: $5 credit/month (usually enough for small apps)
- **Starter plan**: $5/month for 512MB RAM, 1 vCPU (recommended for production)
- **Usage-based**: Pay only for what you use beyond free credit

## Troubleshooting

### Deployment Fails

- Check build logs in Railway dashboard (Deployments → View Logs)
- Ensure `package.json` has correct `start` script
- Verify root directory is set to `backend`
- Check that all dependencies are in `package.json`

### MongoDB Connection Fails

- Double-check `MONGO_URI` environment variable in Railway
- Verify MongoDB Atlas IP whitelist includes Railway IPs (or `0.0.0.0/0`)
- Check MongoDB Atlas network access settings
- Ensure MongoDB username/password are correct

### Service Won't Start

- Check logs for error messages
- Verify `PORT` is being set (Railway sets this automatically)
- Ensure all dependencies are installed correctly
- Check that `server.js` is the correct entry point

### 502 Bad Gateway

- Service might be starting up (check logs)
- Verify the start command is correct
- Check that the service is actually running (Metrics tab)

### Slow Response Times

- Check Railway metrics for CPU/memory usage
- Verify MongoDB caching is working (check logs for cache hits)
- Consider upgrading to a paid plan if on free tier
- Check that simulations are using optimized iteration counts

## Performance Comparison

### Before (Render Free Tier)
- Cold start: 30-60 seconds
- Simulation time: 1-2 seconds (10k iterations)
- Cache hit: N/A (in-memory only, lost on restart)

### After (Railway + Optimizations)
- Cold start: 2-5 seconds
- Simulation time: 200-500ms (3-5k iterations with early convergence)
- Cache hit: < 50ms (MongoDB persistent cache)

## Rollback Plan

If you need to rollback to Render:

1. Keep Render service active during migration
2. Update frontend `VITE_API_BASE_URL` back to Render URL
3. Redeploy frontend
4. Railway service can remain as backup

## Next Steps

After successful migration:

1. Monitor Railway metrics for 1-2 weeks
2. Verify all API endpoints work correctly
3. Test betting odds and simulations thoroughly
4. Update documentation with Railway URL
5. Consider decommissioning Render after stable period

## Support

- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Check Railway status: [status.railway.app](https://status.railway.app)

