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