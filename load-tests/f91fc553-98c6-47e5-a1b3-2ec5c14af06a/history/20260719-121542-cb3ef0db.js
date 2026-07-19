import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    // GET request to fetch resources
    let res1 = http.get('http://sample_app:8002/api/v1/resources', { tags: { endpoint: '/api/v1/resources' } });
    check(res1, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // GET request to fetch a specific resource
    let res2 = http.get('http://sample_app:8002/api/v1/resources/1', { tags: { endpoint: '/api/v1/resources/1' } });
    check(res2, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // POST request to create a new resource
    let payload1 = JSON.stringify({
        name: 'New Resource',
        description: 'Description of new resource',
    });
    let params1 = { headers: { 'Content-Type': 'application/json' } };
    let res3 = http.post('http://sample_app:8002/api/v1/resources', payload1, params1);
    check(res3, { 'status is 201': (r) => r.status === 201 });
    sleep(1);

    // GET request to fetch all users
    let res4 = http.get('http://sample_app:8002/api/v1/users', { tags: { endpoint: '/api/v1/users' } });
    check(res4, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // GET request to fetch a specific user
    let res5 = http.get('http://sample_app:8002/api/v1/users/1', { tags: { endpoint: '/api/v1/users/1' } });
    check(res5, { 'status is 200': (r) => r.status === 200 });
    sleep(1);

    // POST request to create a new user
    let payload2 = JSON.stringify({
        username: 'newuser',
        email: 'newuser@example.com',
    });
    let params2 = { headers: { 'Content-Type': 'application/json' } };
    let res6 = http.post('http://sample_app:8002/api/v1/users', payload2, params2);
    check(res6, { 'status is 201': (r) => r.status === 201 });
    sleep(1);
}