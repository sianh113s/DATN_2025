const { type } = require("os");

const mongoose = require("../../common/init.mongo")();
const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["MOMO", "COD"],
      required: true,
    },
    transaction_id: {
      type: String,
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "failed", "success"],
      required: true,
    },
    payment_time: {
      type: Date,
      default: null
    }
  },
  {}
);

const PaymentModel = mongoose.model("Payment", paymentSchema, "Payments");
module.exports = PaymentModel;
