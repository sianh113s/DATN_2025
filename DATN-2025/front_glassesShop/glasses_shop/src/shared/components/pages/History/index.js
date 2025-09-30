import { getOrderById } from "../../../services/Api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  console.log(orders);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lịch sử đặt hàng</h2>
      <div className="accordion" id="orderHistoryAccordion">
        {/* Đơn hàng 1 */}
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
                  Mã đơn: 123456 | Tổng tiền: 1,000,000 đ | Trạng thái: Delivered
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#orderHistoryAccordion"
              >
                <div className="accordion-body">
                  <p><strong>Ngày tạo:</strong> 01/10/2025 10:00</p>
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
                      <tr>
                        <td>Kính Mắt ABC</td>
                        <td>500,000 đ</td>
                        <td>2</td>
                        <td>1,000,000 đ</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-auto text-end">
                    <button className="btn btn-danger">
                      Huỷ đơn hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {/* Đơn hàng 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Mã đơn: 123457 | Tổng tiền: 500,000 đ | Trạng thái: Pending
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#orderHistoryAccordion"
          >
            <div className="accordion-body">
              <p><strong>Ngày tạo:</strong> 30/09/2025 14:30</p>
              <h5>Sản phẩm:</h5>
              <table className="table table-bordered table-sm">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Kính Mắt XYZ</td>
                    <td>500,000 đ</td>
                    <td>1</td>
                    <td>500,000 đ</td>
                    <td>
                      <button className="btn btn-sm btn-danger">
                        Huỷ đơn hàng
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}

export default History;