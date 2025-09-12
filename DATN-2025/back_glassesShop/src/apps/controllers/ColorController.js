const express = require("express");
const ColorModel = require("../models/ColorModel")
module.exports = {
  index: (req, res) => {
    ColorModel.find({})
      .then((docs) => console.log(docs))
      .catch((err) => console.log(err));
  },
};