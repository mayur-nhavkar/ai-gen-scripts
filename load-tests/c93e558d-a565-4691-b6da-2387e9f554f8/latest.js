import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/healthz' } };
    
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const cartBody = JSON.stringify({ product_id: 1, user_id: 1 });
    params.tags = { endpoint: '/api/v1/cart' };
    
    res = http.post(`${baseUrl}/api/v1/cart`, cartBody, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    params.tags = { endpoint: '/api/v1/cart/1' };
    res = http.get(`${baseUrl}/api/v1/cart/1`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const checkoutBody = JSON.stringify({ cart_id: 1 });
    params.tags = { endpoint: '/api/v1/checkout' };
    
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    params.tags = { endpoint: '/api/v1/orders/1' };
    res = http.get(`${baseUrl}/api/v1/orders/1`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags = { endpoint: '/api/v1/products/abc' };
    res = http.get(`${baseUrl}/api/v1/products/abc`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}