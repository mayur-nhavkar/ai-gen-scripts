import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // GET request for a sample endpoint
    let res1 = http.get('http://sample_app:8002/api/v1/users', {
        tags: { endpoint: '/api/v1/users' },
    });
    check(res1, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for another sample endpoint
    let res2 = http.get('http://sample_app:8002/api/v1/products', {
        tags: { endpoint: '/api/v1/products' },
    });
    check(res2, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for creating a new user
    let userPayload = JSON.stringify({
        name: "John Doe",
        email: "john.doe@example.com"
    });
    let res3 = http.post('http://sample_app:8002/api/v1/users', userPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/users' },
    });
    check(res3, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for user details
    let res4 = http.get('http://sample_app:8002/api/v1/users/1', {
        tags: { endpoint: '/api/v1/users/1' },
    });
    check(res4, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for creating a new product
    let productPayload = JSON.stringify({
        name: "Sample Product",
        price: 19.99
    });
    let res5 = http.post('http://sample_app:8002/api/v1/products', productPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/products' },
    });
    check(res5, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}