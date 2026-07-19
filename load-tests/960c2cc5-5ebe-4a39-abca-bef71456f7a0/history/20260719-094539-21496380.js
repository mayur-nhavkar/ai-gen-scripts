import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET /users
    res = http.get('http://sample_app:8002/users', { tags: { endpoint: '/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /products
    res = http.get('http://sample_app:8002/products', { tags: { endpoint: '/products' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST /orders
    let orderPayload = JSON.stringify({
        userId: 1,
        productId: 2,
        quantity: 3
    });
    res = http.post('http://sample_app:8002/orders', orderPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/orders' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /categories
    res = http.get('http://sample_app:8002/categories', { tags: { endpoint: '/categories' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST /reviews
    let reviewPayload = JSON.stringify({
        productId: 2,
        rating: 5,
        comment: "Excellent product!"
    });
    res = http.post('http://sample_app:8002/reviews', reviewPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/reviews' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}