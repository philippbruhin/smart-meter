import { db } from './db';
import { CONFIG } from './config';
import fetch from 'node-fetch';

interface MeterData {
  age: number;
  positive_active_energy_total: number;
  voltage_l1: number;
  voltage_l2: number;
  voltage_l3: number;
}

export async function fetchAndStore() {
  console.log('Fetching meter data...');
  const res = await fetch(CONFIG.meterApiUrl);
  const data = await res.json() as MeterData;

  const currentUnix = Math.floor(Date.now() / 1000);
  const correctedTimestamp = currentUnix - data.age;

  const stmt = db.prepare(`
    INSERT INTO meter_data (timestamp, positive_active_energy_total, voltage_l1, voltage_l2, voltage_l3)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(
    correctedTimestamp,
    data.positive_active_energy_total,
    data.voltage_l1,
    data.voltage_l2,
    data.voltage_l3
  );

  console.log('Stored data at corrected timestamp:', correctedTimestamp);
}
