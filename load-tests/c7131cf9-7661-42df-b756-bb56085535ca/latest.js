import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const baseUrl = 'http://sample_app:8002';

    // Sample GET request
    let res = http.get(`${baseUrl}/api/v1/resource1`, { tags: { endpoint: '/api/v1/resource1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Sample GET request
    res = http.get(`${baseUrl}/api/v1/resource2`, { tags: { endpoint: '/api/v1/resource2' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Sample POST request
    const payload1 = JSON.stringify({ key1: 'value1', key2: 'value2' });
    res = http.post(`${baseUrl}/api/v1/resource3`, payload1, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/resource3' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Sample GET request
    res = http.get(`${baseUrl}/api/v1/resource4`, { tags: { endpoint: '/api/v1/resource4' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // Sample POST request
    const payload2 = JSON.stringify({ name: 'example', description: 'example description' });
    res = http.post(`${baseUrl}/api/v1/resource5`, payload2, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/resource5' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}