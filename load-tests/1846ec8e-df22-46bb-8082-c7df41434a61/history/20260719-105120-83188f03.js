import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/products', { tags: { endpoint: '/api/v1/products' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/orders', { tags: { endpoint: '/api/v1/orders' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    const payload = JSON.stringify({
        name: 'Sample Product',
        price: 29.99,
        description: 'This is a sample product.'
    });

    res = http.post('http://sample_app:8002/api/v1/products', payload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/products' }
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/users/1', { tags: { endpoint: '/api/v1/users/1' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}