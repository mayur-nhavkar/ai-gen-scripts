import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // GET request for /api/items
    let res = http.get('http://sample_app:8002/api/items', { tags: { endpoint: '/api/items' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for /api/items/{id}
    res = http.get('http://sample_app:8002/api/items/1', { tags: { endpoint: '/api/items/{id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for /api/items
    let payload = JSON.stringify({ name: "New Item", description: "Description of new item" });
    res = http.post('http://sample_app:8002/api/items', payload, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/items' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for /api/categories
    res = http.get('http://sample_app:8002/api/categories', { tags: { endpoint: '/api/categories' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for /api/categories
    payload = JSON.stringify({ name: "New Category" });
    res = http.post('http://sample_app:8002/api/categories', payload, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/categories' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}