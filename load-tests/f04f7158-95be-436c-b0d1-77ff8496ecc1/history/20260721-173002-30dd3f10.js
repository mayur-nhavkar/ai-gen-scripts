import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/healthz' } };

    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    params.tags.endpoint = '/api/v1/cart';
    const cartData = JSON.stringify({ /* Add plausible fields as per schema */ });
    res = http.post(`${baseUrl}/api/v1/cart`, cartData, { ...params, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    params.tags.endpoint = '/api/v1/cart/1';  // Assuming cart_id = 1
    res = http.get(`${baseUrl}/api/v1/cart/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    params.tags.endpoint = '/api/v1/orders/1';  // Assuming user_id = 1
    res = http.get(`${baseUrl}/api/v1/orders/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    params.tags.endpoint = '/api/v1/products/12345';  // Assuming sku = '12345'
    res = http.get(`${baseUrl}/api/v1/products/12345`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}