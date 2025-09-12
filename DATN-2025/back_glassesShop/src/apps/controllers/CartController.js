const express = require("express");
const CartModel = require("../models/CartModel");

module.exports = {
  index: (req, res) => {
    CartModel.find({})
      .then((docs) => console.log(docs))
      .catch((err) => console.log(err));
  },
};