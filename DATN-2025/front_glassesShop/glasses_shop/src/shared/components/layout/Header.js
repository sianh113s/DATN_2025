import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCategory } from "../../services/Api";
const Header = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("")
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategory()
      .then(({ data }) => setCategories(data.data))
      .catch((error) => console.log(error)
      )
  }, [])
  const handleKeywordChange = (e) => setKeyword(e.target.value)
  const handleSubmitSearch = () => navigate(`Search?keyword=${keyword}`)
  return (
    <>
      {/* Cart */}
      <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex={-1} id="offcanvasCart" aria-labelledby="My Cart">
        <div className="offcanvas-header justify-content-center">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <div className="order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-4">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-circle pt-2">3</span>
            </h4>
            <ul className="list-group mb-4">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Red Sunglasses</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$120</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Reading Glasses</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$80</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">Fashion Glasses</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$50</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="fw-bold">Total (USD)</span>
                <strong>$250</strong>
              </li>
            </ul>
            <button className="w-100 btn btn-dark" type="submit">Continue to checkout</button>
          </div>
        </div>
      </div>
      {/* End Cart */}
      {/* Search */}
      <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex={-1} id="offcanvasSearch" aria-labelledby="Search">
        <div className="offcanvas-header justify-content-center">
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <div className="order-md-last">
            <h4 className="text-primary text-uppercase mb-3">
              Search
            </h4>
            <div className="search-bar border rounded-2 border-dark-subtle">
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
                  <button
                    type="submit"
                    className="btn p-0 ms-3"
                    style={{ background: "transparent", border: "none" }}
                  >
                    <iconify-icon icon="tabler:search" className="fs-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Search */}
      {/* Menu */}
      <nav className="main-menu d-flex navbar fixed-top navbar-expand-lg py-4 ">
        <div className="container-fluid px-md-5">
          <div className="main-logo d-lg-none">
            <Link to="/">
              <img src="images/logo.png" alt="logo" className="img-fluid" />
            </Link>
          </div>
          <button className="navbar-toggler border-0 shadow-none " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="offcanvas offcanvas-end bg-black" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
                  <Link to="/" className="nav-link mx-2 active">Trang chủ</Link>
                </li>
                {categories.map(category => (
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

              <div className="d-none d-lg-flex justify-content-end">
                <ul className="d-flex justify-content-end list-unstyled m-0">
                  <li className="lh-1">
                    <a href="account.html" className="mx-3">
                      <iconify-icon icon="healthicons:person" className="fs-4 text-light" />
                    </a>
                  </li>
                  <li className="lh-1">
                    <a href="#" className="mx-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                      <iconify-icon icon="mdi:cart" className="fs-4 text-light position-relative" />
                      <span className="position-absolute translate-middle badge rounded-circle text-black bg-light p-1">
                        03
                      </span>
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
        <div className="container-fluid px-md-5 d-lg-none">
          <ul className="d-flex justify-content-end list-unstyled m-0 mt-4">
            <li className="lh-1">
              <a href="account.html" className="me-4">
                <iconify-icon icon="healthicons:person" className="fs-4 text-light" />
              </a>
            </li>
            <li className="lh-1">
              <a href="#" className="me-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
                <iconify-icon icon="mdi:cart" className="fs-4 text-light position-relative" />
                <span className="position-absolute translate-middle badge rounded-circle text-black bg-light p-1">
                  03
                </span>
              </a>
            </li>
            <li className="lh-1">
              <a href="#" className="me-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSearch" aria-controls="offcanvasSearch">
                <iconify-icon icon="tabler:search" className="fs-4 text-light" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* End Menu */}
    </>
  );
}

export default Header;