const express = require("express");
const ReviewModel = require("../models/ReviewModel")
module.exports = {
  index: (req, res) => {
    ReviewModel.find({})
      .then((docs) => console.log(docs))
      .catch((err) => console.log(err));
  },
};