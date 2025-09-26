const OrderModel = require("../models/OrderModel")
const UserModel = require("../models/UserModel")
const transporter = require("../../../lib/transporter");
const ejs = require("ejs");

exports.index = async (req, res) => {
  try {
    const { id } = req.params; // id = user_id

    // tìm tất cả đơn hàng của user
    const orders = await OrderModel.find({ user_id: id }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không có đơn hàng nào",
      });
    }

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.order = async (req, res) => {
  try {
    const { body } = req;

    // insert to db
    const order = new OrderModel(body);
    await order.save();
    const { items } = order;
    const products = items.map(item => ({
      name: item.product_name,
      qty: item.quantity,
      price: item.price_vnd,
      image: item.image,
      total: item.quantity * item.price_vnd,
    }));
    const html = await ejs.renderFile(`${__dirname}/../views/mail.ejs`, { order, products });

    // find user email
    const user = await UserModel.findById(body.user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // send email
    (async () => {
      const info = await transporter.sendMail({
        from: '"Sungla Glasses Shop" <sianh113s@gmail.com>',
        to: user.email,
        subject: "Xác nhận đơn hàng",
        html,
      });

    })();
    return res.status(200).json({
      status: "Success",
      data: order,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};