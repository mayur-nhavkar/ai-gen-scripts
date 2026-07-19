import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET endpoint: /api/items
    res = http.get('http://sample_app:8002/api/items');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint: /api/items/{id}
    res = http.get('http://sample_app:8002/api/items/1');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint: /api/items
    const payload = JSON.stringify({ name: 'New Item', description: 'This is a new item.' });
    res = http.post('http://sample_app:8002/api/items', payload, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint: /api/categories
    res = http.get('http://sample_app:8002/api/categories');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint: /api/users
    res = http.get('http://sample_app:8002/api/users');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}