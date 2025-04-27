import Database from "better-sqlite3";
import { CONFIG } from "./config";

export const db = new Database(CONFIG.databasePath);

db.exec(`
CREATE TABLE IF NOT EXISTS meter_data (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp INTEGER,
  positive_active_energy_total REAL,
  voltage_l1 REAL,
  voltage_l2 REAL,
  voltage_l3 REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);