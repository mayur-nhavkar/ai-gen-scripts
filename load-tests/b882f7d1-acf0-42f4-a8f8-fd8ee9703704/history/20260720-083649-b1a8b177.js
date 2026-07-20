import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://host.docker.internal:8000';
const params = { tags: { endpoint: '/' } };

export default function () {
    // GET request to fetch items
    let res = http.get(`${BASE_URL}/items`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to fetch a specific item
    res = http.get(`${BASE_URL}/items/1`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to create a new item
    const newItem = JSON.stringify({ name: 'New Item', description: 'This is a new item' });
    res = http.post(`${BASE_URL}/items`, newItem, { ...params, headers: { 'Content-Type': 'application/json', ...params.headers } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // GET request to fetch categories
    res = http.get(`${BASE_URL}/categories`, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    // POST request to create a new category
    const newCategory = JSON.stringify({ name: 'New Category' });
    res = http.post(`${BASE_URL}/categories`, newCategory, { ...params, headers: { 'Content-Type': 'application/json', ...params.headers } });
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}