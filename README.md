# Meter Data Viewer

This project reads meter data from a **Nuoreader** by **Nuotec GmbH** (based in Nuolen, Switzerland) via a simple Node.js backend, stores it into a local SQLite database, and displays the last 7 days and monthly totals in a small web frontend.

## Requirements

- **Node.js** version **v18.19.0** (installed via APT package manager on Raspberry Pi OS)
- **npm** (comes with Node.js)
- **sqlite3** (installed via npm)
- **cron** (standard on Raspberry Pi OS)

## Installation

1. **Clone the repository** or copy the project files to your Raspberry Pi.

2. **Install Node.js packages:**

```bash
npm install
```

3. Set up the SQLite database:

This project automatically creates the database and necessary tables if they do not exist when starting the server.

4. Edit Configuration:

Adjust the config.js file if needed:

```javascript
module.exports = {
  meterApiUrl: 'http://192.168.1.121/meter.json',
  databasePath: './meterdata.db',
  serverPort: 3000
};
```

5. Run the development server:

```bash
npm run dev
```

It will start the server at http://localhost:3000.

6. Set up cronjob for production use:

Open crontab:

```bash
crontab -e
```

Add the following lines to fetch the meter data exactly at every 00, 15, 30, and 45 minutes past the hour:

```cron
0,15,30,45 * * * * /usr/bin/node /path/to/your/project/fetch.js
```

Replace /path/to/your/project/fetch.js with the actual path to your fetch.js script

7. Start the server in production mode:

You can simply run:

```bash
npm start
```

(Or use a tool like pm2 to run it permanently in the background.)

## Project Structure

```bash
/meter-data-viewer
├── server.js        # Express server to serve API and frontend
├── fetch.js         # Script to fetch and store data from the meter
├── config.js        # Configuration variables
├── meterdata.db     # SQLite database (created automatically)
├── public/
│   └── index.html   # Frontend
├── package.json     # Project metadata and scripts
└── README.md        # This file
```

## Development Notes

- During development, you can run npm run dev which starts the server and lets you test fetching manually by running:

  ```bash
  node fetch.js
  ```

- The time alignment is done in cron, so fetches happen precisely at the 0, 15, 30, and 45-minute marks.

- The timestamp correction uses the Raspberry Pi system time minus the `age` field from the meter data.