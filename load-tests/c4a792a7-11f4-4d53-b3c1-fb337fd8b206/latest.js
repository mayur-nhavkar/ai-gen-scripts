import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET endpoint 1
    res = http.get('http://sample_app:8002/api/v1/items', { tags: { endpoint: '/api/v1/items' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint 2
    res = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint 1
    const postData1 = JSON.stringify({ name: 'New Item', price: 10 });
    res = http.post('http://sample_app:8002/api/v1/items', postData1, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/items' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint 2
    const postData2 = JSON.stringify({ username: 'newuser', email: 'newuser@example.com' });
    res = http.post('http://sample_app:8002/api/v1/users', postData2, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}