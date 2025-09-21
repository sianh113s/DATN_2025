import Header from "./shared/components/layout/Header";
import Slider from "./shared/components/layout/Slider";

const App = () => {
  return (
    <>
      <div>
        <div className="preloader-wrapper">
          <div className="preloader">
          </div>
        </div>
        {/* Header */}
        <Header />
        {/* End Header   */}
        {/* Slider */}
        <Slider />
        {/* End Slider */}
        {/* Main */}
        {/* Sản phẩm bán chạy */}
        <section id="new-arrival" className="product-store">
          <div className="container-fluid px-3 px-md-5 padding-medium">
            <h2 className="display-5 fw-light text-uppercase text-center">New Arrivals</h2>
            <p className="text-center mb-4">Browse our brand new collections</p>
            <div className="row">
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="image-holder" style={{ width: '100%', height: '100%' }}>
                    <img src="images/item15.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="z-1 position-absolute rounded-3 m-3 px-3 py-0 fs-6 bg-light text-dark">
                  New
                </div>
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item14.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item6.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="z-1 position-absolute rounded-3 m-3 px-3 bg-light text-dark">
                  Sale
                </div>
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item13.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item1.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item5.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="z-1 position-absolute rounded-3 m-3 px-3 bg-light text-dark">
                    Hết hàng
                  </div>
                  <div className="image-holder">
                    <img src="images/item12.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item16.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5 pt-4">
              <button type="submit" className="btn btn-dark rounded-3">View All Products</button>
            </div>
          </div>
        </section>
        {/* End Sản phẩm bán chạy */}
        {/* Phụ kiện */}
        <section id="best-seller" className="product-store">
          <div className="container-fluid px-3 px-md-5 padding-medium">
            <h2 className="display-5 fw-light text-uppercase text-center">Best Sellers</h2>
            <p className="text-center mb-4">Elevate your daily looks with our best sellers</p>
            <div className="row">
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="image-holder" style={{ width: '100%', height: '100%' }}>
                    <img src="images/item2.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="z-1 position-absolute rounded-3 m-3 px-3 py-0 fs-6 bg-light text-dark">
                  New
                </div>
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item9.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item10.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="z-1 position-absolute rounded-3 m-3 px-3 bg-light text-dark">
                  Sale
                </div>
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item8.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item7.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item4.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="z-1 position-absolute rounded-3 m-3 px-3 bg-light text-dark">
                    Hết hàng
                  </div>
                  <div className="image-holder">
                    <img src="images/item11.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 my-4">
                <div className="product-item">
                  <div className="image-holder">
                    <img src="images/item3.jpg" alt="Books" className="product-image img-fluid" />
                  </div>
                  <div className="cart-concern">
                    <div className="cart-button d-flex justify-content-between align-items-center">
                      <a href="#" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">Thêm vào giỏ
                        hàng<i className="icon icon-arrow-io pe-1" />
                      </a>
                      <a href="single-product.html" className="view-btn mt-1">
                        <i className="icon icon-screen-full" />
                      </a>
                    </div>
                  </div>
                  <div className="product-detail d-flex justify-content-between align-items-center mt-2">
                    <h5 className="product-title mb-0">
                      <a href="single-product.html">Modern Eyewear</a>
                    </h5>
                    <p className="m-0 fs-5 fw-normal">$40.00</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5 pt-4">
              <button type="submit" className="btn btn-dark rounded-3">View All Products</button>
            </div>
          </div>
        </section>
        {/* End Phụ kiện */}
        {/* Cam kết */}
        <section id="service" className="bg-light padding-medium">
          <div className="container">
            <div className="row g-md-5 pt-4">
              <div className="col-md-3 my-3">
                <div className="card">
                  <div>
                    <iconify-icon className="service-icon text-black display-4" icon="ci:shopping-cart-02" />
                  </div>
                  <h4 className=" text-uppercase py-3 m-0">Giao hàng</h4>
                  <div className="card-text">
                    <p className="blog-paragraph fs-6">Giao hàng miễn phí với các đơn hàng tại nội thành Hà Nội.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3">
                <div className="card">
                  <div>
                    <iconify-icon className="service-icon text-black display-4" icon="tdesign:secured" />
                  </div>
                  <h4 className=" text-uppercase py-3 m-0">đổi trả</h4>
                  <div className="card-text">
                    <p className="blog-paragraph fs-6">Miễn phí đổi trả các đơn hàng nếu sản phẩm lỗi .</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3">
                <div className="card">
                  <div>
                    <iconify-icon className="service-icon text-black display-4" icon="la:award" />
                  </div>
                  <h4 className=" text-uppercase py-3 m-0">Chất lượng</h4>
                  <div className="card-text">
                    <p className="blog-paragraph fs-6">Đảm bảo chất lượng từng sản phẩm khi tới tay khách hàng.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 my-3">
                <div className="card">
                  <div>
                    <iconify-icon className="service-icon text-black display-4" icon="solar:dollar-outline" />
                  </div>
                  <h4 className=" text-uppercase py-3 m-0">Ưu đãi</h4>
                  <div className="card-text">
                    <p className="blog-paragraph fs-6">Săn voucher miễn phí tại các sự kiện của shop.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Cam kết */}
        {/* Footer */}
        <footer id="footer">
          <div className="container-fluid px-3 px-md-5  padding-medium">
            <div className="row mt-5">
              <div className="col-md-4">
                <div className="footer-menu">
                  <img src="images/logo-dark.png" alt="logo" />
                  <p className="mt-4">Find Your Perfect Pair Today At Eyewear</p>
                  <div className="social-links mt-4">
                    <ul className="d-flex list-unstyled gap-3">
                      <li className="social">
                        <a href="#">
                          <iconify-icon className="social-icon fs-4  me-4" icon="ri:facebook-fill" />
                        </a>
                      </li>
                      <li className="social">
                        <a href="#">
                          <iconify-icon className="social-icon fs-4  me-4" icon="ri:twitter-fill" />
                        </a>
                      </li>
                      <li className="social">
                        <a href="#">
                          <iconify-icon className="social-icon fs-4  me-4" icon="ri:pinterest-fill" />
                        </a>
                      </li>
                      <li className="social">
                        <a href="#">
                          <iconify-icon className="social-icon fs-4  me-4" icon="ri:instagram-fill" />
                        </a>
                      </li>
                      <li className="social">
                        <a href="#">
                          <iconify-icon className="social-icon fs-4  me-4" icon="ri:youtube-fill" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="footer-menu">
                  <h6 className="text-uppercase fw-bold  mb-4">Quick Links</h6>
                  <ul className="menu-list list-unstyled">
                    <li className="menu-item">
                      <a href="#" className="footer-link">Home</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">About us</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">Offer </a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">Services</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">Conatct Us</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <div className="footer-menu">
                  <h6 className="text-uppercase fw-bold  mb-4">About</h6>
                  <ul className="menu-list list-unstyled">
                    <li className="menu-item">
                      <a href="#" className="footer-link">How It Work</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">Our Packages</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">promotions</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">refer a friend</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <div className="footer-menu">
                  <h6 className="text-uppercase fw-bold  mb-4">Services</h6>
                  <ul className="menu-list list-unstyled">
                    <li className="menu-item">
                      <a href="#" className="footer-link">Payments</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">Shipping</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">Product returns </a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">FAQs</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">Checkout</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">other Issues</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2">
                <div className="footer-menu">
                  <h6 className="text-uppercase fw-bold  mb-4">Help Center</h6>
                  <ul className="menu-list list-unstyled">
                    <li className="menu-item">
                      <a href="#" className="footer-link">Payments</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">Shipping</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">Product returns </a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">FAQs</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">Checkout</a>
                    </li>
                    <li className="menu-item">
                      <a href="#" className="footer-link">other Issues</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* End Footer */}
      </div>

    </>
  );
};

export default App;
