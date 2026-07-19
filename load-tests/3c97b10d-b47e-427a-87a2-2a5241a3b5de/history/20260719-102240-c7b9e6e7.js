import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/api/v1/resource1', { tags: { endpoint: '/api/v1/resource1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/resource2', { tags: { endpoint: '/api/v1/resource2' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const payload1 = JSON.stringify({ key1: 'value1', key2: 'value2' });
    res = http.post('http://sample_app:8002/api/v1/resource3', payload1, { tags: { endpoint: '/api/v1/resource3' },.headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const payload2 = JSON.stringify({ name: 'example', age: 30 });
    res = http.post('http://sample_app:8002/api/v1/resource4', payload2, { tags: { endpoint: '/api/v1/resource4' }, headers: { 'Content-Type': 'application/json' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/resource5', { tags: { endpoint: '/api/v1/resource5' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}