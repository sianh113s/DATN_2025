const express = require("express");
const DiscountModel = require("../models/DiscountModel")

exports.index = async (req, res) => {
  try {
    const discount = await DiscountModel.find();
    return res.status(200).json({
      status: "Success",
      data: discount,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// Tạo voucher mới
exports.createVoucher = async (req, res) => {
  try {
    const discount = new DiscountModel(req.body);
    await discount.save();
    res.status(201).json({ status: "Create Success", data: discount });
  } catch (error) {
    res.status(400).json({ status: "Create Failed", message: error.message });
  }
};

// Cập nhật voucher
exports.updateVoucher = async (req, res) => {
  try {
    const discount = await DiscountModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!discount) {
      return res.status(404).json({ success: false, message: "Voucher không tồn tại" });
    }
    res.status(200).json({ status: "Update Success", data: discount });
  } catch (error) {
    res.status(400).json({ status: "Update Failed", message: error.message });
  }
};

// Xóa voucher
exports.deleteVoucher = async (req, res) => {
  try {
    const discount = await DiscountModel.findByIdAndDelete(req.params.id);
    if (!discount) {
      return res.status(404).json({ status: "Voucher không tồn tại" });
    }
    res.status(200).json({ status: "Delete Success" });
  } catch (error) {
    res.status(500).json({ status: "Delete Failed", message: error.message });
  }
};