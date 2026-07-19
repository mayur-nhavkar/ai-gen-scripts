import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET /api/users
    res = http.get('http://sample_app:8002/api/users', { tags: { endpoint: '/api/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /api/users/{id}
    res = http.get('http://sample_app:8002/api/users/1', { tags: { endpoint: '/api/users/{id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST /api/users
    const payload = JSON.stringify({
        name: 'John Doe',
        email: 'john.doe@example.com'
    });

    res = http.post('http://sample_app:8002/api/users', payload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/users' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /api/posts
    res = http.get('http://sample_app:8002/api/posts', { tags: { endpoint: '/api/posts' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET /api/posts/{id}
    res = http.get('http://sample_app:8002/api/posts/1', { tags: { endpoint: '/api/posts/{id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST /api/posts
    const postPayload = JSON.stringify({
        title: 'Sample Post',
        content: 'This is a sample post content.',
        userId: 1
    });

    res = http.post('http://sample_app:8002/api/posts', postPayload, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/posts' }
    });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}