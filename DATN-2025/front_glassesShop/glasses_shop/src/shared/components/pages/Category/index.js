import { useState, useEffect } from "react";
import { getCategoryProducts } from "../../../services/Api";
import { useParams } from "react-router-dom";
import ProductItem from "../../product-item";
const Category = () => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("")
  const { id } = useParams();
  const [pages, setPages] = useState([]);

  useEffect(() => {

    getCategoryProducts(id, {
      params: {
        limit: 8,

      }
    })
      .then(({ data }) => {
        setPages(data.data.pages)
        setProducts(data.data.docs)
      })
      .catch((error) => console.log(error)
      )
  }, [id])
  return (
    <>
      <section className="product-store">
        <div className="container-fluid px-3 px-md-5 padding-medium">
          <h4 className=" fw-light text-lowercase ">{pages.totalRows} sản phẩm </h4>
          <div className="row">
            {/* ProductItem */}
            {
              products.map((item, index) => (
                <ProductItem key={index} item={item} />
              ))
            }
            {/* End */}

          </div>
          <div className="text-center mt-5 pt-4">
            <button type="submit" className="btn btn-dark rounded-3">View All Products</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Category;