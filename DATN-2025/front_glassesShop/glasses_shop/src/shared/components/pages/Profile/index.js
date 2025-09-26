import React, { useEffect, useState } from "react";
import { profileUser } from "../../../services/Api";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await profileUser(id);
        // API trả về { success, data: { ... } }
        if (res.data.success) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error("Lỗi lấy profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thông tin cập nhật:", user);
    // TODO: Gọi API update profile ở đây
  };

  if (loading) {
    return <div className="container py-4 text-center">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container py-4" >
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3">Thông tin cá nhân</h4>
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                  <label className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={user.name || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={user.email || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={user.phone || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={user.address || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12 d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-save2 me-1"></i> Cập nhật
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
