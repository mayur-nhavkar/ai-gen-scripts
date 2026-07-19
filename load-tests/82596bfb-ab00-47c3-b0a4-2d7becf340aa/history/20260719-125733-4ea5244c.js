import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/healthz');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const createCartPayload = JSON.stringify({ });
    res = http.post('http://sample_app:8002/api/v1/cart', createCartPayload, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/cart/1');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const checkoutPayload = JSON.stringify({ });
    res = http.post('http://sample_app:8002/api/v1/checkout', checkoutPayload, { headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/orders/1');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/products/product123');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}