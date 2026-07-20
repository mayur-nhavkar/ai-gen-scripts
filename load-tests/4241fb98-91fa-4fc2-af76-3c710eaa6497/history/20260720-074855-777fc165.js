import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/healthz' } };

    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const createCartBody = JSON.stringify({}); // Assuming empty cart creation is valid
    params.tags.endpoint = '/api/v1/cart';
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const cartId = 1; // Using a placeholder cart id for fetching
    params.tags.endpoint = `/api/v1/cart/${cartId}`;
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const userId = 1; // Assuming user id is known for orders
    params.tags.endpoint = `/api/v1/orders/${userId}`;
    res = http.get(`${baseUrl}/api/v1/orders/${userId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const sku = '12345'; // Using a placeholder SKU for fetching product
    params.tags.endpoint = `/api/v1/products/${sku}`;
    res = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}