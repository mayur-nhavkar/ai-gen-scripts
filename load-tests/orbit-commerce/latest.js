import http from "k6/http";

export const options = { vus: 15, duration: "20s" };

const BASE = "http://sample_app:8002";

export default function () {
  http.get(`${BASE}/api/v1/orders/by-status/pending`, { tags: { endpoint: "/api/v1/orders/by-status/{status}" } });
  http.get(`${BASE}/api/v1/orders/recent?since=2020-01-01`, { tags: { endpoint: "/api/v1/orders/recent" } });
  http.get(`${BASE}/api/v1/order-items/by-product/1`, { tags: { endpoint: "/api/v1/order-items/by-product/{product_id}" } });
  http.get(`${BASE}/api/v1/carts/by-user/1`, { tags: { endpoint: "/api/v1/carts/by-user/{user_id}" } });
  http.get(`${BASE}/api/v1/products/by-category/Electronics`, { tags: { endpoint: "/api/v1/products/by-category/{category}" } });
}
