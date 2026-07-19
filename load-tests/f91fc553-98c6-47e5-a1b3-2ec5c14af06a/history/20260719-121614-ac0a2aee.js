import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';

    // GET request - List items
    let res = http.get(`${baseUrl}/api/items`, { tags: { endpoint: '/api/items' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // GET request - Get specific item
    res = http.get(`${baseUrl}/api/items/1`, { tags: { endpoint: '/api/items/1' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // POST request - Create item
    const payload = JSON.stringify({
        name: 'New Item',
        description: 'Description of the new item',
        price: 10.99
    });
    res = http.post(`${baseUrl}/api/items`, payload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/items' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // GET request - Search items
    res = http.get(`${baseUrl}/api/items/search?q=example`, { tags: { endpoint: '/api/items/search' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // POST request - Update item
    const updatePayload = JSON.stringify({
        name: 'Updated Item',
        description: 'Updated description',
        price: 12.99
    });
    res = http.post(`${baseUrl}/api/items/1`, updatePayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/items/1' }
    });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}