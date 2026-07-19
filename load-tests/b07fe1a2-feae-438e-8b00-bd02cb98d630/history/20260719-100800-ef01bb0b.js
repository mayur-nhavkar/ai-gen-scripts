import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/api/users', { tags: { endpoint: '/api/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/posts', { tags: { endpoint: '/api/posts' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/comments', { tags: { endpoint: '/api/comments' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.post('http://sample_app:8002/api/posts', JSON.stringify({ title: 'Sample Post', body: 'This is a sample post.' }), { 
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/posts' } 
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/categories', { tags: { endpoint: '/api/categories' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}