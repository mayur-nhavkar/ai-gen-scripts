import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // GET request for retrieving a list of items
    let res1 = http.get('http://sample_app:8002/api/items', { tags: { endpoint: '/api/items' } });
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for retrieving a specific item
    let res2 = http.get('http://sample_app:8002/api/items/1', { tags: { endpoint: '/api/items/1' } });
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for creating a new item
    let payload = JSON.stringify({ name: 'New Item', description: 'This is a new item.' });
    let res3 = http.post('http://sample_app:8002/api/items', payload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/items' },
    });
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for retrieving item details
    let res4 = http.get('http://sample_app:8002/api/items/1/details', { tags: { endpoint: '/api/items/1/details' } });
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for updating an item
    let updatePayload = JSON.stringify({ name: 'Updated Item' });
    let res5 = http.post('http://sample_app:8002/api/items/1', updatePayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/items/1' },
    });
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}