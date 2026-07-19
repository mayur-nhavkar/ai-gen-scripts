import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET endpoint 1
    res = http.get('http://sample_app:8002/api/users', { tags: { endpoint: '/api/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint 2
    res = http.get('http://sample_app:8002/api/products', { tags: { endpoint: '/api/products' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint 1
    const userPayload = JSON.stringify({
        name: 'John Doe',
        email: 'john.doe@example.com'
    });
    res = http.post('http://sample_app:8002/api/users', userPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/users' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint 2
    const productPayload = JSON.stringify({
        title: 'Sample Product',
        price: 19.99
    });
    res = http.post('http://sample_app:8002/api/products', productPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/products' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint 3
    res = http.get('http://sample_app:8002/api/orders', { tags: { endpoint: '/api/orders' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}