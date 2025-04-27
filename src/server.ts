import express from 'express';
import { db } from './db';
import { CONFIG } from './config';
import path from 'path';

const app = express();

app.get('/api/data/last7days', (req, res) => {
  const oneWeekAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
  const rows = db.prepare(`
    SELECT * FROM meter_data
    WHERE timestamp >= ?
    ORDER BY timestamp ASC
  `).all(oneWeekAgo);
  res.json(rows);
});

app.get('/api/data/monthly', (req, res) => {
  const rows = db.prepare(`
    SELECT strftime('%Y-%m', datetime(timestamp, 'unixepoch')) as month,
           MAX(positive_active_energy_total) - MIN(positive_active_energy_total) AS energy_consumed
    FROM meter_data
    GROUP BY month
    ORDER BY month ASC
  `).all();
  res.json(rows);
});

app.use(express.static(path.join(__dirname, '../public')));

app.listen(CONFIG.serverPort, () => {
  console.log(`Server running on http://localhost:${CONFIG.serverPort}`);
});
