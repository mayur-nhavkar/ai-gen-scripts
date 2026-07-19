import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/api/users', { tags: { endpoint: '/api/users' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/products', { tags: { endpoint: '/api/products' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/orders', { tags: { endpoint: '/api/orders' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    const payload = JSON.stringify({
        name: 'Sample Product',
        price: 29.99,
        description: 'A sample product for load testing',
    });

    res = http.post('http://sample_app:8002/api/products', payload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/products' },
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/orders/1', { tags: { endpoint: '/api/orders/1' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}