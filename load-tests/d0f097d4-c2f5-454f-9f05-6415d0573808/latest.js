import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET endpoint: /api/users
    res = http.get('http://sample_app:8002/api/users', { tags: { endpoint: '/api/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint: /api/products
    res = http.get('http://sample_app:8002/api/products', { tags: { endpoint: '/api/products' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint: /api/orders
    res = http.post('http://sample_app:8002/api/orders', JSON.stringify({
        userId: 1,
        productId: 2,
        quantity: 3
    }), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/orders' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint: /api/categories
    res = http.get('http://sample_app:8002/api/categories', { tags: { endpoint: '/api/categories' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint: /api/reviews
    res = http.post('http://sample_app:8002/api/reviews', JSON.stringify({
        productId: 2,
        rating: 5,
        comment: "Excellent product!"
    }), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/reviews' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}