import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    const params = { tags: { endpoint: '/healthz' } };
    let res = http.get('http://sample_app:8002/healthz', params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const createCartBody = JSON.stringify({});
    params.tags.endpoint = '/api/v1/cart';
    res = http.post('http://sample_app:8002/api/v1/cart', createCartBody, params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags.endpoint = '/api/v1/cart/1';
    res = http.get('http://sample_app:8002/api/v1/cart/1', params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags.endpoint = '/api/v1/orders/recent';
    res = http.get('http://sample_app:8002/api/v1/orders/recent?since=2023-01-01', params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags.endpoint = '/api/v1/products/low-stock';
    res = http.get('http://sample_app:8002/api/v1/products/low-stock?threshold=10', params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    params.tags.endpoint = '/api/v1/users/1/recommendations';
    res = http.get('http://sample_app:8002/api/v1/users/1/recommendations', params);
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}