import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // GET request to fetch items
    let res1 = http.get('http://sample_app:8002/api/items', { tags: { endpoint: '/api/items' } });
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET request to fetch a specific item
    let res2 = http.get('http://sample_app:8002/api/items/1', { tags: { endpoint: '/api/items/1' } });
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to create a new item
    let postData = JSON.stringify({ name: 'New Item', price: 10.99 });
    let res3 = http.post('http://sample_app:8002/api/items', postData, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/items' } });
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET request to fetch item categories
    let res4 = http.get('http://sample_app:8002/api/categories', { tags: { endpoint: '/api/categories' } });
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to create a new category
    let postCategoryData = JSON.stringify({ name: 'New Category' });
    let res5 = http.post('http://sample_app:8002/api/categories', postCategoryData, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/categories' } });
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to fetch order details
    let res6 = http.get('http://sample_app:8002/api/orders/1', { tags: { endpoint: '/api/orders/1' } });
    check(res6, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}