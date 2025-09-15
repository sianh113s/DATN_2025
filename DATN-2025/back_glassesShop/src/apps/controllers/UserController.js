const express = require("express");
const UserModel = require("../models/UserModel");

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const isPhone = await UserModel.findOne({
      phone: body.phone,
    });
    if (isPhone._id.toString() !== id) { return res.status(400).json({ message: "Phone already in use" }); }
    const user = {
      name: body.name,
      phone: body.phone,
      address: body.address,
    }
    await UserModel.updateOne({ _id: id }, { $set: user });
    return res.status(200).json({ message: "Update Success" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" })
  }
}
