#!/bin/bash

call_endpoint() {
  url=$1
  duration=$2
  token=$3
  start_time=$(date +%s)
  while [ $(($(date +%s) - start_time)) -lt $duration ]; do
    response=$(curl -s -H "Authorization: Bearer $token" "$url")
    http_code=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $token" "$url")
    if [ $? -eq 0 ]; then
      echo "Response from $url: HTTP $http_code, Body: $response"
    else
      echo "Error calling $url"
    fi
    sleep 1
  done
}

blue_green_test() {
  url=$1
  duration=$2
  token=$3
  start_time=$(date +%s)
  while [ $(($(date +%s) - start_time)) -lt $duration ]; do
    response=$(curl -s -H "Authorization: Bearer $token" "$url")
    http_code=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $token" "$url")
    if [ $? -eq 0 ]; then
      echo "Response from $url: HTTP $http_code, Body: $response"
    else
      echo "Error calling $url"
    fi
    sleep 1
  done
}

service_url="http://192.168.56.116:8081/api/devicemanagement/devices/9b75d2ab-643e-4901-9a5c-75d0b8ceda40"
bearer_token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2LU56Wll5OXItc1hrS1FmZ2g0VndYa3ZzUHJicE4zMlE2QUtJeGduZE04In0.eyJleHAiOjE3MzIwMjc4OTEsImlhdCI6MTczMjAyNzU5MSwianRpIjoiYThhOTI4MGEtYzY2OS00ODkxLWJiNGMtMTBkNmM2N2FjODQzIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguNTYuMTE2OjgwODAvcmVhbG1zL29wdGltb3ZlIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijg3NDJmZjU2LTE5YzktNDNhMi1hY2Q1LTZiYmE3YThjOTEwNiIsInR5cCI6IkJlYXJlciIsImF6cCI6Im9wdGltb3ZlLWFwcCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtb3B0aW1vdmUiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJjbGllbnRIb3N0IjoiMTAuMjQ0LjAuMSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2VydmljZS1hY2NvdW50LW9wdGltb3ZlLWFwcCIsImNsaWVudEFkZHJlc3MiOiIxMC4yNDQuMC4xIiwiY2xpZW50X2lkIjoib3B0aW1vdmUtYXBwIn0.M5vpyZZS1quqR_fOW69FCyDX4sEZCjnw9GIk0RKTwxi9iOl-HaQ0X0LDtOFqr4AxHllBys1Xqy7xGgruogJYS0ISGctTlAdIuHU6ZyVL7Q9G7ALwGIj0Yo8IIYGnY9uBZKGXk38vH3qLoh6ZAKkmDNc4jJ_6Q5zqUMtWv8kSume7NzIRZNeEkaWaxqnqGPjzPmanYUBF_XQX2DqJOGogRRD87OXUfAejJfMsbHi1RqEI9dWUSiBTxlsoHOeUMeLY7wpFOMFp3SmAOsNBmonSu-lvhFIvffNk1P0ltN0AAig5zJKMRX8wxdIwMYP9VnCI0Y8boSP3OLYz3G4mk17S4A"

duration=30
blue_green_test "$service_url" "$duration" "$bearer_token"
