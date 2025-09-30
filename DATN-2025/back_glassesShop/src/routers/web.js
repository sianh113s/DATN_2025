const express = require("express");
const router = express.Router();
const config = require("config");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "src/public/uploads/images/products";
    fs.mkdirSync(dir, { recursive: true }); // tạo folder nếu chưa có
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Import controllers
const CategoryController = require("../apps/controllers/CategoryController");
const ProductController = require("../apps/controllers/ProductController");
const OrderController = require("../apps/controllers/OrderController");
const AuthController = require("../apps/controllers/AuthController");
const UserController = require("../apps/controllers/UserController");
const DiscountController = require("../apps/controllers/DiscountController");
const PaymentController = require("../apps/controllers/PaymentController");

// Import middlewares
const AuthMiddleware = require("../apps/middlewares/auth");
const UserModel = require("../apps/models/UserModel");

// Routers
router.get(`${config.get("app.prefixApiVerSion")}/category`, CategoryController.index);
router.get(`${config.get("app.prefixApiVerSion")}/category/:id`, CategoryController.show);
router.get(`${config.get("app.prefixApiVerSion")}/category/:id/products`, CategoryController.categoryProducts);

router.get(`${config.get("app.prefixApiVerSion")}/product`, ProductController.index);
router.get(`${config.get("app.prefixApiVerSion")}/product/:id`, ProductController.show);
router.get(`${config.get("app.prefixApiVerSion")}/product/:id/reviews`, ProductController.reviews);
router.post(`${config.get("app.prefixApiVerSion")}/product/:id/reviews`, ProductController.storeReviews);

router.post(`${config.get("app.prefixApiVerSion")}/order`, OrderController.order);
router.get(`${config.get("app.prefixApiVerSion")}/order/:id`, OrderController.index);
router.get(`${config.get("app.prefixApiVerSion")}/order`, OrderController.show);
router.put(`${config.get("app.prefixApiVerSion")}/order/update/:id`, OrderController.updateOrder);

router.get(`${config.get("app.prefixApiVerSion")}/user`, UserController.index);
router.get(`${config.get("app.prefixApiVerSion")}/user/:id`, UserController.profile);

router.post(
  `${config.get("app.prefixApiVerSion")}/user/logout`,
  AuthMiddleware.verifyAuthenticationCustomer,
  AuthController.logoutUser
);
router.post(`${config.get("app.prefixApiVerSion")}/user/login`, AuthController.loginUser);
router.post(`${config.get("app.prefixApiVerSion")}/user/:id/update`, UserController.update);
router.post(`${config.get("app.prefixApiVerSion")}/user/register`, AuthController.registerUser);
router.post(`${config.get("app.prefixApiVerSion")}/auth/refresh-token`, AuthController.refreshToken);
router.get(
  `${config.get("app.prefixApiVerSion")}/user/logintest`,
  AuthMiddleware.verifyAuthenticationCustomer,
  (req, res) => {
    return res.status(200).json({ message: "Authentication Success" });
  }
);

// ================== Admin Product Management ==================
router.post(
  `${config.get("app.prefixApiVerSion")}/product/create`,
  upload.single("images"),   // xử lý upload file
  ProductController.createProduct
);

router.put(
  `${config.get("app.prefixApiVerSion")}/product/update/:id`,
  upload.single("images"),
  ProductController.updateProduct
);

router.delete(
  `${config.get("app.prefixApiVerSion")}/product/delete/:id`,
  ProductController.deleteProduct
);

// ================== Admin Discount Management ==================
router.get(`${config.get("app.prefixApiVerSion")}/discount`, DiscountController.index);
router.post(`${config.get("app.prefixApiVerSion")}/admin/discount/create`, DiscountController.createVoucher);
router.put(`${config.get("app.prefixApiVerSion")}/admin/discount/update/:id`, DiscountController.updateVoucher);
router.delete(`${config.get("app.prefixApiVerSion")}/admin/discount/delete/:id`, DiscountController.deleteVoucher);

// ================== Admin User Management ==================
router.delete(`${config.get("app.prefixApiVerSion")}/user/delete/:id`, UserController.deleteUser);
router.post(`${config.get("app.prefixApiVerSion")}/payment`, PaymentController.index);
router.get(`${config.get("app.prefixApiVerSion")}/payment`, PaymentController.paymentResult);

// ================== Admin Category Management ==================
router.post(`${config.get("app.prefixApiVerSion")}/category/create`, CategoryController.addCategory);
router.put(`${config.get("app.prefixApiVerSion")}/category/update/:id`, CategoryController.updateCategory);
router.delete(`${config.get("app.prefixApiVerSion")}/category/delete/:id`, CategoryController.deleteCategory);

module.exports = router;
