const express = require("express");
const UserModel = require("../models/UserModel");
const pagination = require("../../../lib/pagination");
exports.index = async (req, res) => {
  try {
    const query = {};
    const limit = Number(req.query.limit) || 9;
    const page = Number(req.query.page) || 1;
    const skip = page * limit - limit;
    const users = await UserModel.find(query) // Lấy tất cả user
      .skip(skip)
    // .limit(limit)
    res.status(200).json({
      status: "Success",
      data: {
        docs: users,
        pages: await pagination(page, limit, UserModel, query),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "Failed",
      message: "Server Error",
    });
  }
};
exports.profile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id).select("-password");
    // loại bỏ password khi trả về

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
}
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