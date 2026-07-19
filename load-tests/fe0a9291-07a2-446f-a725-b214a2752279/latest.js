import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/products', { tags: { endpoint: '/api/v1/products' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const orderPayload = JSON.stringify({
        userId: 1,
        productIds: [1, 2],
        quantity: 2
    });
    res = http.post('http://sample_app:8002/api/v1/orders', orderPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/orders' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/cart', { tags: { endpoint: '/api/v1/cart' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const reviewPayload = JSON.stringify({
        productId: 1,
        rating: 5,
        comment: 'Great product!'
    });
    res = http.post('http://sample_app:8002/api/v1/reviews', reviewPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/reviews' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}