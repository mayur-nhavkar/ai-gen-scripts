import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET request to /api/v1/items
    res = http.get('http://sample_app:8002/api/v1/items', { tags: { endpoint: '/api/v1/items' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to /api/v1/items/{id}
    res = http.get('http://sample_app:8002/api/v1/items/1', { tags: { endpoint: '/api/v1/items/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to /api/v1/items
    res = http.post('http://sample_app:8002/api/v1/items', JSON.stringify({ name: 'NewItem', description: 'A new test item' }), { 
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/items' } 
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to /api/v1/users
    res = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to /api/v1/users
    res = http.post('http://sample_app:8002/api/v1/users', JSON.stringify({ username: 'newuser', password: 'password123' }), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/users' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}