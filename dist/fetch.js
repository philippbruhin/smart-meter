"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndStore = fetchAndStore;
const db_1 = require("./db");
const config_1 = require("./config");
const node_fetch_1 = __importDefault(require("node-fetch"));
async function fetchAndStore() {
    console.log('Fetching meter data...');
    const res = await (0, node_fetch_1.default)(config_1.CONFIG.meterApiUrl);
    const data = await res.json();
    const currentUnix = Math.floor(Date.now() / 1000);
    const correctedTimestamp = currentUnix - data.age;
    const stmt = db_1.db.prepare(`
    INSERT INTO meter_data (timestamp, positive_active_energy_total, voltage_l1, voltage_l2, voltage_l3)
    VALUES (?, ?, ?, ?, ?)
  `);
    stmt.run(correctedTimestamp, data.positive_active_energy_total, data.voltage_l1, data.voltage_l2, data.voltage_l3);
    console.log('Stored data at corrected timestamp:', correctedTimestamp);
}
