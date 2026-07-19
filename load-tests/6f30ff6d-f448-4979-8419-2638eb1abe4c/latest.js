import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';

    // GET request for "/api/v1/items"
    let res = http.get(`${baseUrl}/api/v1/items`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for "/api/v1/users"
    res = http.get(`${baseUrl}/api/v1/users`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for "/api/v1/items"
    let itemPayload = JSON.stringify({ name: 'Sample Item', price: 10.99 });
    res = http.post(`${baseUrl}/api/v1/items`, itemPayload, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for "/api/v1/users"
    let userPayload = JSON.stringify({ username: 'testuser', email: 'testuser@example.com' });
    res = http.post(`${baseUrl}/api/v1/users`, userPayload, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for "/api/v1/items/{id}"
    res = http.get(`${baseUrl}/api/v1/items/1`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for "/api/v1/users/{id}"
    res = http.get(`${baseUrl}/api/v1/users/1`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}