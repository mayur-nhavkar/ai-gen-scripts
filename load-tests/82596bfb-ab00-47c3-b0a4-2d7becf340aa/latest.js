import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // Health check
    let res = http.get('http://sample_app:8002/healthz');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Create Cart
    res = http.post('http://sample_app:8002/api/v1/cart', JSON.stringify({}));
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Cart
    res = http.get('http://sample_app:8002/api/v1/cart/1');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // List Orders
    res = http.get('http://sample_app:8002/api/v1/orders/1');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Get Product by SKU
    res = http.get('http://sample_app:8002/api/v1/products/sku123');
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // Checkout
    res = http.post('http://sample_app:8002/api/v1/checkout', JSON.stringify({}));
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}