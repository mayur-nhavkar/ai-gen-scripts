import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // GET endpoint
    let res = http.get('http://sample_app:8002/api/resource1', { tags: { endpoint: '/api/resource1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint
    res = http.get('http://sample_app:8002/api/resource2', { tags: { endpoint: '/api/resource2' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // POST endpoint
    let payload1 = JSON.stringify({ name: 'example', value: 42 });
    res = http.post('http://sample_app:8002/api/resource3', payload1, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/resource3' },
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // POST endpoint
    let payload2 = JSON.stringify({ title: 'Test', description: 'This is a test.' });
    res = http.post('http://sample_app:8002/api/resource4', payload2, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/resource4' },
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
    
    // GET endpoint
    res = http.get('http://sample_app:8002/api/resource5', { tags: { endpoint: '/api/resource5' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}