import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET request for /api/users
    res = http.get('http://sample_app:8002/api/users', { tags: { endpoint: '/api/users' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // GET request for /api/posts
    res = http.get('http://sample_app:8002/api/posts', { tags: { endpoint: '/api/posts' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // POST request for /api/posts
    const postData = JSON.stringify({
        title: 'Sample Post',
        content: 'This is a sample post content.',
        userId: 1,
    });
    res = http.post('http://sample_app:8002/api/posts', postData, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/posts' },
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
    
    // GET request for /api/comments
    res = http.get('http://sample_app:8002/api/comments', { tags: { endpoint: '/api/comments' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // POST request for /api/comments
    const commentData = JSON.stringify({
        postId: 1,
        content: 'This is a sample comment.',
    });
    res = http.post('http://sample_app:8002/api/comments', commentData, {
        headers: { 'Content-Type': 'application/json' },
        tags: { endpoint: '/api/comments' },
    });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // GET request for /api/users/{id}
    res = http.get('http://sample_app:8002/api/users/1', { tags: { endpoint: '/api/users/{id}' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}