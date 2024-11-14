import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

export let options = {
    vus: 200,                // Number of virtual users
    duration: '5s',        // Test duration
};

const url = 'http://192.168.56.116:8081/api/devicemanagement/test';
const params = {
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJfWTFNbG5SS05Qa1ppV0ZvVzlDSHhvSGx1T294c0YxY0s0ajl6X05QdVJjIn0.eyJleHAiOjE3MzEzNTA1NDksImlhdCI6MTczMTM1MDI0OSwianRpIjoiZDVhMjI4NjEtYzU2Yy00ZDhjLWEwMTUtNDFlYzZmMjhkODhiIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguNTYuMTE2OjgwODAvcmVhbG1zL29wdGltb3ZlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjdkOGM1YWRiLTcwNGEtNDRmZi1hNGQwLWM0N2Q3ZmExMjhjMyIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wdGltb3ZlLWFwcCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtb3B0aW1vdmUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNsaWVudEhvc3QiOiIxMC4yNDQuMC4xIiwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LW9wdGltb3ZlLWFwcCIsImNsaWVudEFkZHJlc3MiOiIxMC4yNDQuMC4xIiwiY2xpZW50X2lkIjoib3B0aW1vdmUtYXBwIn0.jBNViF10dgBky0a3QEFdx3JczeF9Ub36mDzi3z4EtXlwljMsD-KepheAsRZBLd1BqGKVLAnW3EepzszorFOBS4FAuaFEYGy2Ur9tsTbCEV5JTOQ_lm3PA7ZqWitcRzIz-zQAf84Wz14gUIV6H-mB5fg5T7Ul-kw2eOyIXKii7Lrht4EzB7pDS62MA47uuxCVBx1JFlKZ9ao5qW9lRhOuoe0BZeLys41sbcphMGyTepwROdOlkZSiCXVJ44hGgCbDjY7hBlxUwRCThDzdi6Dr1_oyprIbBkmW1s82mtdWdU0htFZO5IK_oVmtLUIAJVJPsbWz-3edH4FqW2Xc1AmjUQ'
    },
};

const httpSuccessCounter = new Counter('http_2xx_responses');
const httpClientErrorCounter = new Counter('http_4xx_responses');
const httpServerErrorCounter = new Counter('http_5xx_responses');

export default function () {
    let res = http.get(url, params);

    // Check HTTP status codes and count them
    if (res.status >= 200 && res.status < 300) {
        httpSuccessCounter.add(1);
    } else if (res.status >= 400 && res.status < 500) {
        httpClientErrorCounter.add(1);
    } else if (res.status >= 500) {
        httpServerErrorCounter.add(1);
    }

    // Verify the response is successful for visibility
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}
