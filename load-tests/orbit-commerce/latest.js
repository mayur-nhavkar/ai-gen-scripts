import http from "k6/http";

export const options = { vus: 15, duration: "20s" };

const BASE = "http://sample_app:8002";

export default function () {
  http.get(`${BASE}/api/v1/orders/by-status/pending`);
  http.get(`${BASE}/api/v1/orders/recent?since=2020-01-01`);
  http.get(`${BASE}/api/v1/order-items/by-product/1`);
  http.get(`${BASE}/api/v1/carts/by-user/1`);
  http.get(`${BASE}/api/v1/products/by-category/Electronics`);
}
