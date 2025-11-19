# World Cup Draw Simulator

A React-based frontend application for simulating and managing World Cup tournament draws, similar to [2026 World Cup Sim](https://www.2026worldcupsim.com/).

## Project Structure

```
CS390_TeamProject/
├── template.html          # HTML template/reference design
├── world-cup-sim/         # React frontend application
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js              # Axios configuration with JWT handling
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx  # Route protection component
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx       # User login page
│   │   │   ├── RegisterPage.jsx    # User registration page
│   │   │   ├── DashboardPage.jsx   # Main dashboard with past draws
│   │   │   ├── DrawSimulatorPage.jsx  # Draw simulation interface
│   │   │   ├── DrawResultPage.jsx  # Display draw results
│   │   │   └── *.css              # Page-specific styles
│   │   ├── App.jsx                 # Main app component with routing
│   │   └── main.jsx               # Application entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Frontend Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the React app directory:
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

The application will be available at `http://localhost:5173` (default Vite port).

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Features

### Authentication
- User registration with email validation
- User login with JWT token storage
- Protected routes requiring authentication
- Automatic token refresh and 401 error handling

### Dashboard
- View all past draws
- Create new draws
- Delete existing draws
- Navigate to draw results

### Draw Simulator
- Simulate World Cup group stage draws
- Random team assignment to 8 groups (A-H)
- Save draws with custom names
- Support for 32 qualified teams

### Draw Results
- Display groups with assigned teams
- View draw creation date and metadata
- Clean, organized group visualization

## API Integration

The frontend is configured to communicate with a backend API at `http://localhost:5000/api`.

### API Endpoints Used

- **Authentication**
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login

- **Draws**
  - `GET /api/draws` - Fetch user's past draws
  - `POST /api/draws/simulate` - Simulate a new draw
  - `GET /api/draws/:drawId` - Fetch specific draw details
  - `DELETE /api/draws/:drawId` - Delete a draw

### API Configuration

The API client is configured in `src/api/api.js`:
- Base URL: `http://localhost:5000/api`
- JWT token automatically attached to requests via interceptors
- Automatic redirect to login on 401 errors
- Token stored in `localStorage` for persistence

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Styling with glassmorphism effects

## State Management

- `useState` hooks for component-level state
- `useEffect` hooks for side effects and data fetching
- `localStorage` for JWT token persistence
- React Router for navigation state

## Protected Routes

Routes requiring authentication:
- `/dashboard`
- `/draw-simulator`
- `/draw-result/:drawId`

Unauthenticated users are automatically redirected to `/login`.

## Styling

The application uses a modern design inspired by the template:
- Gradient backgrounds (`#0a1a2a` to `#003b5c`)
- Glassmorphism effects with backdrop blur
- Smooth transitions and hover effects
- Responsive grid layouts
- Consistent color scheme with accent colors (`#00c6ff`, `#0072ff`)

## Development Notes

- The `template.html` file in the root directory serves as a design reference
- Qualified teams are defined in `DrawSimulatorPage.jsx` and can be easily updated
- API base URL can be changed in `src/api/api.js`
- All protected routes check for JWT token in `localStorage`

## Next Steps

1. Backend API development at `http://localhost:5000`
2. Ensure backend endpoints match the expected format
3. Test authentication flow
4. Implement additional features (bracket predictions, statistics, etc.)
