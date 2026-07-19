import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/healthz');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    const cartCreatePayload = { user_id: 1 };
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify(cartCreatePayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/cart/1');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/products/12345');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    const checkoutPayload = { cart_id: 1, payment_method: 'credit_card' };
    res = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify(checkoutPayload), { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}