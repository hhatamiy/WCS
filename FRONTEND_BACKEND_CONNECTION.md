# Connecting Frontend to Render Backend

This guide explains how to connect your frontend to your deployed Render backend.

## Quick Setup

### Step 1: Get Your Render Backend URL

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your backend service
3. Copy the service URL (e.g., `https://world-cup-sim-backend.onrender.com`)

### Step 2: Configure Frontend for Production

Create a file `world-cup-sim/.env.production` with:

```env
VITE_API_BASE_URL=https://your-backend-service.onrender.com
```

Replace `your-backend-service.onrender.com` with your actual Render URL.

### Step 3: Build and Deploy Frontend

```bash
cd world-cup-sim
npm run build
```

The built files in `dist/` will now use your Render backend URL.

## For Local Development

Create `world-cup-sim/.env` (for local development):

```env
VITE_API_BASE_URL=http://localhost:5001
```

This allows you to:
- Develop locally with your local backend
- Build for production with your Render backend

## How It Works

The frontend uses `import.meta.env.VITE_API_BASE_URL` to get the API URL:
- In development: Uses `.env` file (defaults to `http://localhost:5001`)
- In production build: Uses `.env.production` file (your Render URL)

## Testing the Connection

1. **Test Backend Directly:**
   - Visit your Render URL in a browser
   - Should see: "API is running..."

2. **Test from Frontend:**
   - Open browser DevTools → Network tab
   - Use your frontend app
   - Check that API calls go to your Render URL (not localhost)

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

- Check Render dashboard → Logs for errors
- Verify MongoDB connection is working
- Check that your Render service is running (not spun down on free tier)

