import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Load JSON data from timeseriesDataPayload.json
const fullData = JSON.parse(open('./timeseriesDataPayload.json'));
const data = new SharedArray('IoT data', function () {
  return fullData.values;  // Use only the 'values' array as SharedArray
});

export let options = {
  vus: 20, // Maximum of 100 concurrent users
  duration: '60s', // Total duration of the test is 30 seconds
};

const token = '';

export default function () {
  // Iterate over each data point to create individual payloads
  data.forEach(dataPoint => {
    const payload = JSON.stringify({
      deviceId: fullData.deviceId,
      values: [dataPoint],
    });

    const url = `http://192.168.56.116:8081/api/timeseries`;

    const params = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Adding Bearer token to the request headers
      },
    };

    const res = http.post(url, payload, params);
    check(res, {
      'is status 201': (r) => r.status === 201,
      'is status 400': (r) => r.status === 400,
      'is status 401': (r) => r.status === 401,
      'is status 429': (r) => r.status === 429,
      'is status 500': (r) => r.status === 500,
      'is status 502': (r) => r.status === 502,
      'is status 503': (r) => r.status === 503,
    });

    sleep(0.1); // Short sleep to avoid sending too fast from each VU
  });
}
