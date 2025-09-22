import { useState, useEffect } from "react";
import { getProducts } from "../../../services/Api";
import ProductItem from "../../product-item";
const Home = () => {
  const [saleProducts, setSaleProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  useEffect(() => {
    getProducts({
      params: {
        limit: 8,
        sort: -1,
      },
    })
      .then(({ data }) => setNewProducts(data.data.docs))
      .catch((error) => console.log(error));

    getProducts({
      params: {
        limit: 8,
      }
    })
      .then(({ data }) => setSaleProducts(data.data.docs))
      .catch((error) => console.log(error)
      )
  }, [])
  return (
    <>
      {/* Sản phẩm bán chạy */}
      <section id="new-arrival" className="product-store">
        <div className="container-fluid px-3 px-md-5 padding-medium">
          <h2 className="display-5 fw-light text-uppercase text-center">Sản phẩm bán chạy</h2>
          <p className="text-center mb-4">Sản phẩm được quan tâm nhiều nhất ở của hàng chúng tôi </p>
          <div className="row">
            {/* ProductItem */}
            {
              saleProducts.map((item, index) => {
                return <ProductItem key={index} item={item} />
              })
            }
            {/* End */}

          </div>
          <div className="text-center mt-5 pt-4">
            <button type="submit" className="btn btn-dark rounded-3">View All Products</button>
          </div>
        </div>
      </section>
      {/* End Sản phẩm bán chạy */}
      {/* Phụ kiện */}
      <section id="best-seller" className="product-store">
        <div className="container-fluid px-3 px-md-5 padding-medium">
          <h2 className="display-5 fw-light text-uppercase text-center">Sản phẩm mới nhất</h2>
          <p className="text-center mb-4">Sản phẩm mới cập nhật gần đây</p>
          <div className="row">
            {
              newProducts.map((item, index) => {
                return <ProductItem key={index} item={item} />
              })
            }
          </div>
          <div className="text-center mt-5 pt-4">
            <button type="submit" className="btn btn-dark rounded-3">View All Products</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;