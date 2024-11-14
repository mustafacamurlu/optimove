// Script to generate a larger dp.json file with desired timestamps
const fs = require('fs');

// Function to generate a sequence of timestamps
function generateTimestamps(start, count, intervalMillis) {
  const timestamps = [];
  let currentDate = new Date(start);

  for (let i = 0; i < count; i++) {
    timestamps.push(currentDate.toISOString());
    currentDate = new Date(currentDate.getTime() + intervalMillis); // Increment the timestamp by the interval in milliseconds
  }

  return timestamps;
}

// Function to generate data points with desired timestamps
function generateDataPoints(count, startTimestamp, intervalMillis) {
  const timestamps = generateTimestamps(startTimestamp, count, intervalMillis);
  const dataPoints = timestamps.map(ts => ({
    temperature: (28 + Math.random() * 10).toFixed(1), // Random temperature between 28 and 38
    humidity: Math.floor(40 + Math.random() * 20),     // Random humidity between 40 and 60
    ts,
  }));
  return dataPoints;
}

// Configuration
const numberOfPoints = 1000; // Number of data points to generate
const startTimestamp = '2024-11-13T14:15:00Z'; // Starting timestamp
const intervalMillis = 500; // Interval between timestamps in milliseconds

// Generate data points and write to dps.json
const dataPoints = generateDataPoints(numberOfPoints, startTimestamp, intervalMillis);

fs.writeFileSync('dps.json', JSON.stringify(dataPoints, null, 2));

console.log(`${numberOfPoints} data points written to dps.json`);
