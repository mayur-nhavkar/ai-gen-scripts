import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    const params = { tags: { endpoint: '/api/v1/products/sku' } };
    
    // Retrieve product information by SKU
    const sku = 'sample-sku'; // Replace with a valid SKU for testing
    const res1 = http.get(`${baseUrl}/api/v1/products/${sku}`, params);
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });

    sleep(1);
    
    // Retrieve product information by category
    const category = 'sample-category'; // Replace with a valid category for testing
    const res2 = http.get(`${baseUrl}/api/v1/products/by-category/${category}`, params);
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });

    sleep(1);
    
    // Retrieve low stock products
    const threshold = 10; // Example threshold value
    const res3 = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=${threshold}`, params);
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });

    sleep(1);
    
    // Retrieve recent orders
    const since = '2023-01-01'; // Replace with a valid date for testing
    const res4 = http.get(`${baseUrl}/api/v1/orders/recent?since=${since}`, params);
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });

    sleep(1);
    
    // Retrieve orders by status
    const status = 'pending'; // Replace with a valid status for testing
    const res5 = http.get(`${baseUrl}/api/v1/orders/by-status/${status}`, params);
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });

    sleep(1);
    
    // Retrieve user recommendations
    const userId = 1; // Replace with a valid user id for testing
    const res6 = http.get(`${baseUrl}/api/v1/users/${userId}/recommendations`, params);
    check(res6, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
}