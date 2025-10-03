import { Container, Row, Col, Nav, Tab, Modal, Table, Button, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  deleteUser,
  getOrder,
  updateOrder,
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getRevenue
} from "../../../../services/Api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


// ---------------- Category Modal ----------------
const CategoryModal = ({ show, onHide, onSave }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }

    onSave({ name });   // gọi hàm từ Dashboard
    setName("");        // reset form
    onHide();           // đóng modal
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thêm danh mục</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên danh mục..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Huỷ
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const CategoryEditModal = ({ show, onHide, category, onSave }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name || "");
    }
  }, [category]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }
    try {
      await onSave(category._id, { name });
      setName("");
      onHide();
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      alert("Không thể cập nhật danh mục!");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sửa danh mục</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Tên danh mục</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên danh mục..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Huỷ
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
// ---------------- Product Modal ----------------
const ProductModal = ({ show, onHide, onSave, categories }) => {
  const [form, setForm] = useState({
    name: "",
    material: "",
    description: "",
    price_vnd: "",
    stock_quantity: "",
    in_stock: true,
    images: null,
    category_id: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {

    if (!form.name.trim()) {
      alert("Tên sản phẩm bắt buộc!");
      return;
    }
    console.log("📦 Dữ liệu form trước khi gửi:", form);
    onSave(form);
    setForm({
      name: "",
      material: "",
      description: "",
      price_vnd: "",
      stock_quantity: "",
      in_stock: true,
      images: "",
      category_id: "",
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Thêm sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Chất liệu</Form.Label>
            <Form.Control
              name="material"
              value={form.material}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Giá (VNĐ)</Form.Label>
                <Form.Control
                  type="number"
                  name="price_vnd"
                  value={form.price_vnd}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  name="stock_quantity"
                  value={form.stock_quantity}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-2">
            <Form.Label>Ảnh sản phẩm</Form.Label>
            <Form.Control
              type="file"
              name="images"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  images: e.target.files[0],
                }))
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Danh mục</Form.Label>
            <Form.Select
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
            >
              <option value="">--Chọn danh mục--</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Còn hàng"
            name="in_stock"
            checked={form.in_stock}
            onChange={handleChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Huỷ
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ProductEditModal = ({ show, onHide, onSave, product, categories }) => {
  const [form, setForm] = useState(product || {});

  useEffect(() => {
    setForm(product || {});
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      alert("Tên sản phẩm bắt buộc!");
      return;
    }
    onSave(form._id, form);
    onHide();
  };

  if (!form) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Sửa sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              name="name"
              value={form.name || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Chất liệu</Form.Label>
            <Form.Control
              name="material"
              value={form.material || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={form.description || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Giá (VNĐ)</Form.Label>
                <Form.Control
                  type="number"
                  name="price_vnd"
                  value={form.price_vnd || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-2">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  name="stock_quantity"
                  value={form.stock_quantity || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-2">
            <Form.Label>Ảnh sản phẩm</Form.Label>
            <Form.Control
              type="file"
              name="images"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  images: e.target.files[0], // lưu file mới
                }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Danh mục</Form.Label>
            <Form.Select
              name="category_id"
              value={form.category_id || ""}
              onChange={handleChange}
            >
              <option value="">--Chọn danh mục--</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Còn hàng"
            name="in_stock"
            checked={form.in_stock || false}
            onChange={handleChange}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Huỷ
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};




// ---------------- Dashboard ----------------
const DashBoard = () => {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [revenue, setRevenue] = useState();
  const [label, setLabel] = useState();

  const getLast6Months = () => {
    const now = new Date();
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(`Tháng ${d.getMonth() + 1}`);
    }
    return months;
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchCategories();
    fetchProducts();
    revenue6Month();
  }, []);
  const fetchProducts = () => {
    getProducts({
      params: {
        limit: 30,
      },
    })
      .then(({ data }) => setProducts(data.data.docs))
      .catch((error) => console.log(error));
  }
  const fetchUsers = () => {
    getUser()
      .then(({ data }) => setUsers(data.data.docs))
      .catch((error) => console.log(error));
  };

  const fetchOrders = () => {
    getOrder()
      .then(({ data }) => setOrders(data.data))
      .catch((error) => console.log(error));
  };

  const fetchCategories = () => {
    getCategory()
      .then(({ data }) => setCategories(data.data))
      .catch((error) => console.log(error));
  };

  const revenue6Month = () => {
    getRevenue()
      .then(({ data }) => {
        setLabel(data.data.label);
        setRevenue(data.data.revenue);
      })
      .catch((error) => console.log(error));
  }

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

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleUpdateOrder = async (order) => {
    if (!order) return;
    try {
      await updateOrder(order._id, { status: order.status });
      alert("Cập nhật đơn hàng thành công!");
      fetchOrders();
      setShowOrderModal(false);
    } catch (error) {
      console.error("Lỗi cập nhật đơn hàng:", error);
      alert("Không thể cập nhật đơn hàng!");
    }
  };

  const handleCreateCategory = async (newCategory) => {
    try {
      await createCategory(newCategory);
      alert("Thêm danh mục thành công!");
      fetchCategories();
    } catch (error) {
      console.error("Lỗi thêm danh mục:", error);
      alert("Không thể thêm danh mục!");
    }
  };
  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setShowEditCategoryModal(true);
  };

  const handleSaveCategory = async (id, data) => {
    try {
      await updateCategory(id, data);
      alert("Cập nhật danh mục thành công!");
      fetchCategories();
    } catch (error) {
      console.error("Lỗi cập nhật danh mục:", error);
      alert("Không thể cập nhật danh mục!");
    }
  };
  const handleDeleteCategory = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await deleteCategory(id);
        alert("Xóa thành công!");
        fetchCategories();
      } catch (error) {
        console.error("Lỗi khi xóa category:", error);
        alert("Không thể xóa danh mục!");
      }
    }
  }
  const handleCreateProduct = async (newProduct) => {
    try {
      console.log("🚀 Dữ liệu nhận từ form:", newProduct);

      const formData = new FormData();
      for (let key in newProduct) {
        if (key === "images" && newProduct.images) {
          formData.append("images", newProduct.images); // file duy nhất
        } else {
          formData.append(key, newProduct[key]);
        }
      }

      console.log("📤 FormData gửi đi:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await createProduct(formData);
      console.log("✅ Phản hồi từ server:", res);

      alert("Thêm sản phẩm thành công!");
      fetchProducts();
    } catch (error) {
      console.error("❌ Lỗi thêm sản phẩm:", error.response?.data || error);
      alert("Không thể thêm sản phẩm!");
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };

  const handleSaveProduct = async (id, data) => {
    try {
      const formData = new FormData();
      for (let key in data) {
        if (key === "images" && data.images) {
          formData.append("images", data.images); // file ảnh
        } else {
          formData.append(key, data[key]);
        }
      }

      await updateProduct(id, formData); // gửi FormData
      alert("Cập nhật sản phẩm thành công!");
      fetchProducts();
    } catch (error) {
      console.error("Lỗi cập nhật sản phẩm:", error);
      alert("Không thể cập nhật sản phẩm!");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        alert("Xóa thành công!");
        fetchProducts();
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Không thể xóa sản phẩm!");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
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
              <Nav.Link eventKey="users" className="text-white">
                Người dùng
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleLogout} eventKey="logout" className="text-white">
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
                <p>Thống kê doanh thu theo tháng...</p>

                <Line
                  data={{
                    labels: label,
                    datasets: [
                      {
                        label: "Doanh thu (VND)",
                        data: revenue,
                        borderColor: "#6eabddff",
                        fill: "origin",
                        tension: 0.4,
                        pointBackgroundColor: "#6eabddff",
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: (value) => value.toLocaleString() + "₫",
                        },
                      },
                    },
                  }}
                />
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
                    {users.map((item) => (
                      <tr key={item._id}>
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
                <button
                  className="btn btn-success mb-3"
                  onClick={() => setShowProductModal(true)}
                >
                  + Thêm sản phẩm
                </button>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Giá bán</th>
                      <th>Chất liệu</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.price_vnd?.toLocaleString()}đ</td>
                        <td>{item.material}</td>
                        <td>
                          <button
                            onClick={() => handleEditProduct(item)}
                            className="btn btn-sm btn-warning me-2"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(item._id)}
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
                    {orders.map((item) => (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.total_amount.toLocaleString()}đ</td>
                        <td>{item.status}</td>
                        <td>
                          <button
                            onClick={() => handleOpenOrder(item)}
                            className="btn btn-sm btn-warning"
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
                <button
                  className="btn btn-success mb-3"
                  onClick={() => setShowCategoryModal(true)}
                >
                  + Thêm danh mục
                </button>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Mã Danh Mục</th>
                      <th>Tên Danh Mục</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((item) => (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>
                          <button onClick={() => handleEditCategory(item)} className="btn btn-sm btn-warning me-2">Sửa</button>
                          <button onClick={() => handleDeleteCategory(item._id)} className="btn btn-sm btn-danger">Xóa</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>

      {/* Modal đơn hàng */}
      <Modal show={showOrderModal} onHide={() => setShowOrderModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <Table bordered hover>
              <tbody>
                <tr>
                  <th>Mã đơn</th>
                  <td>{selectedOrder._id}</td>
                </tr>
                <tr>
                  <th>Tổng tiền</th>
                  <td>{selectedOrder.total_amount?.toLocaleString()} đ</td>
                </tr>
                <tr>
                  <th>Trạng thái</th>
                  <td>
                    <Form.Select
                      value={selectedOrder.status}
                      onChange={(e) =>
                        setSelectedOrder({ ...selectedOrder, status: e.target.value })
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
                  <td>{new Date(selectedOrder.createdAt).toLocaleString()}</td>
                </tr>
              </tbody>
            </Table>
          )}
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

      {/* Modal thêm danh mục */}
      <CategoryModal
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(false)}
        onSave={handleCreateCategory}
      />
      <CategoryEditModal
        show={showEditCategoryModal}
        onHide={() => setShowEditCategoryModal(false)}
        category={selectedCategory}
        onSave={handleSaveCategory}
      />
      {/* Modal thêm sản phẩm */}
      <ProductModal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        onSave={handleCreateProduct}
        categories={categories}
      />

      {/* Modal sửa sản phẩm */}
      <ProductEditModal
        show={showEditProductModal}
        onHide={() => setShowEditProductModal(false)}
        product={selectedProduct}
        onSave={handleSaveProduct}
        categories={categories}
      />

    </Container>
  );
};

export default DashBoard;
