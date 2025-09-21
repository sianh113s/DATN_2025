const Service = () => {
  return (
    <>
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
    </>
  )
}

export default Service;