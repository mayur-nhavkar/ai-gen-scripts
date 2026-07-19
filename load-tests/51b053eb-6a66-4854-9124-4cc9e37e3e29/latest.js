import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET request for /api/v1/users
    res = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for /api/v1/products
    res = http.get('http://sample_app:8002/api/v1/products', { tags: { endpoint: '/api/v1/products' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for /api/v1/orders
    const orderPayload = JSON.stringify({
        productId: "12345",
        quantity: 2,
        userId: "67890"
    });
    res = http.post('http://sample_app:8002/api/v1/orders', orderPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/orders' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for /api/v1/orders
    res = http.get('http://sample_app:8002/api/v1/orders', { tags: { endpoint: '/api/v1/orders' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for /api/v1/categories
    res = http.get('http://sample_app:8002/api/v1/categories', { tags: { endpoint: '/api/v1/categories' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}