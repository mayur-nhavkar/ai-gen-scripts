import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET endpoint 1
    res = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint 2
    res = http.get('http://sample_app:8002/api/v1/products', { tags: { endpoint: '/api/v1/products' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint 3
    res = http.get('http://sample_app:8002/api/v1/orders', { tags: { endpoint: '/api/v1/orders' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint 1
    const userData = JSON.stringify({ name: 'John Doe', email: 'john.doe@example.com' });
    res = http.post('http://sample_app:8002/api/v1/users', userData, { 
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/users' } 
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint 2
    const orderData = JSON.stringify({ userId: 1, productId: 2, quantity: 3 });
    res = http.post('http://sample_app:8002/api/v1/orders', orderData, { 
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/orders' } 
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}