import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // GET request to fetch items
    let res = http.get('http://sample_app:8002/items', { tags: { endpoint: '/items' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to fetch a specific item
    res = http.get('http://sample_app:8002/items/1', { tags: { endpoint: '/items/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // POST request to create a new item
    let payload = JSON.stringify({
        name: 'New Item',
        description: 'This is a new item.',
        price: 19.99
    });
    res = http.post('http://sample_app:8002/items', payload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/items' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to fetch item categories
    res = http.get('http://sample_app:8002/categories', { tags: { endpoint: '/categories' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to create a new category
    payload = JSON.stringify({
        name: 'New Category'
    });
    res = http.post('http://sample_app:8002/categories', payload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/categories' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}