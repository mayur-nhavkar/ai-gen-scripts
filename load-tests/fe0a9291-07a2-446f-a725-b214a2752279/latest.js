import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET request for retrieving a list of items
    res = http.get('http://sample_app:8002/api/items', { tags: { endpoint: '/api/items' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for retrieving a single item by ID
    res = http.get('http://sample_app:8002/api/items/1', { tags: { endpoint: '/api/items/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for creating a new item
    const newItem = JSON.stringify({
        name: 'Sample Item',
        description: 'This is a sample item.',
        price: 19.99
    });
    res = http.post('http://sample_app:8002/api/items', newItem, {
        tags: { endpoint: '/api/items' },
        headers: { 'Content-Type': 'application/json' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for searching items
    res = http.get('http://sample_app:8002/api/items/search?q=test', { tags: { endpoint: '/api/items/search' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for retrieving item categories
    res = http.get('http://sample_app:8002/api/categories', { tags: { endpoint: '/api/categories' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}