# Connecting Frontend to Railway Backend

This guide explains how to connect your frontend to your deployed Railway backend.

## Quick Setup

### Step 1: Get Your Railway Backend URL

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click on your backend service → Settings → Networking
3. Copy the public domain (e.g., `https://world-cup-sim-backend.up.railway.app`)

### Step 2: Configure Frontend for Production

Create a file `world-cup-sim/.env.production` with:

```env
VITE_API_BASE_URL=https://world-cup-sim-backend.up.railway.app
```

Replace this with your actual Railway URL if it differs.

> If a `VITE_API_BASE_URL` variable is set in your Vercel project settings, it overrides this file. Update it there to the Railway URL too.

### Step 3: Build and Deploy Frontend

```bash
cd world-cup-sim
npm run build
```

The built files in `dist/` will now use your Railway backend URL.

## For Local Development

Create `world-cup-sim/.env` (for local development):

```env
VITE_API_BASE_URL=http://localhost:5001
```

This allows you to:
- Develop locally with your local backend
- Build for production with your Railway backend

## How It Works

The frontend uses `import.meta.env.VITE_API_BASE_URL` to get the API URL:
- In development: Uses `.env` file (defaults to `http://localhost:5001`)
- In production build: Uses `.env.production` file (your Railway URL)

## Testing the Connection

1. **Test Backend Directly:**
   - Visit your Railway URL in a browser
   - Should see: "API is running..."

2. **Test from Frontend:**
   - Open browser DevTools → Network tab
   - Use your frontend app
   - Check that API calls go to your Railway URL (not localhost)

## Troubleshooting

### CORS Errors

If you see CORS errors, update your backend `server.js` to allow your frontend domain:

```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-domain.com'],
  credentials: true
}));
```

### API Calls Still Going to Localhost

- Make sure you created `.env.production` (not just `.env`)
- Rebuild your frontend: `npm run build`
- Clear browser cache
- Check browser DevTools → Network tab to see actual requests

### Backend Not Responding

- Check Railway dashboard → Logs for errors
- Verify MongoDB connection is working
- Check that your Railway service is running (check the Deployments tab)

