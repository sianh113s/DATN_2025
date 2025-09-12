const express = require("express");
const DiscountModel = require("../models/DiscountModel")
module.exports = {
  index: (req, res) => {
    DiscountModel.find({})
      .then((docs) => console.log(docs))
      .catch((err) => console.log(err));
  },
};