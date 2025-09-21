import Http from "./Http";
export const getProducts = (config) => Http.get("/product", config);