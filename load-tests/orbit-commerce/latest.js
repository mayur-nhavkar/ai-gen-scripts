import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // Test GET product listings
    res = http.get('http://sample_app:8002/api/products', { tags: { endpoint: '/api/products' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Test GET product details
    res = http.get('http://sample_app:8002/api/products/1', { tags: { endpoint: '/api/products/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Test POST add product to cart
    const addToCartPayload = JSON.stringify({ productId: 1, quantity: 2 });
    res = http.post('http://sample_app:8002/api/cart', addToCartPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/cart' },
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Test GET cart details
    res = http.get('http://sample_app:8002/api/cart', { tags: { endpoint: '/api/cart' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}