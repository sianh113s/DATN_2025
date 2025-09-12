const express = require("express");
const PaymentModel = require("../models/PaymentModel")
module.exports = {
  index: (req, res) => {
    PaymentModel.find({})
      .then((docs) => console.log(docs))
      .catch((err) => console.log(err));
  },
};