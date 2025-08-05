/*
 * Voorbeeld Spotify Stream Tracker
 * Backend in Node.js + Express
 * Gebruikt de Spotify for Artists API (OAuth)
 * Zet je eigen CLIENT_ID, CLIENT_SECRET en REFRESH_TOKEN in .env
 */

import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import cron from 'node-cron';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

dotenv.config();

const app = express();
app.use(express.json());

// Initialiseer SQLite DB
let db;
(async () => {
  db = await open({ filename: './streams.db', driver: sqlite3.Database });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS artist_streams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      artist_id TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      total_streams INTEGER
    )
  `);
})();

// Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});
spotifyApi.setRefreshToken(process.env.REFRESH_TOKEN);

// Helper: vernieuw access token
async function refreshAccessToken() {
  const data = await spotifyApi.refreshAccessToken();
  spotifyApi.setAccessToken(data.body['access_token']);
}

// Haal streams uit voor een artiest via Spotify for Artists endpoint
async function fetchArtistStreams(artistId) {
  await refreshAccessToken();
  // Let op: dit endpoint is private voor 'Spotify for Artists'
  const res = await spotifyApi.getArtistStreams({ artist_id: artistId });
  // Stel dat res.body.total_streams bestaat:
  return res.body.total_streams;
}

// Periodieke taak: elke 6 uur streams opslaan
cron.schedule('0 */6 * * *', async () => {
  const artistIds = (process.env.ARTISTS || '').split(',');
  for (const id of artistIds) {
    try {
      const streams = await fetchArtistStreams(id);
      await db.run(
        'INSERT INTO artist_streams (artist_id, total_streams) VALUES (?,?)',
        id,
        streams
      );
      console.log(`Saved streams for ${id}: ${streams}`);
    } catch (err) {
      console.error(`Error fetching streams for ${id}:`, err.message);
    }
  }
});

// Endpoint om data op te halen voor website
app.get('/api/streams/:artistId', async (req, res) => {
  const { artistId } = req.params;
  const rows = await db.all(
    'SELECT timestamp, total_streams FROM artist_streams WHERE artist_id = ? ORDER BY timestamp ASC',
    artistId
  );
  res.json(rows);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server draait op http://localhost:${PORT}`));
