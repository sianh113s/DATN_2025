import { useState } from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";

const DashBoard = () => {
  const [activeKey, setActiveKey] = useState("dashboard");

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
                📊 Thống kê
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="users" className="text-white">
                👤 Quản lý người dùng
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="products" className="text-white">
                📦 Quản lý sản phẩm
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="orders" className="text-white">
                🧾 Quản lý đơn hàng
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
                {/* Sau này có thể thêm biểu đồ */}
              </Tab.Pane>

              {/* Users */}
              <Tab.Pane eventKey="users">
                <h2>👤 Quản lý người dùng</h2>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Vai trò</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Nguyễn Văn A</td>
                      <td>user@email.com</td>
                      <td>Khách hàng</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2">Sửa</button>
                        <button className="btn btn-sm btn-danger">Xóa</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Tab.Pane>

              {/* Products */}
              <Tab.Pane eventKey="products">
                <h2>📦 Quản lý sản phẩm</h2>
                <button className="btn btn-success mb-3">+ Thêm sản phẩm</button>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>Danh mục</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>101</td>
                      <td>Kính mắt RayBan</td>
                      <td>1.200.000đ</td>
                      <td>Kính râm</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2">Sửa</button>
                        <button className="btn btn-sm btn-danger">Xóa</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Tab.Pane>

              {/* Orders */}
              <Tab.Pane eventKey="orders">
                <h2>🧾 Quản lý đơn hàng</h2>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Mã đơn</th>
                      <th>Khách hàng</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>ORD001</td>
                      <td>Nguyễn Văn B</td>
                      <td>2.500.000đ</td>
                      <td>Chờ xử lý</td>
                      <td>
                        <button className="btn btn-sm btn-info me-2">Chi tiết</button>
                        <button className="btn btn-sm btn-success">Xác nhận</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default DashBoard;
