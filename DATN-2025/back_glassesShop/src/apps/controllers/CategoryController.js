const express = require("express");
const CategoryModel = require("../models/CategotyModel");
const ProductModel = require("../models/ProductModel");
const pagination = require("../../../lib/pagination");

exports.index = async (req, res) => {
  try {
    const categories = await CategoryModel.find({})
      .sort({ _id: -1 });
    return res.status(200).json({
      status: "Success",
      data: categories,
    });
  }
  catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    return res.status(200).json({
      status: "Success",
      data: category,
    });
  }
  catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "Error",
        message: "Tên danh mục là bắt buộc",
      });
    }

    const category = new CategoryModel({
      name,
    });

    await category.save();

    return res.status(201).json({
      status: "Success",
      message: "Thêm danh mục thành công",
      data: category,
    });
  } catch (error) {
    console.error("Lỗi khi thêm category:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params; // lấy id từ URL
    const { name } = req.body;

    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(404).json({
        status: "Error",
        message: "Không tìm thấy danh mục",
      });
    }

    category.name = name || category.name;

    await category.save();

    return res.status(200).json({
      status: "Success",
      message: "Cập nhật danh mục thành công",
      data: category,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật category:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CategoryModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        status: "Error",
        message: "Không tìm thấy danh mục",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Xóa danh mục thành công",
      data: deleted,
    });
  } catch (error) {
    console.error("Lỗi khi xóa category:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


exports.categoryProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {};
    query.category_id = id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const skip = page * limit - limit;
    const products = await ProductModel.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      status: "Success",
      fillers: {
        page,
        limit,
        category_id: id,
      },
      data: {
        docs: products,
        pages: await pagination(page, limit, ProductModel, query),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};