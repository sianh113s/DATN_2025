const express = require("express");
const ProductModel = require("../models/ProductModel");
const pagination = require("../../../lib/pagination");
const ReviewModel = require("../models/ReviewModel");
const fs = require("fs");
const path = require("path");
// const { has } = require("config");
// const e = require("express");
exports.index = async (req, res) => {
  try {
    // ProductModel.find({})
    //   .then((docs) => console.log(docs))
    //   .catch((err) => console.log(err));
    const query = {};
    const limit = Number(req.query.limit) || 9;
    const page = Number(req.query.page) || 1;
    const skip = page * limit - limit;
    if (req.query.in_stock) query.in_stock = req.query.in_stock;
    if (req.query.name) query.$text = { $search: req.query.name };
    const products = await ProductModel.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
    res.status(200).json({
      status: "Success",
      fillters: {
        in_stock: req.query.in_stock ? req.query.in_stock : null,
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
// Chi tiet san pham 
exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    return res.status(200).json({
      status: "Success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Lay danh gia san pham
exports.reviews = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {};
    query.product_id = id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const skip = page * limit - limit;
    const reviews = await ReviewModel.find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user_id", "name");
    const listReview = reviews.map(
      r => ({
        name: r.user_id?.name || "Ẩn danh",
        comment: r.comment,
        createdAt: r.createdAt
      })
    )
    return res.status(200).json({
      status: "Success",
      filters: {
        page,
        limit,
        product_id: id,
      },
      data: {
        docs: listReview,
        pages: await pagination(page, limit, ReviewModel, query),
      }
    })
  }
  catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.storeReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const review = req.body;
    review.product_id = id;
    await new ReviewModel(review).save();
    return res.status(201).json({
      status: "Success",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Tao moi san pham
exports.createProduct = async (req, res) => {
  try {
    const {
      type,
      name,
      material,
      description,
      price_vnd,
      stock_quantity,
      category_id,
    } = req.body;

    // Nếu có upload file thì lấy đường dẫn ảnh
    const imagePath = req.file.filename || "";

    const newProduct = new ProductModel({
      type,
      name,
      material,
      description,
      price_vnd,
      stock_quantity,
      in_stock: stock_quantity > 0,
      images: imagePath,
      category_id,
    });

    await newProduct.save();

    return res.status(201).json({
      status: "Success",
      data: newProduct,
    });
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Cap nhat san pham
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Nếu có upload file mới
    if (req.file) {
      const dir = path.join(__dirname, "../../public/uploads/images/products");

      // Tạo thư mục nếu chưa có
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Lưu đường dẫn ảnh mới
      updateData.images = `/uploads/images/products/${req.file.filename}`;
    }

    // Nếu có truyền stock_quantity thì tự động set in_stock
    if (updateData.stock_quantity !== undefined) {
      updateData.in_stock = updateData.stock_quantity > 0;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ status: "Error", message: "Không tìm thấy sản phẩm" });
    }

    return res.status(200).json({ status: "Success", data: updatedProduct });
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Xoá sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        status: "Error",
        message: "Không tìm thấy sản phẩm",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Sản phẩm đã được xoá thành công",
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
