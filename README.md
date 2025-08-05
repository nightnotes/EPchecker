# Spotify Stream Tracker

## Backend
- `cd backend`
- `npm install`
- Kopieer `.env.example` naar `.env` en vul je keys in.
- `npm start`

## Frontend
- `cd frontend`
- `npm install`
- Voeg in `.env` toe:
  ```
  REACT_APP_API_BASE_URL=https://jouw-backend-url.com
  REACT_APP_ARTISTS=7sWJR3GtdK9Jr09w5Nh16B,...
  ```
- Importeer `StreamDashboard` in je router en voeg een route `/streams` toe.

## Structuur
- `backend/`: Node.js server
- `frontend/src/components/StreamDashboard.jsx`: React component met Chart.js
