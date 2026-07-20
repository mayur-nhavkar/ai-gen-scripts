import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '' } };

    // Health Check
    params.tags.endpoint = '/healthz';
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Create Cart
    params.tags.endpoint = '/api/v1/cart';
    const createCartBody = JSON.stringify({});
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Cart (using a mock cart_id for demonstration)
    const cartId = 1;
    params.tags.endpoint = `/api/v1/cart/${cartId}`;
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // List Orders (using a mock user_id for demonstration)
    const userId = 1;
    params.tags.endpoint = `/api/v1/orders/${userId}`;
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Get Product By Sku (using a mock sku for demonstration)
    const sku = 'sample-sku';
    params.tags.endpoint = `/api/v1/products/${sku}`;
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}