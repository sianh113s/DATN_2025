const express = require("express");
const router = express.Router();
const config = require("config");

// Import controllers

const CategoryController = require("../apps/controllers/CategoryController");
const ProductController = require("../apps/controllers/ProductController");
const OrderController = require("../apps/controllers/OrderController");
const AuthController = require("../apps/controllers/AuthController");
const UserController = require("../apps/controllers/UserController");
// Import middlewares
const AuthMiddleware = require("../apps/middlewares/auth");

// Routers
router.get(`${config.get('app.prefixApiVerSion')}/category`, CategoryController.index);
router.get(`${config.get('app.prefixApiVerSion')}/category/:id`, CategoryController.show);
router.get(`${config.get('app.prefixApiVerSion')}/category/:id/products`, CategoryController.categoryProducts);


router.get(`${config.get('app.prefixApiVerSion')}/product`, ProductController.index);
router.get(`${config.get('app.prefixApiVerSion')}/product/:id`, ProductController.show);
router.get(`${config.get('app.prefixApiVerSion')}/product/:id/reviews`, ProductController.reviews);
router.post(`${config.get('app.prefixApiVerSion')}/product/:id/reviews`, ProductController.storeReviews);

router.post(`${config.get('app.prefixApiVerSion')}/order`, OrderController.order);

router.post(`${config.get('app.prefixApiVerSion')}/user/logout`,
  AuthMiddleware.verifyAuthenticationCustomer,
  AuthController.logoutUser);
router.post(`${config.get('app.prefixApiVerSion')}/user/login`, AuthController.loginUser);
router.post(`${config.get('app.prefixApiVerSion')}/user/:id/update`, UserController.update);
router.post(`${config.get('app.prefixApiVerSion')}/user/register`, AuthController.registerUser);
router.post(`${config.get('app.prefixApiVerSion')}/auth/refresh-token`, AuthController.refreshToken);
router.get(`${config.get('app.prefixApiVerSion')}/user/logintest`,
  AuthMiddleware.verifyAuthenticationCustomer,
  (req, res) => {
    return res.status(200).json({ message: "Authentication Success" });
  }
);

router.get("/", (req, res) => {
  res.send("<p>Home</p>");
});

router.get("/admin/login", (req, res) => {
  res.send("<p>admin/login</p>");
});
router.get("/admin/logout", (req, res) => {
  res.send("<p>admin/logout</p>");
});
router.get("/admin/dashboard", (req, res) => {
  res.send("<p>/admin/dashboard</p>");
});
router.get("/admin/product", (req, res) => {
  res.send("<p>admin/product</p>");
});
router.get("/admin/product/create", (req, res) => {
  res.send("<p>admin/product/create</p>");
});
router.get("/admin/product/edit/:id", (req, res) => {
  res.send("<p>admin/product/edit/:id</p>");
});
router.get("/admin/product/delete/:id", (req, res) => {
  res.send("<p>admin/product/delete/:id</p>");
});

module.exports = router;
