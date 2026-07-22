import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';

    check(http.get(`${baseUrl}/healthz`), { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const createCartBody = {
        // Add plausible attributes based on CartCreate schema
        items: [],
    };
    check(http.post(`${baseUrl}/api/v1/cart`, JSON.stringify(createCartBody), { headers: { 'Content-Type': 'application/json' } }), 
    { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    check(http.get(`${baseUrl}/api/v1/cart/1`), { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    check(http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`), { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    check(http.get(`${baseUrl}/api/v1/products/low-stock`), { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const checkoutBody = {
        // Add plausible attributes based on CheckoutRequest schema
        cartId: 1,
        paymentMethod: "credit_card",
    };
    check(http.post(`${baseUrl}/api/v1/checkout`, JSON.stringify(checkoutBody), { headers: { 'Content-Type': 'application/json' } }), 
    { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}