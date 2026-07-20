import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    check(http.get(`${baseUrl}/healthz`), { 'status is 200': (r) => r.status === 200, tags: { endpoint: '/healthz' } });
    sleep(1);
    
    const cartCreatePayload = { /* Add plausible CartCreate payload data here */ };
    check(http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(cartCreatePayload), { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/cart' } }), { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    check(http.get(`${baseUrl}/api/v1/cart/1`), { 'status is 200': (r) => r.status === 200, tags: { endpoint: '/api/v1/cart/{cart_id}' } });
    sleep(1);
    
    check(http.get(`${baseUrl}/api/v1/products/123`), { 'status is 200': (r) => r.status === 200, tags: { endpoint: '/api/v1/products/{sku}' } });
    sleep(1);
    
    const checkoutPayload = { /* Add plausible CheckoutRequest payload data here */ };
    check(http.post(`${baseUrl}/api/v1/checkout`, JSON.stringify(checkoutPayload), { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/checkout' } }), { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    check(http.get(`${baseUrl}/api/v1/orders/1`), { 'status is 200': (r) => r.status === 200, tags: { endpoint: '/api/v1/orders/{user_id}' } });
    sleep(1);
}