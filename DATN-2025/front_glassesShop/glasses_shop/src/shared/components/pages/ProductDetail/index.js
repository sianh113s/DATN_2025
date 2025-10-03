import React, { useState, useEffect } from "react";
import { getProduct, getProductReviews, getUser, createReview } from "../../../services/Api";
import { useParams } from "react-router-dom";
import { getImageProduct } from "../../../until";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../redux_setup/reducer/cart";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [productDetail, setProductDetail] = useState({});
  const [productReviews, setProductReviews] = useState([]);
  const [inputComment, setInputComment] = useState({});
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeInputComment = (e) => {
    const { name, value } = e.target;
    return setInputComment({ ...inputComment, [name]: value })
  }
  // Lấy sản phẩm và reviews
  useEffect(() => {
    getProductReviews(id, { params: { limit: 3 } })
      .then(({ data }) => setProductReviews(data.data.docs))
      .catch((error) => console.log(error));

    getProduct(id, { params: { limit: 8 } })
      .then(({ data }) => setProductDetail(data.data))
      .catch((error) => console.log(error));
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [id]);



  // Tăng giảm số lượng
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  // Nhập số lượng
  const handleQtyChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setQuantity(val === "" ? "" : parseInt(val, 10));
    }
  };
  const handleQtyBlur = () => {
    if (quantity === "" || quantity <= 0) {
      setQuantity(1);
    }
  };
  const clickComment = () => {
    if (!user?._id) {
      alert("Bạn cần đăng nhập để bình luận");
      return;
    }
    const payload = {
      ...inputComment,
      user_id: user._id
    };
    createReview(id, payload)
      .then(({ data }) => {
        getProductReviews(id, { params: { limit: 3 } })
          .then(({ data }) => setProductReviews(data.data.docs))
          .catch((error) => console.log(error));

      })
      .catch((error) => console.log(error));
  }
  const clickAddToCart = (type) => {
    dispatch(addToCart({
      _id: id,
      product_name: productDetail.name,
      quantity: quantity,
      price_vnd: productDetail.price_vnd,
      image: productDetail.images,
    }))
    if (type === "buy-now") {
      return navigate("/Cart");
    }
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Product Detail */}
      <div className="container my-5">
        <div className="row">
          <div className="col-12 d-flex flex-column flex-md-row align-items-start">
            {/* Left - Product Image */}
            <div
              className="flex-fill d-flex justify-content-center align-items-center p-3"
              style={{
                minHeight: "400px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
              }}
            >
              <img
                src={getImageProduct(productDetail?.images)}
                alt={productDetail?.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Right - Product Info */}
            <div className="flex-fill p-3 d-flex flex-column justify-content-between">
              <div className="p-3">
                <h3>{productDetail?.name}</h3>
                <h3 className="fw-bold">
                  {productDetail.price_vnd?.toLocaleString() ?? "0"}₫
                </h3>
                <p>Material: {productDetail?.material}</p>

                {/* Quantity + Add to Cart */}
                <div className="d-flex align-items-center mb-3">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={decreaseQty}
                  >
                    –
                  </button>
                  <input
                    type="text"
                    className="form-control text-center mx-2"
                    style={{ width: "60px" }}
                    value={quantity}
                    onChange={handleQtyChange}
                    onBlur={handleQtyBlur}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={increaseQty}
                  >
                    +
                  </button>
                  <button onClick={clickAddToCart} className="btn btn-outline-dark ms-3 p-3">
                    Thêm vào giỏ hàng
                  </button>
                </div>

                {/* Buy Now */}
                <div className="d-grid mb-3">
                  <button onClick={() => clickAddToCart("buy-now")} className="btn btn-dark">Mua ngay</button>
                </div>

                {/* Description */}
                <textarea
                  onChange={changeInputComment}
                  className="form-control"
                  rows="3"
                  placeholder={productDetail?.description}
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Product Detail */}

      {/* Reviews Section */}
      <div className="container my-5">
        <div
          className="border rounded p-4"
          style={{ borderColor: "#ddd", backgroundColor: "#f9f9f9" }}
        >
          <h4 className="m-3">Đánh giá sản phẩm</h4>

          {/* Review items */}
          {productReviews?.map((review, index) => {
            let m = moment(review.createdAt)
            return (
              <div key={index} className="card m-3 border border-secondary-subtle">
                <div className="card-body">
                  <h6 className="fw-bold mb-1">
                    {review.name}
                  </h6>
                  <small className="text-muted">{m.fromNow()}</small>
                  <p className="mt-2">{review.comment}</p>
                </div>
              </div>
            )
          })}

          {/* Add new review */}
          <div className="card p-3 mt-4">
            <textarea
              name="comment"
              onChange={changeInputComment}
              value={inputComment.comment || ""}
              className="form-control mb-2"
              rows="3"
              placeholder="Viết đánh giá..."
            ></textarea>
            <button onClick={clickComment} className="btn btn-dark mt-2">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
