const express = require("express");
const router = express.Router();
const config = require("config");

// Import controllers
const UserController = require("../apps/controllers/UserController");
const CartController = require("../apps/controllers/CartController");
const CategoryController = require("../apps/controllers/CategoryController");
const ColorController = require("../apps/controllers/ColorController");
const DiscountController = require("../apps/controllers/DiscountController");
const ProductController = require("../apps/controllers/ProductController");
const OrderController = require("../apps/controllers/OrderController");
const PaymentController = require("../apps/controllers/PaymentController");
const ReviewController = require("../apps/controllers/ReviewController");

// Routers
router.get(`${config.get('app.prefixApiVerSion')}/user`, UserController.index);
router.get(`${config.get('app.prefixApiVerSion')}/cart`, CartController.index);
router.get(`${config.get('app.prefixApiVerSion')}/category`, CategoryController.index);
router.get(`${config.get('app.prefixApiVerSion')}/category/:id`, CategoryController.show);
router.get(`${config.get('app.prefixApiVerSion')}/category/:id/products`, CategoryController.categoryProducts);

router.get(`${config.get('app.prefixApiVerSion')}/color`, ColorController.index);
router.get(`${config.get('app.prefixApiVerSion')}/discount`, DiscountController.index);
// router.get(`${config.get('app.prefixApiVerSion')}/order`, DiscountController.index);

router.get(`${config.get('app.prefixApiVerSion')}/product`, ProductController.index);
router.get(`${config.get('app.prefixApiVerSion')}/product/:id`, ProductController.show);
router.get(`${config.get('app.prefixApiVerSion')}/product/:id/reviews`, ProductController.reviews);
router.post(`${config.get('app.prefixApiVerSion')}/product/:id/reviews`, ProductController.storeReviews);

router.post(`${config.get('app.prefixApiVerSion')}/order`, OrderController.order);
router.get(`${config.get('app.prefixApiVerSion')}/payment`, PaymentController.index);
router.get(`${config.get('app.prefixApiVerSion')}/review`, ReviewController.index);


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
