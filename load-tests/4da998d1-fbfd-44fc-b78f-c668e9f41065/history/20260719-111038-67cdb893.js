import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET request to /api/users
    res = http.get('http://sample_app:8002/api/users', { tags: { endpoint: '/api/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to /api/products
    res = http.get('http://sample_app:8002/api/products', { tags: { endpoint: '/api/products' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to /api/orders
    const orderPayload = JSON.stringify({
        productId: 1,
        quantity: 2
    });
    res = http.post('http://sample_app:8002/api/orders', orderPayload, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/orders' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to /api/categories
    res = http.get('http://sample_app:8002/api/categories', { tags: { endpoint: '/api/categories' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to /api/reviews
    const reviewPayload = JSON.stringify({
        productId: 1,
        rating: 5,
        comment: "Excellent product!"
    });
    res = http.post('http://sample_app:8002/api/reviews', reviewPayload, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/reviews' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}