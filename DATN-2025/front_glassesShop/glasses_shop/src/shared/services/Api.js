import Http from "./Http";
export const getProducts = (config) => Http.get("/product", config);
export const getCategory = (config) => Http.get("/category", config);
export const getCategoryProducts = (id, config) => Http.get(`/category/${id}/products`, config);
export const getProduct = (id, config) => Http.get(`/product/${id}`, config);
export const getProductReviews = (id, config) => Http.get(`/product/${id}/reviews`, config);
export const getUser = (config) => Http.get("/user", config);
export const createReview = (id, data) => Http.post(`/product/${id}/reviews`, data);