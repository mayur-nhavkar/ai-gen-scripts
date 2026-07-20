import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
  
    const params = { tags: { endpoint: '/healthz' } };
    let res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  
    const createCartBody = JSON.stringify({ /* Add plausible fields from CartCreate schema */ });
    params.tags.endpoint = '/api/v1/cart';
    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, params);
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
  
    params.tags.endpoint = '/api/v1/cart/1'; // Assuming cart_id = 1
    res = http.get(`${baseUrl}/api/v1/cart/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  
    params.tags.endpoint = '/api/v1/checkout';
    const checkoutBody = JSON.stringify({ /* Add plausible fields from CheckoutRequest schema */ });
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, params);
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
  
    params.tags.endpoint = '/api/v1/orders/1'; // Assuming user_id = 1
    res = http.get(`${baseUrl}/api/v1/orders/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
  
    params.tags.endpoint = '/api/v1/products/some-sku'; // Replace with an actual SKU
    res = http.get(`${baseUrl}/api/v1/products/some-sku`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}