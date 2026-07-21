import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = {};

    const healthzRes = http.get(`${baseUrl}/healthz`, params);
    check(healthzRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const createCartBody = JSON.stringify({
        // Example cart creation payload
        items: []
    });
    const createCartRes = http.post(`${baseUrl}/api/v1/cart`, createCartBody, params);
    check(createCartRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const cartId = 1; // Assuming we have a cart_id to get
    const getCartRes = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(getCartRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const userId = 1; // Assuming we are listing orders for userId 1
    const listOrdersRes = http.get(`${baseUrl}/api/v1/orders/${userId}`, params);
    check(listOrdersRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const sku = 'example-sku'; // Assuming an SKU to get product details
    const getProductRes = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(getProductRes, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}