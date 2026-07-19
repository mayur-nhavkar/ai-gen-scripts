import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // GET request for fetching items
    let res1 = http.get('http://sample_app:8002/api/items', { tags: { endpoint: '/api/items' } });
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for fetching a single item
    let res2 = http.get('http://sample_app:8002/api/items/1', { tags: { endpoint: '/api/items/1' } });
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for creating an item
    let payload = JSON.stringify({ name: 'New Item', description: 'This is a new item.' });
    let params = { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/items' } };
    let res3 = http.post('http://sample_app:8002/api/items', payload, params);
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for fetching items by category
    let res4 = http.get('http://sample_app:8002/api/items/category/1', { tags: { endpoint: '/api/items/category/1' } });
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for updating an item
    let updatePayload = JSON.stringify({ name: 'Updated Item', description: 'This is an updated item.' });
    let res5 = http.post('http://sample_app:8002/api/items/1', updatePayload, params);
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}