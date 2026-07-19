import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/api/users', { tags: { endpoint: '/api/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/products', { tags: { endpoint: '/api/products' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/orders', { tags: { endpoint: '/api/orders' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.post('http://sample_app:8002/api/users', JSON.stringify({ name: 'John Doe', email: 'john.doe@example.com' }), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/users' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.post('http://sample_app:8002/api/orders', JSON.stringify({ product_id: 1, quantity: 2 }), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/orders' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}