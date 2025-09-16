const { type } = require("os");

const mongoose = require("../../common/init.mongo")();
const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["MOMO", "COD", "VNPAY"],
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
  },
  {}
);

const PaymentModel = mongoose.model("Payment", paymentSchema, "Payments");
module.exports = PaymentModel;
