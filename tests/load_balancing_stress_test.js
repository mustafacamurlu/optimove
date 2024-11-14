import http from 'k6/http';
import { check } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 100 },  // Ramp-up to 100 users over 10 seconds
        { duration: '10s', target: 300 },  // Ramp-up to 300 users over 10 seconds
        { duration: '10s', target: 0 },    // Ramp-down to 0 users over 10 seconds
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'],  // 95% of requests should complete below 500ms
    },
};

const url = 'http://192.168.56.116:8081/devicemanagement/devices';
const params = {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkUU9WQkk1TnVlV183LUxTN3VpWXVDVElILVNjeGM2S2tjUjlqQWdMeUdFIn0.eyJleHAiOjE3MzA5Mjg4NzgsImlhdCI6MTczMDkyODU3OCwianRpIjoiNDkyNzhjZGUtNTlhZi00ZDA1LWI1NGYtNzlhYjgxOWQ4ZGYyIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguNTYuMTE2OjgwODAvcmVhbG1zL29wdGltb3ZlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU0MmExODc4LWNjMjMtNGJiOS05YmNjLTMxZDU4OWE4N2Y1OCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wdGltb3ZlLWFwcCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtb3B0aW1vdmUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTAuMjQ0LjAuMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LW9wdGltb3ZlLWFwcCIsImNsaWVudEFkZHJlc3MiOiIxMC4yNDQuMC4xIiwiY2xpZW50X2lkIjoib3B0aW1vdmUtYXBwIn0.z74BuduFAPl060tzYdh5KfT4YlKcWNhViMuV_aBAIXp_m1tYT03Wzc6WVTYYLZ-GCGC5kC3KBW8hLx76UQtUY0ow0-KJmtnPs6fQXv8iIIzVcyyhLMRS8luIZ6sD_qTXb6nJ1h4ssEEE7BWV9zoJ6FI2CTOZ8LM2byCo_ffk70pSvTHPyrZKjfh-NjLurtKreK86yUJ2Wrtmz991IiEvCkgo-7y-KwbEEKsU6djfkalAn6pTsn6ZcI7IxtAFfQk5tu2_H943UDYLKkhAIX5aCFDXi4wDyxkcA7N-SpUO4wjk7niDjTj1WUGp_v12zdyhXguQCfjWhqGBI7z-zJgFrA'
    },
};

export default function () {
    let res = http.get(url, params);
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}
