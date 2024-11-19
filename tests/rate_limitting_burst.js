import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2s', target: 50 }, // Burst traffic: Ramp up to 50 virtual users in 2 seconds
    { duration: '8s', target: 1 }, // Gradually reduce to 1 user over the next 8 seconds
  ],
  noConnectionReuse: true,
};

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2LU56Wll5OXItc1hrS1FmZ2g0VndYa3ZzUHJicE4zMlE2QUtJeGduZE04In0.eyJleHAiOjE3MzIwMjY2MDQsImlhdCI6MTczMjAyNjMwNCwianRpIjoiMWM4NjdiNzktMjZiNC00NTA4LWE5NGItZTRjMTQzYmQwNTU0IiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguNTYuMTE2OjgwODAvcmVhbG1zL29wdGltb3ZlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijg3NDJmZjU2LTE5YzktNDNhMi1hY2Q1LTZiYmE3YThjOTEwNiIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wdGltb3ZlLWFwcCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtb3B0aW1vdmUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTAuMjQ0LjAuMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LW9wdGltb3ZlLWFwcCIsImNsaWVudEFkZHJlc3MiOiIxMC4yNDQuMC4xIiwiY2xpZW50X2lkIjoib3B0aW1vdmUtYXBwIn0.Fw0CLKzTit9yQKATSxKZ_7iMNLosojeZcfvAxly0Rjz7eVZm_eSVXd6l7h3MBDr2dsz_Gtj2rc-nWMur0KVDVff6vjHNUmbDuXSKMz5YzWqza0Qmxa2iNRJVJRff7B0x8M9bAKc4fREzQuTdyT6JGVRWYs22UXgYJfLhbczLwVoi9DoqALHTDNIKCa7pNkbxfXv34K4-wiN9TY1QWhlWO-6sLgdIs6p8TrLTI1eLT5-g_bGrTs_RZ11un2n-0pUQOD658h236Ypr6OjVv-Kb8XdLOcKQ13w_Pif6dyor5gxE7D_TWQlm22QjqMyDYtA_iS-lyvpWMZNc7WR3-WfrPw';

export default function () {
  // Define the URL for the GET request
  const getUrl = `http://192.168.56.116:8081/api/devicemanagement/test`;

  const getParams = {
    headers: {
      'Authorization': `Bearer ${token}`, // Adding Bearer token to the request headers
    },
  };

  // Send the GET request
  const getRes = http.get(getUrl, getParams);
  check(getRes, {
    'is status 200': (r) => r.status === 200,
    'is status 401': (r) => r.status === 401,
    'is status 429': (r) => r.status === 429,
    'is status 500': (r) => r.status === 500,
    'is status 502': (r) => r.status === 502,
    'is status 503': (r) => r.status === 503,
  });

  sleep(0.5); // Short sleep to avoid overwhelming the server after the burst
}
