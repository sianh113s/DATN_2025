const { type } = require("os");

const mongoose = require("../../common/init.mongo")();
const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hex_code: {
      type: String,
      required: true,
    },
  },
  {}
);

const ColorModel = mongoose.model("Color", colorSchema, "Colors");
module.exports = ColorModel;
