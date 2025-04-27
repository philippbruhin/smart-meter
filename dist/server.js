"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.get('/api/data/last7days', (req, res) => {
    const oneWeekAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
    const rows = db_1.db.prepare(`
    SELECT * FROM meter_data
    WHERE timestamp >= ?
    ORDER BY timestamp ASC
  `).all(oneWeekAgo);
    res.json(rows);
});
app.get('/api/data/monthly', (req, res) => {
    const rows = db_1.db.prepare(`
    SELECT strftime('%Y-%m', datetime(timestamp, 'unixepoch')) as month,
           MAX(positive_active_energy_total) - MIN(positive_active_energy_total) AS energy_consumed
    FROM meter_data
    GROUP BY month
    ORDER BY month ASC
  `).all();
    res.json(rows);
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.listen(config_1.CONFIG.serverPort, () => {
    console.log(`Server running on http://localhost:${config_1.CONFIG.serverPort}`);
});
