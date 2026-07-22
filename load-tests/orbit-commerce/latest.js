import http from 'k6/http';
import { sleep } from 'k6';
export const options = { vus: 2, duration: '6s' };
export default function () {
  http.get('http://sample_app:8002/api/v1/order-items/by-product/1', { tags: { endpoint: '/api/v1/order-items/by-product/{product_id}' } });
  http.get('http://sample_app:8002/api/v1/products/low-stock', { tags: { endpoint: '/api/v1/products/low-stock' } });
  sleep(1);
}
