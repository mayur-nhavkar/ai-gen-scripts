import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/posts', { tags: { endpoint: '/api/v1/posts' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/comments', { tags: { endpoint: '/api/v1/comments' } });
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    const payload = JSON.stringify({ title: 'New Post', content: 'This is a new post' });
    res = http.post('http://sample_app:8002/api/v1/posts', payload, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/posts' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    const commentPayload = JSON.stringify({ postId: 1, content: 'This is a comment' });
    res = http.post('http://sample_app:8002/api/v1/comments', commentPayload, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/comments' } });
    check(res, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}