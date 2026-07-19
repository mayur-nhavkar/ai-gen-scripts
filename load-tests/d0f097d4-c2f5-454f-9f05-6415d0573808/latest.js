import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // GET request to /api/v1/items
    let res1 = http.get('http://sample_app:8002/api/v1/items', { tags: { endpoint: '/api/v1/items' } });
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to /api/v1/items/1
    let res2 = http.get('http://sample_app:8002/api/v1/items/1', { tags: { endpoint: '/api/v1/items/1' } });
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to /api/v1/items
    let payload = JSON.stringify({ name: 'Sample Item', description: 'This is a sample item.' });
    let res3 = http.post('http://sample_app:8002/api/v1/items', payload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/items' }
    });
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET request to /api/v1/users
    let res4 = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to /api/v1/users
    payload = JSON.stringify({ username: 'testuser', email: 'test@example.com', password: 'password123' });
    let res5 = http.post('http://sample_app:8002/api/v1/users', payload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/users' }
    });
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET request to /api/v1/orders
    let res6 = http.get('http://sample_app:8002/api/v1/orders', { tags: { endpoint: '/api/v1/orders' } });
    check(res6, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}