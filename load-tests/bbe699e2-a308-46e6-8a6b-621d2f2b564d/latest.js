import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // Sample GET request
    res = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Sample GET request
    res = http.get('http://sample_app:8002/api/v1/products', { tags: { endpoint: '/api/v1/products' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Sample POST request
    const userPayload = JSON.stringify({ name: 'John Doe', email: 'john@example.com' });
    res = http.post('http://sample_app:8002/api/v1/users', userPayload, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // Sample GET request
    res = http.get('http://sample_app:8002/api/v1/orders', { tags: { endpoint: '/api/v1/orders' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // Sample POST request
    const productPayload = JSON.stringify({ name: 'Sample Product', price: 19.99 });
    res = http.post('http://sample_app:8002/api/v1/products', productPayload, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/products' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}