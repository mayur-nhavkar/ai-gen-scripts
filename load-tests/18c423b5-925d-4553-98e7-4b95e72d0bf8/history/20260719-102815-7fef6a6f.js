import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET endpoint 1
    res = http.get('http://sample_app:8002/api/v1/resource1', { tags: { endpoint: '/api/v1/resource1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint 2
    res = http.get('http://sample_app:8002/api/v1/resource2', { tags: { endpoint: '/api/v1/resource2' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint 1
    const payload1 = JSON.stringify({ name: 'Sample', value: 123 });
    res = http.post('http://sample_app:8002/api/v1/resource3', payload1, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/resource3' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET endpoint 3
    res = http.get('http://sample_app:8002/api/v1/resource4', { tags: { endpoint: '/api/v1/resource4' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint 2
    const payload2 = JSON.stringify({ title: 'Example', description: 'This is a test.' });
    res = http.post('http://sample_app:8002/api/v1/resource5', payload2, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/resource5' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}