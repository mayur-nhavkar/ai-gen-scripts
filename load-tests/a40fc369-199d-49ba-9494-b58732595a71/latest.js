import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/healthz', { tags: { endpoint: '/healthz' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    let createCartPayload = JSON.stringify({ user_id: 1 });
    res = http.post('http://sample_app:8002/api/v1/cart', createCartPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/cart' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/cart/1', { tags: { endpoint: '/api/v1/cart/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/products/12345', { tags: { endpoint: '/api/v1/products/12345' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    let checkoutPayload = JSON.stringify({ cart_id: 1, user_id: 1 });
    res = http.post('http://sample_app:8002/api/v1/checkout', checkoutPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/checkout' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/orders/1', { tags: { endpoint: '/api/v1/orders/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}