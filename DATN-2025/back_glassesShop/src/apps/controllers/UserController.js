const express = require("express");
const UserModel = require("../models/UserModel");

exports.index = async (req, res) => {
  try {
    const users = await UserModel.find(); // Lấy tất cả user
    res.status(200).json({
      status: "Success",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "Failed",
      message: "Server Error",
    });
  }
};
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

exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ status: "Delete Failed", message: "User không tồn tại" });
    }
    res.status(200).json({ status: "Delete Success" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ status: "Delete Failed", message: error.message });
  }
};