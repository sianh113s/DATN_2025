import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getImageProduct } from "../../../until";
import { Link } from "react-router-dom";
import { order, payment } from "../../../services/Api";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [user, setUser] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const navigate = useNavigate();

  // State cho form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const itemsCart = useSelector(({ cart }) => cart.items);
  const totalPrice = itemsCart.reduce(
    (total, item) => total + Number(item.quantity) * Number(item.price_vnd),
    0
  );

  useEffect(() => {
    // Lấy user từ localStorage
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        address: parsedUser.address || "",
      });
    }
  }, []);

  // Xử lý nhập dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const items = itemsCart.map((item) => ({
    product_id: item._id,
    product_name: item.product_name,
    quantity: item.quantity,
    price_vnd: item.price_vnd,
  }));

  const total_amount = totalPrice;

  const hanldePayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (paymentMethod === "momo") {
      order({
        user_id: user._id,
        email: formData.email,
        items,
        total_amount,
        payment_method: paymentMethod.toUpperCase(),
        shipping_address: formData.address,
      })
        .then(({ data }) => {
          setOrderInfo(data.data);
        })
        .catch((error) => console.log(error));
      payment({
        total: total_amount,
        order_id: orderInfo._id,
      })
        .then(({ data }) => {
          window.location.href = data.data.payUrl;

        })
        .catch((error) => console.log(error));
    } else {
      order({
        user_id: user._id,
        email: formData.email,
        items,
        total_amount,
        final_amount: total_amount, // thêm final_amount
        payment_method: paymentMethod.toUpperCase(),
        shipping_address: formData.address,
      })
        .then(({ data }) => {
          console.log(data);
          navigate("/order/history")
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4">Thanh toán</h3>
      <div className="row">
        {/* Form thông tin mua hàng */}
        <div className="col-md-7">
          <div className="mb-4">
            <h5>Thông tin mua hàng</h5>
            <div className="row g-3">
              <div className="col-md-12">
                Email:
                <input
                  readOnly
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                Họ tên:
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                Số điện thoại:
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Địa chỉ giao hàng */}
          <div className="mb-4">
            <h5>Địa chỉ giao hàng</h5>
            <div className="mb-3">
              <input
                type="text"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Phương thức thanh toán */}
          <div className="mb-4">
            <h5>Phương thức thanh toán</h5>
            <div className="form-check border rounded p-3 mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="cod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label ms-2" htmlFor="cod">
                Trả tiền mặt khi nhận hàng
              </label>
            </div>
            <div className="form-check border rounded p-3">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="momo"
                value="momo"
                checked={paymentMethod === "momo"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label ms-2" htmlFor="momo">
                Thanh toán qua MoMo
              </label>
            </div>
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Đơn hàng của bạn</h5>
              {itemsCart.map((item, index) => (
                <div key={index} className="d-flex mb-3">
                  <img
                    src={getImageProduct(item.image)}
                    alt="product"
                    className="me-3"
                    width={100}
                  />
                  <div>
                    <p className="mb-1 fw-bold">{item.product_name}</p>
                    <p className="mb-1">Số lượng: {item.quantity}</p>
                    <p className="text-clack fw-bold">
                      Giá: {item.price_vnd.toLocaleString()} đ
                    </p>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Tổng</span>
                <span>{totalPrice.toLocaleString()} đ</span>
              </div>
              <div className="d-flex justify-content-between">
                <Link to="/cart" className="btn btn-outline-secondary">
                  Xem giỏ hàng
                </Link>
                <button onClick={hanldePayment} className="btn btn-danger">
                  {paymentMethod === "momo" ? "Thanh toán MoMo" : "Mua hàng"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
