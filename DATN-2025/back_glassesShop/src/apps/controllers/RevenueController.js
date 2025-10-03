const express = require("express");
const OrderModel = require("../models/OrderModel")

exports.index = async (req, res) => {
  try {
    const now = new Date();
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    const revenues = await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
          payment_status: "paid",
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$total_amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);
    const label = [];
    const revenue = [];
    // tạo mảng 6 tháng gần nhất và gán doanh thu nếu có
    const data = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      const r = revenues.find(
        (x) => x._id.year === d.getFullYear() && x._id.month === d.getMonth() + 1
      );
      label.push(`${d.getMonth() + 1}/${d.getFullYear()}`);
      revenue.push(r ? r.totalRevenue : 0);
    });

    res.json({
      status: "success",
      data: {
        revenue,
        label
      }
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
