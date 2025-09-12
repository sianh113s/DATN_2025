const { type } = require("os");

const mongoose = require("../../common/init.mongo")();
const discountSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    discount_value: {
      type: Number,
      required: true,
    },
    min_order_value: {
      type: Number,
      required: true,
    },
    usage_limit: {
      type: Number,
      required: true,
    },
    used_count: {
      type: Number,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const DiscountModel = mongoose.model("Discount", discountSchema, "Discounts");
module.exports = DiscountModel;
