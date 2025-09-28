import { useSelector } from "react-redux";
import { getProducts } from "../../../services/Api";
import { useState, useEffect } from "react";
import { getImageProduct } from "../../../until";
import { updateItemCart, deleteItemCart } from "../../../../redux_setup/reducer/cart";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const itemsCart = useSelector(({ cart }) => cart.items)

  const [products, setProducts] = useState([]);
  const totalPrice = itemsCart.reduce((total, item) => total + Number(item.quantity) * Number(item.price_vnd), 0);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data); // giả sử API trả về { data: [...] }
      } catch (error) {
        console.error("Lỗi lấy sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Lấy user từ localStorage
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const changeQty = (e, id) => {
    const value = Number(e.target.value)

    if (value === 0) {
      //eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm("Bạn có muốn xóa sản phẩm không?");
      return isConfirm
        ? dispatch(deleteItemCart({ _id: id }))
        : false
    }
    else {
      return dispatch(updateItemCart({ _id: id, quantity: value }))
    }
  }
  const clickDeleteItemCart = (e, id) => {
    e.preventDefault();
    //eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Bạn có muốn xóa sản phẩm không?");
    return isConfirm
      ? dispatch(deleteItemCart({ _id: id }))
      : false
  }
  return (
    <div className="container my-5">
      <h2 className="mb-4">Giỏ hàng của bạn</h2>
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">Sản phẩm</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Giá</th>
              <th scope="col">Số Lượng</th>
              <th scope="col">Thành tiền</th>
              <th scope="col">Thao tác</th>

            </tr>
          </thead>
          <tbody>
            {
              itemsCart.map((item, index) =>

                <tr key={index}>
                  <td>{item?.product_name}</td>
                  <td>
                    <img
                      src={getImageProduct(item.image)}
                      alt="product"
                      className="img-fluid rounded"
                      width={80}
                    />
                  </td>
                  <td>{item?.price_vnd.toLocaleString()}đ</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <input
                        type="number"
                        className="form-control mx-2"
                        value={item.quantity}
                        style={{ width: "80px" }}
                        onChange={(e) => changeQty(e, item._id)}
                      />
                    </div>
                  </td>
                  <td>{(item.quantity * item.price_vnd).toLocaleString()}đ</td>
                  <td>
                    <button onClick={(e) => clickDeleteItemCart(e, item._id)} className="btn btn-danger btn-sm">Xóa</button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      {/* Tổng tiền */}
      <div className="d-flex justify-content-end mt-4">
        <div className="card p-3 shadow-sm" style={{ width: "300px" }}>
          <h5>Tổng cộng</h5>
          <p className="mb-3 fw-bold">Tổng: {totalPrice.toLocaleString()}₫</p>
          <button onClick={() => navigate("/payment")} className="btn btn-primary w-100">Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
