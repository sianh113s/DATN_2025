const { type } = require("os");

const mongoose = require("../../common/init.mongo")();
const reviewSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    rating: {
      type: Number,
      default: null,
    },
    comment: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Review", reviewSchema, "Reviews");
module.exports = ReviewModel;
