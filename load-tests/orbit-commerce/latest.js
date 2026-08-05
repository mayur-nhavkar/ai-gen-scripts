import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    const getProductParams = { tags: { endpoint: '/api/v1/products/{sku}' } };
    const getCartParams = { tags: { endpoint: '/api/v1/cart/{cart_id}' } };
    const getRecentOrdersParams = { tags: { endpoint: '/api/v1/orders/recent' } };
    
    // GET request for a product by SKU
    let sku = 'example-sku';
    let res = http.get(`${baseUrl}/api/v1/products/${sku}`, getProductParams);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for cart details
    let cartId = 1; // example cart ID
    res = http.get(`${baseUrl}/api/v1/cart/${cartId}`, getCartParams);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET recent orders
    let since = '2023-01-01'; // example date
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=${since}`, getRecentOrdersParams);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}