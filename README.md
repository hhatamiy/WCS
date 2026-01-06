# World Cup 2026 Simulator & Predictor

A comprehensive React-based web application for predicting, simulating, and analyzing the FIFA World Cup 2026 tournament. Built for soccer fans who want to test their knowledge and make detailed predictions about the new 48-team format.

## 🚀 Live Deployment

The application is deployed and available at:

- **Frontend (Vercel)**: [https://world-cup-sim.vercel.app/](https://world-cup-sim.vercel.app/)
- **Backend (Railway)**: [https://world-cup-sim-backend.up.railway.app](https://world-cup-sim-backend.up.railway.app) (Recommended - faster performance)
- **Backend (Render)**: [https://wcs-u1fy.onrender.com](https://wcs-u1fy.onrender.com) (Legacy - may be slower)

> **Performance Note**: The Railway backend provides significantly faster response times:
> - **Cold start**: 2-5 seconds (vs 30-60 seconds on Render free tier)
> - **Cache hits**: < 50ms (MongoDB persistent cache)
> - **Cache misses**: 200-500ms (optimized simulations with adaptive iterations)
> - **Overall**: 60-70% faster than previous implementation

## Problem Statement

The 2026 World Cup introduces a new 48-team format with 12 groups of 4 teams, followed by a Round of 32 knockout stage. Many existing bracket prediction websites don't support this new format. This application fills that gap by providing:

- Full support for the new 48-team format
- Accurate FIFA-compliant knockout bracket generation
- Real-time betting odds and probability calculations
- Match schedule integration
- Tournament simulation capabilities

## Target Audience

Soccer fans, World Cup enthusiasts, and bracket challenge participants who want to:
- Make detailed predictions for the 2026 World Cup
- Simulate tournament outcomes
- Analyze betting odds and probabilities
- Track match schedules and fixtures
- Test their knowledge against AI-powered analysis

## Key Features

### 🎯 Predictor Page
The main prediction interface where users can make comprehensive tournament predictions:

- **Group Stage Predictions**
  - Predict standings for all 12 groups (A-L)
  - Select 1st, 2nd, and 3rd place teams for each group
  - Visual group tables with team flags and positions
  - Support for teams that haven't qualified yet (with alternatives)

- **Third-Place Ranking**
  - Select which 8 third-place teams advance to Round of 32
  - Visual interface showing all 12 third-place teams
  - Automatic knockout bracket generation based on selections

- **Knockout Bracket Predictions**
  - Complete bracket visualization (Round of 32 → Final)
  - FIFA-compliant matchup algorithm (495 possible combinations)
  - Click-to-select winners for each matchup
  - Third-place playoff prediction
  - Champion selection
  - Match schedule integration with dates, times, and venues

- **Betting Odds Integration**
  - View odds for any matchup directly from the bracket
  - See probabilities for group winners
  - Monte Carlo simulation-based odds
  - FIFA rankings integration

- **Save & Load**
  - Automatic local storage of predictions
  - Resume predictions across sessions
  - Reset functionality

### 🎲 Simulator Page
Simulate complete tournament outcomes with realistic results:

- **Monte Carlo Simulation**
  - Simulate entire tournament from group stage to final
  - Generate realistic scores based on team strengths
  - Probability-weighted outcomes
  - Multiple simulation runs

- **Visual Results**
  - See simulated group standings
  - View simulated knockout bracket
  - Track simulated match results
  - Compare predictions vs. simulations

### 📊 Betting Odds Page
Comprehensive odds and probability analysis:

- **Group Matchups**
  - View all 6 matchups within a group
  - See win/draw probabilities for each match
  - FIFA rankings-based calculations
  - Bookmaker-style odds display

- **Individual Matchups**
  - Detailed odds for specific team matchups
  - Win/draw/loss probabilities
  - Penalty shootout probabilities (for knockout matches)
  - Multiple bookmaker odds comparison

- **Probability Calculations**
  - Based on FIFA rankings (as of November 2025)
  - Optimized Monte Carlo simulation (3,000-5,000 adaptive iterations)
  - Early convergence detection for faster results
  - MongoDB persistent caching (7-day TTL)
  - Deterministic seeded random generation

### 📅 Fixtures Page
Complete match schedule viewer:

- **Match Schedule**
  - All group stage matches with dates and times
  - All knockout stage matches
  - Venue information
  - Match status indicators
  - Filter by stage (Group, Round of 32, Round of 16, etc.)

- **Team Information**
  - Team flags and country codes
  - Match details and context
  - Navigation to betting odds

### 🎪 Draw Simulator
Simulate the official World Cup group stage draw:

- Random team assignment to 12 groups
- Support for 48 qualified teams
- Save draw results
- View draw outcomes

## Technical Features

### FIFA-Compliant Algorithms
- **Knockout Bracket Generation**: Implements the official FIFA algorithm for Round of 32 matchups
  - Handles all 495 possible combinations of advancing third-place teams
  - Lookup table generated from official FIFA possibilities
  - Accurate bracket structure matching official tournament format

### Data Integration
- **Match Schedule**: Complete integration with official match schedule
  - Dates, times, and venues for all matches
  - Group stage and knockout stage coverage
  - Match ID system for tracking

- **FIFA Rankings**: Hardcoded FIFA rankings (as of November 2025)
  - Used for probability calculations
  - Supports 100+ teams
  - Handles team name variations

### User Experience
- **Responsive Design**: Modern glassmorphism UI
- **Real-time Updates**: Instant feedback on selections
- **Visual Feedback**: Color-coded selections and states
- **Navigation**: Easy switching between prediction views
- **Persistence**: Automatic save/load of predictions

## Project Structure

```
WorldCupSim/
│
├── backend/                        # Node.js/Express Backend Server
│   ├── .env                        # Environment variables (MongoDB URI, JWT_SECRET, PORT)
│   ├── db.js                       # MongoDB connection configuration
│   ├── server.js                   # Express server entry point
│   ├── package.json                # Backend dependencies
│   │
│   ├── models/                     # MongoDB Mongoose Models
│   │   ├── User.js                 # User schema
│   │   ├── Bracket.js              # Bracket prediction model
│   │   ├── Match.js                # Match model
│   │   ├── Team.js                 # Team model
│   │   └── OddsCache.js            # Odds caching model (TTL indexes)
│   │
│   ├── routes/                     # API Route Handlers
│   │   ├── auth.js                 # Authentication routes
│   │   ├── betting.js              # Betting Odds & Probability calculations
│   │   └── [other routes]
│   │
│   ├── utils/                      # Utility Functions
│   │   └── cacheManager.js         # MongoDB cache management utilities
│   │
│   └── middleware/                 # Express Middleware
│       └── auth.js                 # JWT authentication middleware
│
├── world-cup-sim/                  # React Frontend Application
│   ├── src/
│   │   ├── api/                    # API Configuration
│   │   │   └── api.js              # Axios instance with interceptors
│   │   │
│   │   ├── pages/                  # Page Components
│   │   │   ├── PredictorPage.jsx   # Main prediction interface
│   │   │   ├── SimulatorPage.jsx   # Tournament simulation
│   │   │   ├── BettingOddsPage.jsx # Odds and probabilities
│   │   │   ├── FixturesPage.jsx    # Match schedule viewer
│   │   │   ├── DrawSimulatorPage.jsx # Group draw simulator
│   │   │   └── DrawResultPage.jsx  # Draw results display
│   │   │
│   │   ├── data/                   # Data Files
│   │   │   └── matchSchedule.js    # Official match schedule
│   │   │
│   │   ├── utils/                  # Utility Functions
│   │   │   ├── knockoutAlgorithm.js # FIFA-compliant bracket algorithm
│   │   │   └── matchupLookupTable.js # 495 combination lookup table
│   │   │
│   │   ├── App.jsx                 # Main app component (routing)
│   │   └── main.jsx                # Application entry point
│   │
│   ├── package.json                # Frontend dependencies
│   └── vite.config.js              # Vite build configuration
│
├── possibilities.csv                # FIFA third-place possibilities data
├── matchSchedule.csv                # Official match schedule data
└── README.md                       # This file
```

## Setup Instructions

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd world-cup-sim
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
```

4. Start the development server:
```bash
npm start
```

The backend will be available at `http://localhost:5001`.

### Build for Production

**Frontend:**
```bash
cd world-cup-sim
npm run build
```

**Backend:**
The backend runs directly with Node.js - no build step required.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Betting Odds
- `GET /api/odds?team1=...&team2=...&type=...` - Get betting odds for a matchup
- `GET /api/group-winner?teams=...` - Get group winner probabilities
- `POST /api/clear-cache` - Clear probability cache

### Bracket Analysis
- `POST /api/bracket` - AI-powered bracket analysis (Gemini integration)

## Technologies Used

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with glassmorphism effects

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication tokens
- **Gemini AI** - Bracket analysis

### Algorithms & Data
- **FIFA Official Algorithm** - Knockout bracket generation
- **Monte Carlo Simulation** - Probability calculations
- **FIFA Rankings** - Team strength data

## Key Algorithms

### Knockout Bracket Generation
The application implements the official FIFA algorithm for generating Round of 32 matchups. With 12 groups, 8 third-place teams advance, creating 495 possible combinations. Each combination results in different matchups according to FIFA's official rules, implemented via a comprehensive lookup table.

### Probability Calculations
Betting odds are calculated using:
- FIFA rankings as base team strength
- Optimized Monte Carlo simulation with adaptive iteration counts:
  - Base: 3,000 iterations (reduced from 10,000)
  - Close matchups (< 100 FIFA points difference): 5,000 iterations
  - Early convergence detection (stops when probabilities stabilize)
- MongoDB persistent caching (7-day TTL) for instant cache hits
- Deterministic seeded random generation for consistency
- **Performance**: 60-70% faster than previous implementation while maintaining <2% accuracy difference

## Screenshots

![Group Stages](https://github.com/cfederoff/cs390teamproject2025/blob/main/GroupStagesScreenshot.png)

![Simulation](https://github.com/cfederoff/cs390teamproject2025/blob/main/SimulationScreenShot.png)

![Betting Odds](https://github.com/cfederoff/cs390teamproject2025/blob/main/BettingOddsScreenshot.png)

## Development Notes

- The knockout bracket algorithm uses a lookup table generated from `possibilities.csv`
- Match schedule data is stored in `matchSchedule.js` and `matchSchedule.csv`
- FIFA rankings are hardcoded in `backend/routes/betting.js` (as of November 2025)
- Predictions are automatically saved to `localStorage`
- API base URL can be configured via `VITE_API_BASE_URL` environment variable

## Deployment

For detailed deployment instructions, see:
- **Backend Deployment (Railway - Recommended)**: [RAILWAY_MIGRATION.md](./RAILWAY_MIGRATION.md) for step-by-step Railway migration and deployment guide
- **Backend Deployment (Render - Legacy)**: [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for Render deployment guide
- **Frontend Deployment**: The frontend is configured for Vercel deployment (see `vercel.json`)

### Performance Optimizations

The backend has been optimized for faster response times:

1. **MongoDB Persistent Caching**: Computed odds are cached in MongoDB with 7-day TTL, providing <50ms response times for cached requests
2. **Adaptive Simulation Iterations**: Reduced from 10,000 to 3,000-5,000 iterations based on matchup closeness, with early convergence detection
3. **Railway Hosting**: Migrated from Render to Railway for faster cold starts (2-5s vs 30-60s)

### Quick Links
- **Live Frontend**: [https://world-cup-sim.vercel.app/](https://world-cup-sim.vercel.app/)
- **Live Backend API (Railway)**: [https://world-cup-sim-backend.up.railway.app](https://world-cup-sim-backend.up.railway.app)
- **Live Backend API (Render - Legacy)**: [https://wcs-u1fy.onrender.com](https://wcs-u1fy.onrender.com)

## License

This project is part of a CS390 team project.

## Contributing

This is a team project for educational purposes. For questions or issues, please contact the development team.
