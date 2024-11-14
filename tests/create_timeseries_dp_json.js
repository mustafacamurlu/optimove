// Script to generate test data for TimeseriesDataPayload JSON model
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

// Function to generate sensor data points with desired timestamps
function generateSensorDataPoints(count, startTimestamp, intervalMillis) {
  const timestamps = generateTimestamps(startTimestamp, count, intervalMillis);
  const dataPoints = timestamps.map(ts => ({
    temperature: parseFloat((28 + Math.random() * 10).toFixed(1)), // Random temperature between 28 and 38
    humidity: Math.floor(40 + Math.random() * 20),                // Random humidity between 40 and 60
    ts
  }));
  return dataPoints;
}

// Function to generate the TimeseriesDataPayload
function generateTimeseriesDataPayload(deviceId, count, startTimestamp, intervalMillis) {
  return {
    deviceId,
    values: generateSensorDataPoints(count, startTimestamp, intervalMillis),
  };
}

// Configuration
const deviceId = 'df1a0630-ae86-4f3e-8d42-1094d88b4e98'; // Device ID for the payload
const numberOfPoints = 1000;  // Number of sensor data points to generate
const startTimestamp = '2024-11-13T14:15:00Z'; // Starting timestamp
const intervalMillis = 500;   // Interval between timestamps in milliseconds

// Generate TimeseriesDataPayload and write to timeseriesDataPayload.json
const timeseriesDataPayload = generateTimeseriesDataPayload(deviceId, numberOfPoints, startTimestamp, intervalMillis);

fs.writeFileSync('timeseriesDataPayload.json', JSON.stringify(timeseriesDataPayload, null, 2));

console.log(`Timeseries data payload with ${numberOfPoints} data points written to timeseriesDataPayload.json`);
