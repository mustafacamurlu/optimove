import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Load JSON data from timeseriesDataPayload.json
const fullData = JSON.parse(open('./timeseriesDataPayload.json'));
const data = new SharedArray('IoT data', function () {
  return fullData.values;  // Use only the 'values' array as SharedArray
});

export let options = {
  vus: 5, // Maximum of 100 concurrent users
  duration: '10s', // Total duration of the test is 30 seconds
};

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfWTFNbG5SS05Qa1ppV0ZvVzlDSHhvSGx1T294c0YxY0s0ajl6X05QdVJjIn0.eyJleHAiOjE3MzE1OTk0OTksImlhdCI6MTczMTU5OTE5OSwianRpIjoiNTUwNGVjZjQtN2FkMS00ZWQxLTg0MTAtNmUzNGFlMTZiNTk0IiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguNTYuMTE2OjgwODAvcmVhbG1zL29wdGltb3ZlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjdkOGM1YWRiLTcwNGEtNDRmZi1hNGQwLWM0N2Q3ZmExMjhjMyIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wdGltb3ZlLWFwcCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtb3B0aW1vdmUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNsaWVudEhvc3QiOiIxMC4yNDQuMC4xIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LW9wdGltb3ZlLWFwcCIsImNsaWVudEFkZHJlc3MiOiIxMC4yNDQuMC4xIiwiY2xpZW50X2lkIjoib3B0aW1vdmUtYXBwIn0.Yo9ervoU-NiTbJSuytyOGWIiudOktD3D6gLcmI57QCuv_1X5ihGeNTkTE7W81yL_RPkRfm7wAfdaajMfXgKnWhO4Xpm-K-5qzuCdFakRbjhHrHeahjYSsVmHqn96A3tr2GjM8ESwBf6fJuJpckCNxMeRFOI7A7R47Y6ldgYLoJVwgMUtK7ZVR-wM9kpTQRwUl53H_W2y4ZFZmfve4W2f4EwdJ4VKswzvevqTF6VzeAoTQ500j_idFrosDHJT5pvEBax7v-UCNwO5UvXII3EVmrWuGFT0XrjSSBa9elm0eHV9R2GyGUiY_yAD4a9pSQ0i7pIctZl66v4V2hmWj15KiA';

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
