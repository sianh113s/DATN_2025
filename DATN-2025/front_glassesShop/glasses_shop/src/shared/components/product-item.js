import { getImageProduct } from "../until/index"
import { Link } from "react-router-dom";
const ProductItem = ({ item }) => {
  return (
    <>
      <div className="col-md-6 col-lg-3 my-4">
        <div className="product-item">
          <div className="image-holder" style={{ width: '100%', height: '100%' }}>
            <img src={getImageProduct(item.images)} alt="Books" className="product-image img-fluid" />
          </div>
          <div className="cart-concern w-50">
            <div className="cart-button d-flex justify-content-between align-items-center">
              <Link to="/Cart" className="btn-wrap cart-link d-flex align-items-center text-capitalize fs-6 ">
                <i className="icon icon-shopping-cart" />
              </Link>
              <Link to={`/ProductDetail-${item._id}`} className="view-btn mt-1">
                <i className="icon icon-screen-full" />
              </Link>
            </div>
          </div>
          <div className="product-detail mt-2">
            <h5 className="product-title mb-1">
              <a href="single-product.html">{item.name}</a>
            </h5>
            <p className="fs-5 fw-normal mb-0">{item.price_vnd.toLocaleString("vi-VN")} ₫</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductItem;