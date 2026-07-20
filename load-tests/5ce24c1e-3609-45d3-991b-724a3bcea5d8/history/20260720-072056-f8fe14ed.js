import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const params = {
        tags: { endpoint: '/healthz' }
    };
    let res = http.get('http://sample_app:8002/healthz', params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    params.tags.endpoint = '/api/v1/cart';
    const cartBody = JSON.stringify({ product_id: 1, user_id: 1 });
    res = http.post('http://sample_app:8002/api/v1/cart', cartBody, { headers: { 'Content-Type': 'application/json' }, ...params });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    params.tags.endpoint = '/api/v1/cart/1';
    res = http.get('http://sample_app:8002/api/v1/cart/1', params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    params.tags.endpoint = '/api/v1/checkout';
    const checkoutBody = JSON.stringify({ cart_id: 1 });
    res = http.post('http://sample_app:8002/api/v1/checkout', checkoutBody, { headers: { 'Content-Type': 'application/json' }, ...params });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    params.tags.endpoint = '/api/v1/orders/1';
    res = http.get('http://sample_app:8002/api/v1/orders/1', params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}