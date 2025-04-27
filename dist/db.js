"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const config_1 = require("./config");
exports.db = new better_sqlite3_1.default(config_1.CONFIG.databasePath);
exports.db.exec(`
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
