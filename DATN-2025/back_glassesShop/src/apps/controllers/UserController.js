const express = require("express");
const UserModel = require("../models/UserModel");

module.exports = {
  index: (req, res) => {
    UserModel.find({})
      .then((docs) => console.log(docs))
      .catch((err) => console.log(err));
  },
};
