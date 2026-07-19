import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Create Cart
    let createCartRes = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify({}), {
        headers: { 'Content-Type': 'application/json' },
    });
    check(createCartRes, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Get Cart
    let cartId = 1; // Example cart_id
    let getCartRes = http.get(`http://sample_app:8002/api/v1/cart/${cartId}`, {
        tags: { endpoint: '/api/v1/cart/{cart_id}' }
    });
    check(getCartRes, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Checkout
    let checkoutRes = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify({
        user_id: 1, // Example user_id
        cart_id: cartId
    }), {
        headers: { 'Content-Type': 'application/json' },
    });
    check(checkoutRes, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // Get products by SKU
    let sku = 'example-sku'; // Example SKU
    let getProductRes = http.get(`http://sample_app:8002/api/v1/products/${sku}`, {
        tags: { endpoint: '/api/v1/products/{sku}' }
    });
    check(getProductRes, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
    
    // List Orders
    let userId = 1; // Example user_id
    let listOrdersRes = http.get(`http://sample_app:8002/api/v1/orders/${userId}`, {
        tags: { endpoint: '/api/v1/orders/{user_id}' }
    });
    check(listOrdersRes, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}