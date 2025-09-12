const express = require("express");
const ProductModel = require("../models/ProductModel");
const pagination = require("../../../lib/pagination");
const ReviewModel = require("../models/ReviewModel");
const { has } = require("config");
const e = require("express");
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
          in_stock: req.query.in_stock? req.query.in_stock : null,
         },
         data: {
            docs:products,
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
        .limit(limit);
        return res.status(200).json({
          status: "Success",
          filters:{
            page,
            limit,
            product_id: id,
          },
          data: {
            docs: reviews,
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