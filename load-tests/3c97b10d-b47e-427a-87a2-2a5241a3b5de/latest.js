import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    // GET request to fetch resource list
    res = http.get('http://sample_app:8002/api/resources', { tags: { endpoint: '/api/resources' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to fetch a specific resource
    res = http.get('http://sample_app:8002/api/resources/1', { tags: { endpoint: '/api/resources/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to create a new resource
    res = http.post('http://sample_app:8002/api/resources', JSON.stringify({
        name: 'New Resource',
        description: 'Description of the new resource',
    }), { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/resources' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to fetch user details
    res = http.get('http://sample_app:8002/api/users/1', { tags: { endpoint: '/api/users/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to update user details
    res = http.post('http://sample_app:8002/api/users/1', JSON.stringify({
        name: 'Updated User',
        email: 'updated@example.com',
    }), { headers: { 'Content-Type': 'application/json' }, tags: { endpoint: '/api/users/1' } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}