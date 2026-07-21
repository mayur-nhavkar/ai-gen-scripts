import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/healthz' } };

    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags = { endpoint: '/api/v1/cart' };
    const cartPayload = JSON.stringify({ /* Add plausible JSON for CartCreate schema */ });
    res = http.post(`${baseUrl}/api/v1/cart`, cartPayload, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const cartId = 1; // Example cart ID
    params.tags = { endpoint: `/api/v1/cart/${cartId}` };
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags = { endpoint: '/api/v1/orders/recent' };
    const sinceDate = '2023-01-01'; // Example date
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=${sinceDate}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags = { endpoint: `/api/v1/orders/by-status/completed` };
    res = http.get(`${baseUrl}/api/v1/orders/by-status/completed`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags = { endpoint: '/api/v1/products/low-stock' };
    res = http.get(`${baseUrl}/api/v1/products/low-stock`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}