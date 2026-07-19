import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET request for /api/users
    res = http.get('http://sample_app:8002/api/users', { tags: { endpoint: '/api/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for /api/users/{id}
    res = http.get('http://sample_app:8002/api/users/1', { tags: { endpoint: '/api/users/{id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for /api/users
    res = http.post('http://sample_app:8002/api/users', 
        JSON.stringify({ name: 'John Doe', email: 'john.doe@example.com' }), 
        { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/users' } }
    );
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for /api/posts
    res = http.get('http://sample_app:8002/api/posts', { tags: { endpoint: '/api/posts' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request for /api/posts/{id}
    res = http.get('http://sample_app:8002/api/posts/1', { tags: { endpoint: '/api/posts/{id}' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request for /api/posts
    res = http.post('http://sample_app:8002/api/posts', 
        JSON.stringify({ title: 'New Post', content: 'This is a new post.' }), 
        { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/posts' } }
    );
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}