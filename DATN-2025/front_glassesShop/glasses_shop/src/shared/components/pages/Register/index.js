import { registerUser } from "../../../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmitRegister = async (e) => {
    e.preventDefault(); // chặn reload trang
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await registerUser(data);

      if (res.data.status === "success") {
        alert("Đăng ký thành công! Hãy đăng nhập để tiếp tục.");
        navigate("/login"); // chuyển hướng đến trang đăng nhập
      } else {
        setError("Đăng ký thất bại, vui lòng thử lại!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Có lỗi xảy ra!");
    }
  };

  return (
    <div style={{ backgroundColor: "#e5e5e5", minHeight: "100vh" }}>
      <div
        className="login-container bg-white p-4 mt-5 rounded shadow"
        style={{ maxWidth: "560px", margin: "0 auto" }}
      >
        <h4 className="text-center mb-2">Đăng ký</h4>
        <p className="text-center text-muted">
          Hãy đăng ký để được hưởng nhiều đặc quyền riêng dành cho bạn
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmitRegister}>
          <div className="mb-3">
            <label className="form-label">
              HỌ TÊN <span className="text-danger">*</span>
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Nhập họ tên"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              SỐ ĐIỆN THOẠI <span className="text-danger">*</span>
            </label>
            <input
              name="phone"
              type="text"
              className="form-control"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              ĐỊA CHỈ <span className="text-danger">*</span>
            </label>
            <input
              name="address"
              type="text"
              className="form-control"
              placeholder="Nhập địa chỉ"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              EMAIL <span className="text-danger">*</span>
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Nhập email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              MẬT KHẨU <span className="text-danger">*</span>
            </label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-dark">
              Đăng ký ngay
            </button>
          </div>
          <div className="text-center mt-2">
            <span>Bạn đã có tài khoản? </span>
            <Link to="/Login" className="fw-bold text-decoration-none">
              Đăng nhập ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
