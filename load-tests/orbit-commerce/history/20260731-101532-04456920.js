import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';
    
    const res1 = http.get(`${baseUrl}/api/v1/products/by-category/electronics`, { tags: { endpoint: '/api/v1/products/by-category/{category}' } });
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const res2 = http.get(`${baseUrl}/api/v1/products/low-stock`, { tags: { endpoint: '/api/v1/products/low-stock' } });
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const res3 = http.get(`${baseUrl}/api/v1/products/1`, { tags: { endpoint: '/api/v1/products/{sku}' } });
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const res4 = http.get(`${baseUrl}/api/v1/orders/recent?since=2023-01-01`, { tags: { endpoint: '/api/v1/orders/recent' } });
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    const res5 = http.get(`${baseUrl}/api/v1/carts/by-user/123`, { tags: { endpoint: '/api/v1/carts/by-user/{user_id}' } });
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}