import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';

    // Endpoint: Get Cart
    const cartId = 1; // Example cart ID
    let res = http.get(`${baseUrl}/api/v1/cart/${cartId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Endpoint: Get Recent Orders
    const sinceDate = '2023-01-01'; // Example date
    res = http.get(`${baseUrl}/api/v1/orders/recent?since=${sinceDate}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Endpoint: Get Products Low Stock
    res = http.get(`${baseUrl}/api/v1/products/low-stock?threshold=10`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Endpoint: Orders By Status
    const orderStatus = 'pending'; // Example status
    res = http.get(`${baseUrl}/api/v1/orders/by-status/${orderStatus}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Endpoint: Get Cart by User
    const userId = 1; // Example user ID
    res = http.get(`${baseUrl}/api/v1/carts/by-user/${userId}`);
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}