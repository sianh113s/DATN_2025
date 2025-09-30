import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategory, getOrdersByUserId } from "../../services/Api";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("userData"));


  const [keyword, setKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const totalCartItems = useSelector(({ cart }) => cart.items.reduce((total, item) => total + item.quantity, 0))
  const infoCart = useSelector(({ cart }) => cart.items)

  // Load categories và user
  useEffect(() => {
    // Gọi API category
    getCategory()
      .then(({ data }) => setCategories(data.data))
      .catch((error) => console.log(error));
    // Kiểm tra user trong localStorage
    const userData = localStorage.getItem("userData");
    if (userData) setUser(JSON.parse(userData));
  }, []);



  // Listen localStorage thay đổi user (login/logout ở tab khác)
  useEffect(() => {
    const handleStorageChange = () => {
      const userData = localStorage.getItem("user");
      setUser(userData ? JSON.parse(userData) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleKeywordChange = (e) => setKeyword(e.target.value);
  const handleSubmitSearch = () => navigate(`Search?keyword=${keyword}`);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  const HandleCart = () => {
    return navigate(`/orders/${id}`)
  }
  const clickMoveToCart = () => {
    return navigate(`/cart`);
  }
  const totalPrice = infoCart.reduce((total, item) => total + Number(item.quantity) * Number(item.price_vnd), 0);
  return (
    <>
      {/* Cart */}
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        tabIndex={-1}
        id="offcanvasCart"
        aria-labelledby="My Cart"
      >
        <div className="offcanvas-header justify-content-center">
          <button onClick={HandleCart} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <div className="order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-4">
              <span className="text-primary">Giỏ hàng</span>
              <span className="badge bg-primary rounded-circle pt-2">{totalCartItems}</span>
            </h4>
            <ul className="list-group mb-4">
              {
                infoCart.map((item, index) =>
                  <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                    <div>
                      <h6 className="my-0">{item.product_name}</h6>
                      <small className="text-body-secondary">Số lượng: {item.quantity}</small>
                    </div>
                    <span className="text-body-secondary">{(item.quantity * item.price_vnd).toLocaleString()}đ</span>
                  </li>
                )
              }

              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Tổng tiền (VND)</span>
                <strong>{totalPrice.toLocaleString()}đ</strong>
              </li>
            </ul>
            <button onClick={clickMoveToCart} className="w-100 btn btn-dark mb-2" type="submit">
              Giỏ Hàng
            </button>
            <button onClick={() => navigate(`/History/${userData._id}`)} className="w-100 btn btn-dark" style={{ width: "80%" }} >
              Lịch sử mua hàng
            </button>
          </div>
        </div>
      </div>
      {/* End Cart */}

      {/* Search */}
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        tabIndex={-1}
        id="offcanvasSearch"
        aria-labelledby="Search"
      >
        <div className="offcanvas-header justify-content-center">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <div className="order-md-last">
            <h4 className="text-primary text-uppercase mb-3">Search</h4>
            <div className="search-bar border rounded-2 border-dark-subtle">
              <form
                id="search-form"
                className="text-center d-flex align-items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmitSearch();
                }}
              >
                <input
                  type="text"
                  className="form-control border-0 bg-transparent"
                  placeholder="Search Here"
                  value={keyword}
                  onChange={handleKeywordChange}
                />
                <button type="submit" className="btn p-0 ms-3" style={{ background: "transparent", border: "none" }}>
                  <iconify-icon icon="tabler:search" className="fs-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Search */}

      {/* Menu */}
      <nav className="main-menu d-flex navbar fixed-top navbar-expand-lg py-4">
        <div className="container-fluid px-md-5">
          <div className="main-logo d-lg-none">
            <Link to="/">
              <img src="images/logo.png" alt="logo" className="img-fluid" />
            </Link>
          </div>
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="offcanvas offcanvas-end bg-black" tabIndex={-1} id="offcanvasNavbar">
            <div className="offcanvas-header justify-content-center">
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body justify-content-between align-items-center">
              <div className="main-logo">
                <Link to="/">
                  <img src="images/logo.png" alt="logo" className="img-fluid" />
                </Link>
              </div>
              <ul className="navbar-nav menu-list list-unstyled d-flex gap-md-3 ps-lg-5 mb-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link mx-2 active">
                    Trang chủ
                  </Link>
                </li>
                {categories.map((category) => (
                  <li className="nav-item" key={category._id}>
                    <NavLink
                      to={`/Category/${category._id}`}
                      className={({ isActive }) =>
                        `nav-link mx-2 ${isActive ? "active text-decoration-underline" : ""}`
                      }
                    >
                      {category.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Right icons */}
              <div className="d-none d-lg-flex justify-content-end">
                <ul className="d-flex justify-content-end list-unstyled m-0">
                  {user ? (
                    <>
                      <li className="lh-1">
                        <Link to={`/Profile/${user._id}`} className="mx-3">
                          <iconify-icon icon="healthicons:person" className="fs-4 text-light" />
                        </Link>
                      </li>
                      <li className="lh-1">
                        <button onClick={handleLogout} className="btn p-0 mx-3 border-0 bg-transparent">
                          <iconify-icon icon="material-symbols:logout" className="fs-4 text-light" />
                        </button>
                      </li>
                    </>
                  ) : (
                    <li className="lh-1">
                      <Link to="/login" className="mx-3">
                        <iconify-icon icon="healthicons:person" className="fs-4 text-light" />
                      </Link>
                    </li>
                  )}
                  <li className="lh-1">
                    <a href="#" className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                      <iconify-icon icon="mdi:cart" className="fs-4 text-light position-relative" />
                      <span className="position-absolute translate-middle badge rounded-circle text-black bg-light p-1">{totalCartItems}</span>
                    </a>
                  </li>
                  <li className="lh-1">
                    <a href="#" className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch" aria-controls="offcanvasSearch">
                      <iconify-icon icon="tabler:search" className="fs-4 text-light" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* End Menu */}
    </>
  );
};

export default Header;
