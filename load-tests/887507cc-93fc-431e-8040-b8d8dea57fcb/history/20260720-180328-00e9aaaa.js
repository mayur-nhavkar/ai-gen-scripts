import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    const createCartBody = JSON.stringify({
        // Example fields for CartCreate schema
        items: [],
        user_id: 1
    });
    
    const checkoutBody = JSON.stringify({
        // Example fields for CheckoutRequest schema
        cart_id: 1,
        payment_method: 'credit_card',
        address: '123 Test St, Test City, TC 12345'
    });
    
    const params = { tags: { endpoint: '/api/v1/cart' } };
    
    let res;

    res = http.post(`${baseUrl}/api/v1/cart`, createCartBody, params);
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    params.tags.endpoint = '/api/v1/cart/1';
    res = http.get(`${baseUrl}/api/v1/cart/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    params.tags.endpoint = '/api/v1/checkout';
    res = http.post(`${baseUrl}/api/v1/checkout`, checkoutBody, params);
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    params.tags.endpoint = '/api/v1/orders/1';
    res = http.get(`${baseUrl}/api/v1/orders/1`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    params.tags.endpoint = '/healthz';
    res = http.get(`${baseUrl}/healthz`, params);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}