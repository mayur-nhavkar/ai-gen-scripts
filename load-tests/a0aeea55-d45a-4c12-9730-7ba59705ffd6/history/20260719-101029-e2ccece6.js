import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET endpoint 1
    res = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint 2
    res = http.get('http://sample_app:8002/api/v1/posts', { tags: { endpoint: '/api/v1/posts' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint 1
    const postData1 = JSON.stringify({ title: 'Sample Post', content: 'This is a content of the sample post.' });
    res = http.post('http://sample_app:8002/api/v1/posts', postData1, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/posts' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST endpoint 2
    const postData2 = JSON.stringify({ username: 'testuser', password: 'securepassword' });
    res = http.post('http://sample_app:8002/api/v1/login', postData2, { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/v1/login' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET endpoint 3
    res = http.get('http://sample_app:8002/api/v1/comments', { tags: { endpoint: '/api/v1/comments' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}