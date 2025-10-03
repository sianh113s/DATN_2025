import { getOrderById, updateOrder } from "../../../services/Api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify"
const History = () => {
  const [orders, setOrders] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { id } = useParams();
  useEffect(() => {
    getOrderById(id)
      .then(({ data }) => setOrders(data.data))
      .catch((error) => console.log(error)
      )
  }, [])
  const handleCancleOrder = async (order_id) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) return;
    try {
      const res = await updateOrder(order_id, { status: "canceled" });
      if (res.status === 200) {
        toast.success("Huỷ đơn hàng thành công!");
        // cập nhật lại state orders để UI hiển thị
        getOrderById(id)
          .then(({ data }) => setOrders(data.data))
          .catch((error) => console.log(error)
          )
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi huỷ đơn hàng!");
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lịch sử đặt hàng</h2>
      <div className="accordion" id="orderHistoryAccordion">
        {/* Đơn hàng */}
        {
          orders.map((item, index) =>
            <div key={index} className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={`collapse${index}`}
                >
                  Mã đơn: {item._id} | Tổng tiền: {(item.total_amount).toLocaleString()}đ | Trạng thái: {item.status}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#orderHistoryAccordion"
              >
                <div className="accordion-body">
                  <p><strong>Ngày tạo:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                  <h5>Sản phẩm:</h5>
                  <table className="table table-bordered table-sm">
                    <thead>
                      <tr>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.items.map((p, index) =>
                        <tr key={index}>
                          <td>{p.product_name}</td>
                          <td>{p.price_vnd}</td>
                          <td>{p.quantity}</td>
                          <td>{p.price_vnd * p.quantity}</td>
                        </tr>
                      )}

                    </tbody>
                  </table>
                  <div className="mt-auto text-end">
                    <button
                      onClick={() => handleCancleOrder(item._id)}
                      className="btn btn-danger"
                      disabled={item.status !== "pending"}>
                      Huỷ đơn hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

      </div>
    </div>
  );


}

export default History;