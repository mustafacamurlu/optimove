import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Load JSON data from dp.json
const data = new SharedArray('IoT data', function() {
  return JSON.parse(open('./dps.json'));
});

export let options = {
  vus: 3, // Maximum of 100 concurrent users
  duration: '30s', // Total duration of the test is 10 seconds
};

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfWTFNbG5SS05Qa1ppV0ZvVzlDSHhvSGx1T294c0YxY0s0ajl6X05QdVJjIn0.eyJleHAiOjE3MzE1ODk3NjIsImlhdCI6MTczMTU4OTQ2MiwianRpIjoiMzY4ZDhmMWUtZDkyNy00MDUzLTk4YmEtZWMzNTRmMTY3ODk5IiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguNTYuMTE2OjgwODAvcmVhbG1zL29wdGltb3ZlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjdkOGM1YWRiLTcwNGEtNDRmZi1hNGQwLWM0N2Q3ZmExMjhjMyIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wdGltb3ZlLWFwcCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtb3B0aW1vdmUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNsaWVudEhvc3QiOiIxMC4yNDQuMC4xIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LW9wdGltb3ZlLWFwcCIsImNsaWVudEFkZHJlc3MiOiIxMC4yNDQuMC4xIiwiY2xpZW50X2lkIjoib3B0aW1vdmUtYXBwIn0.d9Fj6uGLy-CiF7kR4RRU5no4hgoaz1aJh_o-P0VzGFD7HDWhSc2qdnsoq_RnwwTXiFkDSO4FomoEbzYaACRJVJpOdYnCU9goc1KjfPXG4RZEBJp-45Is8P3Z3CMK2qgLKTeGMN45sK6H-Rpu6jFkp58U556p8rOscLgWxlMpBdkUgvYEcuNTHWoxBiMGDa6x8P88YIUJZFynKUAueWsbU8GVwPaZp-XqCn_wjVfOGaDDFeF-n3c39q8Qu7-8e3UlmvpU0Zte3lc1Kz9dzzzxEnm1d0Dc4PpFMYv-p-qEPO3_CZJbb9HdlgRHURSWHSAnC05lwZoUxRv-WAc7E76xcw';

let failedRequests = 0;

export default function () {
  // Get the data points from dp.json
  const payload = JSON.stringify(data);

  const deviceId = 'df1a0630-ae86-4f3e-8d42-1094d88b4e98';
  const url = `http://192.168.56.116:8081/api/devicemanagement/devices/${deviceId}/timeseries`;

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Adding Bearer token to the request headers
    },
  };

  const res = http.post(url, payload, params);
  const checkResult = check(res, {
    'is status 201': (r) => r.status === 201,
    'is status 400': (r) => r.status === 400,
    'is status 401': (r) => r.status === 401,
    'is status 429': (r) => r.status === 429,
    'is status 500': (r) => r.status === 500,
    'is status 502': (r) => r.status === 502,
    'is status 503': (r) => r.status === 503,

  });


  sleep(0.1);  // Short sleep to avoid sending too fast from each VU
}
