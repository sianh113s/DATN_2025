const mongoose = require("../../common/init.mongo")();
const tokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },

}, { timestamps: true });
const TokenModel = mongoose.model("Tokens", tokenSchema, "tokens");
module.exports = TokenModel;