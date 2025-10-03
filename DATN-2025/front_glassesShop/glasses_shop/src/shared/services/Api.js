import Http from "./Http";
export const getProducts = (config) => Http.get("/product", config);
export const getCategory = (config) => Http.get("/category", config);
export const getCategoryProducts = (id, config) => Http.get(`/category/${id}/products`, config);
export const getProduct = (id, config) => Http.get(`/product/${id}`, config);
export const getProductReviews = (id, config) => Http.get(`/product/${id}/reviews`, config);
export const getUser = (config) => Http.get("/user", config);
export const deleteUser = (id, config) => Http.delete(`user/delete/${id}`, config);
export const createReview = (id, data) => Http.post(`/product/${id}/reviews`, data);
export const loginUser = (data) => Http.post(`/user/login`, data);
export const registerUser = (data) => Http.post(`/user/register`, data);
export const profileUser = (id) => Http.get(`/user/${id}`);
export const getOrdersByUserId = (id, config) => Http.get(`/order/${id}`, config);
export const order = (data) => Http.post(`/order`, data);
export const getOrder = (data) => Http.get(`/order`, data);
export const payment = (data) => Http.post(`/payment`, data);
export const updateOrder = (id, data) => Http.put(`/order/update/${id}`, data);
export const createCategory = (data) => Http.post(`/category/create`, data);
export const updateCategory = (id, data) => Http.put(`/category/update/${id}`, data);
export const deleteCategory = (id) => Http.delete(`/category/delete/${id}`);
export const createProduct = (data) =>
  Http.post(`/product/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateProduct = (id, data) => Http.put(`/product/update/${id}`, data);
export const deleteProduct = (id) => Http.delete(`/product/delete/${id}`);
export const getOrderById = (id) => Http.get(`/order/${id}`);
export const updateUser = (id, data) => Http.post(`/user/${id}/update`, data) 