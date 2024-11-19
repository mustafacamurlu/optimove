import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 1000, // Maximum of 100 concurrent users
  duration: '60s', // Total duration of the test is 60 seconds
  noConnectionReuse: true,
};

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2LU56Wll5OXItc1hrS1FmZ2g0VndYa3ZzUHJicE4zMlE2QUtJeGduZE04In0.eyJleHAiOjE3MzIwMTYxNzEsImlhdCI6MTczMjAxNTg3MSwianRpIjoiMzBhNmVkZmYtOWEzYi00ZWU3LWJkODYtNThlNTc0ODQ1MTVlIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguNTYuMTE2OjgwODAvcmVhbG1zL29wdGltb3ZlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijg3NDJmZjU2LTE5YzktNDNhMi1hY2Q1LTZiYmE3YThjOTEwNiIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wdGltb3ZlLWFwcCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtb3B0aW1vdmUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTAuMjQ0LjAuMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LW9wdGltb3ZlLWFwcCIsImNsaWVudEFkZHJlc3MiOiIxMC4yNDQuMC4xIiwiY2xpZW50X2lkIjoib3B0aW1vdmUtYXBwIn0.ulaHvPvQAZ2YXDcaOyICRe6WKBx80_cgSiAOhr2H_fYKrdYRf4gwjDAcajp2PlH6TYKlNjhIcQ9XiZrmFYRwnGCB_-IxaNsiqnIz4S7_Y_BEOOFu5yoh6bVJ_qQVpKen_hPIf3aUNlfs4R0GpX-g5A1YgZkCPhAu5xflaK9DOP-THiK0utR-cE-8zoi-rAy7vtPZTxNM_FkKfmCyo1bk5ACgJEW-YRQ3xeGIUcXQb2IPbhdBPf919Zhngx0k_umLb25-cY2TX6Znb3yn_24X0NHJxzrbpnOL8YPZ8PjajR3oOggckM_vxYTRNKc1lNH0iJpIgIfTt6tpbuTD5dADQQ'; // Your token here

export default function () {
  // Define the URL for the GET request
  const getUrl = `http://192.168.56.116:8081/api/timeseries/sleep`;

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

  sleep(0.1); // Short sleep to avoid overwhelming the server
}
