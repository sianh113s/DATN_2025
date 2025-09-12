const mongoose = require("../../common/init.mongo")();

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    items: {
      type: [
        {
          product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true,
          },
          name: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
          color: { type: String, required: true },
          size: { type: String, required: true },
          image: { type: String, required: true },
          subtotal: { type: Number, required: true },
        },
      ],
      default: [], // mặc định giỏ hàng rỗng
    },
    total_quantity: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ordered", "active", "cancelled"],
      required: true,
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", cartSchema, "Cart");
module.exports = CartModel;
