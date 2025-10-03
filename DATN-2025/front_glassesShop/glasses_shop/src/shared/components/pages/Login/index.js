import { useState } from "react";
import { loginUser } from "../../../services/Api";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await loginUser({ email, password });

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userData", JSON.stringify(data.userData));

        // 🚀 reload lại trang để Header lấy user mới từ localStorage
        if (data.userData.role == "admin") {
          navigate("/admin/DashBoard");
        } else {
          navigate("/");
        }
        window.location.reload();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <div
        className="login-container bg-white p-4 mt-5 rounded shadow"
        style={{ maxWidth: "560px", margin: "0 auto" }}
      >
        <h4 className="text-center mb-2">Đăng nhập</h4>
        <p className="text-center text-muted">
          Hãy đăng nhập để được hưởng đặc quyền riêng dành cho bạn
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              EMAIL <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              MẬT KHẨU <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-dark">
              Đăng nhập
            </button>
          </div>

          <div className="text-center">
            <a href="#" className="text-decoration-none">
              Quên mật khẩu?
            </a>
          </div>

          <div className="text-center mt-2">
            <span>Bạn chưa có tài khoản? </span>
            <Link to="/Register" className="fw-bold text-decoration-none">
              Đăng ký ngay
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
