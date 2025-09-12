const { type } = require("os");

const mongoose = require("../../common/init.mongo")();
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {}
);

const CategoryModel = mongoose.model("Category", categorySchema, "Categories");
module.exports = CategoryModel;
