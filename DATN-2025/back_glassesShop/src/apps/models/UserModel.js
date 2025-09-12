const { type } = require("os");

const mongoose = require("../../common/init.mongo")();
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema, "Users");
module.exports = UserModel;
