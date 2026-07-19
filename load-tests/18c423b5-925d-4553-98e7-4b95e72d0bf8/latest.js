import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/products', { tags: { endpoint: '/api/v1/products' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/orders', { tags: { endpoint: '/api/v1/orders' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.post('http://sample_app:8002/api/v1/login', 
        JSON.stringify({ username: 'testuser', password: 'testpass' }), 
        { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/login' } }
    );
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.post('http://sample_app:8002/api/v1/orders', 
        JSON.stringify({ userId: 1, productId: 2, quantity: 3 }),
        { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/orders' } }
    );
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}