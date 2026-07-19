import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
    let res;

    res = http.get('http://sample_app:8002/api/v1/resource1', {Tags: { endpoint: '/api/v1/resource1' }});
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/resource2', {Tags: { endpoint: '/api/v1/resource2' }});
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const postData1 = JSON.stringify({
        name: 'exampleName1',
        value: 'exampleValue1',
    });

    res = http.post('http://sample_app:8002/api/v1/resource3', postData1, {Tags: { endpoint: '/api/v1/resource3' }, headers: { 'Content-Type': 'application/json' }});
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    const postData2 = JSON.stringify({
        title: 'exampleTitle',
        description: 'exampleDescription',
    });

    res = http.post('http://sample_app:8002/api/v1/resource4', postData2, {Tags: { endpoint: '/api/v1/resource4' }, headers: { 'Content-Type': 'application/json' }});
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);

    res = http.get('http://sample_app:8002/api/v1/resource5', {Tags: { endpoint: '/api/v1/resource5' }});
    check(res, { 'status is 2xx': (r) => r.status >= 200 && r.status < 300 });
    sleep(1);
}