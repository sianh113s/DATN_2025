const { type } = require("os");

const mongoose = require("../../common/init.mongo")();
const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        product_name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price_vnd: {
          type: Number,
          required: true,
        },
      },
    ],
    total_amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    payment_method: {
      type: String,
      enum: ["MOMO", "COD", "VNPAY"],
    },
    payment_status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    shipping_address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema, "Orders");
module.exports = OrderModel;
