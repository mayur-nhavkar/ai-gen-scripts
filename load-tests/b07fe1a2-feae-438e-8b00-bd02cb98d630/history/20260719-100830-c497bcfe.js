import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // GET endpoint: /api/items
    let res = http.get('http://sample_app:8002/api/items', { tags: { endpoint: '/api/items' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint: /api/users
    res = http.get('http://sample_app:8002/api/users', { tags: { endpoint: '/api/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint: /api/items
    let payload = JSON.stringify({ name: 'Sample Item', description: 'This is a sample item.' });
    res = http.post('http://sample_app:8002/api/items', payload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/items' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint: /api/orders
    res = http.get('http://sample_app:8002/api/orders', { tags: { endpoint: '/api/orders' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint: /api/orders
    payload = JSON.stringify({ userId: 1, itemId: 1, quantity: 2 });
    res = http.post('http://sample_app:8002/api/orders', payload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/orders' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint: /api/profile
    res = http.get('http://sample_app:8002/api/profile', { tags: { endpoint: '/api/profile' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}