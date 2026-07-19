import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/healthz');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const createCartPayload = { user_id: 1 };
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify(createCartPayload), {
        headers: { 'Content-Type': 'application/json' },
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const cartId = 1; // Assuming we created a cart with id 1
    res = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const checkoutPayload = { cart_id: cartId };
    res = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify(checkoutPayload), {
        headers: { 'Content-Type': 'application/json' },
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const userId = 1; // Assuming we're getting orders for user_id 1
    res = http.get(`http://sample_app:8002/api/v1/orders/${userId}`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}