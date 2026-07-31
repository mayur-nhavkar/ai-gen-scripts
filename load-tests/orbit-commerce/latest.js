import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/api/v1/products/{sku}' } };

    // Example 1: Get product details by SKU
    let sku = 'example-sku'; // Replace with a valid SKU
    let res = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Example 2: Get orders by status
    let status = 'pending'; // Replace with a valid order status
    res = http.get(`${baseUrl}/api/v1/orders/by-status/${status}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Example 3: Get recent orders
    let sinceDate = '2023-01-01'; // Insert a valid date as needed
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=${sinceDate}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Example 4: Get cart by cart_id
    let cartId = 1; // Replace with a valid cart id
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Example 5: Get products by category
    let category = 'electronics'; // Replace with a valid category
    res = http.get(`${baseUrl}/api/v1/products/by-category/${category}`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}