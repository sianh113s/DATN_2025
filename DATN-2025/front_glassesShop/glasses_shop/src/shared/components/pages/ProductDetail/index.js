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
  const [users, setUsers] = useState({}); // dùng object thay vì array
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeInputComment = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

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
  }, [id]);

  // Lấy thông tin user từ user_id trong reviews

  useEffect(() => {
    productReviews.forEach((review) => {
      const userId = review.user_id;
      if (userId && !users[userId]) {
        getUser(userId) // thực ra trả về toàn bộ users
          .then(({ data }) => {
            console.log("User list:", data);
            // data.data là mảng users
            const foundUser = data.data.find(u => u._id === userId);
            setUsers(prev => ({
              ...prev,
              [userId]: foundUser ? foundUser.name : "Anonymous"
            }));
          })
          .catch((error) => console.log("Lỗi lấy user:", error));
      }
    });
  }, [productReviews]);

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
    createReview(id, inputComment)
      .then(({ data }) => {
        console.log(data);

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
              <div>
                <h4>{productDetail?.name}</h4>
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
                  <button onClick={clickAddToCart} className="btn btn-outline-dark ms-3">
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
          <h5 className="mb-3">Reviews</h5>

          {/* Review items */}
          {productReviews?.map((review, index) => {
            let m = moment(review.createdAt)
            return (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <h6 className="fw-bold mb-1">
                    {users[review.user_id] || "Anonymous"}
                  </h6>
                  <small className="text-muted">{m.fromNow()}</small>
                  <p className="mt-2">{review.comment}</p>
                </div>
              </div>
            )
          })}

          {/* Add new review */}
          <div className="card p-3 mt-4">
            <h6 className="fw-bold mb-2">Add your review</h6>
            <textarea
              name="comment"
              onChange={changeInputComment}
              value={inputComment.comment || ""}
              className="form-control mb-2"
              rows="3"
              placeholder="Write your review..."
            ></textarea>
            <button onClick={clickComment} className="btn btn-dark mt-2">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
