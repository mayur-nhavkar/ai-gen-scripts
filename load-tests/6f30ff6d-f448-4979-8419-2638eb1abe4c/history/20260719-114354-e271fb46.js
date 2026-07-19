import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET endpoint example
    res = http.get('http://sample_app:8002/api/v1/resource1', { tags: { endpoint: '/api/v1/resource1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint example
    res = http.get('http://sample_app:8002/api/v1/resource2', { tags: { endpoint: '/api/v1/resource2' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint example
    const postData1 = JSON.stringify({ name: "example", value: 123 });
    res = http.post('http://sample_app:8002/api/v1/resource3', postData1, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/resource3' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint example
    const postData2 = JSON.stringify({ title: "sample", description: "sample description" });
    res = http.post('http://sample_app:8002/api/v1/resource4', postData2, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/resource4' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint example
    res = http.get('http://sample_app:8002/api/v1/resource5', { tags: { endpoint: '/api/v1/resource5' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}