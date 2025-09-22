import Http from "./Http";
export const getProducts = (config) => Http.get("/product", config);
export const getCategory = (config) => Http.get("/category", config);
export const getCategoryProducts = (id, config) => Http.get(`/category/${id}/products`, config)