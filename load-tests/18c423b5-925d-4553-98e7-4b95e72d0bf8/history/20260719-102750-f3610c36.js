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

    res = http.post('http://sample_app:8002/api/v1/resource3', JSON.stringify({ key: 'value' }), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/resource3' },
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/resource4', { tags: { endpoint: '/api/v1/resource4' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.post('http://sample_app:8002/api/v1/resource5', JSON.stringify({ id: 123, name: 'example' }), {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/v1/resource5' },
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}