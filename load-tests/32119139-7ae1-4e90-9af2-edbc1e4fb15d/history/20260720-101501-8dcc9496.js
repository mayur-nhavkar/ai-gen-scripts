import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const params = {
        tags: { endpoint: '/' }
    };

    let res;

    res = http.get('http://sample_app:8002/healthz', params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    const cartCreateBody = JSON.stringify({ product_id: 1, user_id: 1 });
    res = http.post('http://sample_app:8002/api/v1/cart', cartCreateBody, { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/cart/1', params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/orders/1', params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/products/ABC123', params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    const checkoutBody = JSON.stringify({ cart_id: 1, user_id: 1 });
    res = http.post('http://sample_app:8002/api/v1/checkout', checkoutBody, { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}