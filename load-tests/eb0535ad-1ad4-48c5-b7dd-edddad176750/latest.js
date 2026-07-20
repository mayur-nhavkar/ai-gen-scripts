import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    // GET /healthz
    let res = http.get(`${baseUrl}/healthz`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST /api/v1/cart
    let cartCreatePayload = JSON.stringify({ product_id: 1, user_id: 1 });
    res = http.post(`${baseUrl}/api/v1/cart`, cartCreatePayload, {
        headers: { 'Content-Type': 'application/json' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /api/v1/cart/{cart_id}
    res = http.get(`${baseUrl}/api/v1/cart/1`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /api/v1/products/{sku}
    res = http.get(`${baseUrl}/api/v1/products/sample-sku`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST /api/v1/checkout
    let checkoutPayload = JSON.stringify({ cart_id: 1, user_id: 1 });
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutPayload, {
        headers: { 'Content-Type': 'application/json' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /api/v1/orders/{user_id}
    res = http.get(`${baseUrl}/api/v1/orders/1`);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}