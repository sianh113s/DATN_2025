import { Container, Row, Col, Nav, Tab, Modal, Table, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getUser, deleteUser, getOrder, updateOrder } from "../../../../services/Api";

const DashBoard = () => {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // Lấy danh sách user & order khi load trang
  useEffect(() => {
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchUsers = () => {
    getUser({ limit: 20 })
      .then(({ data }) => setUsers(data.data.docs))
      .catch((error) => console.log(error));
  };

  const fetchOrders = () => {
    getOrder()
      .then(({ data }) => setOrders(data.data))
      .catch((error) => console.log(error));
  };

  // Xóa user
  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        await deleteUser(id);
        alert("Xóa thành công!");
        fetchUsers();
      } catch (error) {
        console.error("Lỗi khi xóa user:", error);
        alert("Không thể xóa người dùng!");
      }
    }
  };

  // Mở modal đơn hàng
  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  // Cập nhật đơn hàng (demo)
  const handleUpdateOrder = async (order) => {
    if (!order) return;
    try {
      await updateOrder(order._id, { status: order.status });
      alert("Cập nhật đơn hàng thành công!");
      fetchOrders(); // load lại danh sách order
      setShowOrderModal(false);
    } catch (error) {
      console.error("Lỗi cập nhật đơn hàng:", error);
      alert("Không thể cập nhật đơn hàng!");
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white min-vh-100 p-3">
          <h4 className="mb-4">Admin Panel</h4>
          <Nav
            variant="pills"
            className="flex-column"
            activeKey={activeKey}
            onSelect={(k) => setActiveKey(k)}
          >
            <Nav.Item>
              <Nav.Link eventKey="dashboard" className="text-white">
                Thống kê
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="users" className="text-white">
                Người dùng
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="products" className="text-white">
                Sản phẩm
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="orders" className="text-white">
                Đơn hàng
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="category" className="text-white">
                Danh mục
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="logout" className="text-white">
                Đăng xuất
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        {/* Nội dung chính */}
        <Col md={10} className="p-4">
          <Tab.Container activeKey={activeKey}>
            <Tab.Content>
              {/* Dashboard */}
              <Tab.Pane eventKey="dashboard">
                <h2>📊 Thống kê</h2>
                <p>Hiển thị doanh thu, số đơn hàng, người dùng...</p>
              </Tab.Pane>

              {/* Users */}
              <Tab.Pane eventKey="users">
                <h2>👤 Quản lý người dùng</h2>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Họ Tên</th>
                      <th>Email</th>
                      <th>Vai trò</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteUser(item._id)}
                            className="btn btn-sm btn-danger"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tab.Pane>

              {/* Products */}
              <Tab.Pane eventKey="products">
                <h2>📦 Quản lý sản phẩm</h2>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>Danh mục</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Kính thời trang</td>
                      <td>500,000 VND</td>
                      <td>Kính nam</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2">Sửa</button>
                        <button className="btn btn-sm btn-danger">Xóa</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Tab.Pane>

              {/* Orders */}
              <Tab.Pane eventKey="orders">
                <h2>🧾 Quản lý đơn hàng</h2>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{item._id}</td>
                        <td>{(item.total_amount).toLocaleString()}đ</td>
                        <td>{item.status}</td>
                        <td>
                          <button
                            onClick={() => handleOpenOrder(item)}
                            className="btn btn-sm btn-danger"
                          >
                            Sửa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tab.Pane>

              {/* Category */}
              <Tab.Pane eventKey="category">
                <h2>📂 Quản lý danh mục</h2>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Tên danh mục</th>
                      <th>Mô tả</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Kính nam</td>
                      <td>Các loại kính dành cho nam</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2">Sửa</button>
                        <button className="btn btn-sm btn-danger">Xóa</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>

      {/* Modal đơn hàng */}
      {/* Modal đơn hàng */}
      <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {orders
            .filter((o) => o._id === selectedOrder?._id)
            .map((order) => (
              <Table bordered hover key={order._id}>
                <tbody>
                  <tr>
                    <th>Mã đơn</th>
                    <td>{order._id}</td>
                  </tr>
                  <tr>
                    <th>Tổng tiền</th>
                    <td>{order.total_amount?.toLocaleString()} đ</td>
                  </tr>
                  <tr>
                    <th>Trạng thái</th>
                    <td>
                      <Form.Select
                        value={order.status}
                        onChange={(e) =>
                          setSelectedOrder({ ...order, status: e.target.value })
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </Form.Select>
                    </td>
                  </tr>
                  <tr>
                    <th>Ngày tạo</th>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                </tbody>
              </Table>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOrderModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={() => handleUpdateOrder(selectedOrder)}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default DashBoard;
