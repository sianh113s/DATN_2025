import { useState, useEffect } from "react";
import { getProducts } from "../../../services/Api";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../../product-item";
import Pagination from "../../pagination";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pages, setPages] = useState({
    limit: 8,
    totalPages: 1,
    page: 1,
  });

  const page = parseInt(searchParams.get("page") || "1", 10);
  const keyword = searchParams.get("keyword") || "";

  useEffect(() => {
    getProducts({
      params: {
        name: keyword,
        limit: 8,
        page,
      }
    })
      .then(({ data }) => {
        setProducts(data.data.docs);
        setPages(prev => ({
          ...prev,
          ...data.data.pages,
        }));
      })
      .catch((err) => console.log(err));
  }, [keyword, page]); // thêm page

  return (
    <>
      <section className="product-store">
        <div className="container-fluid px-3 px-md-5 padding-medium">
          <h4 className="fw-light">
            Kết quả tìm kiếm sản phẩm với "{keyword}"
          </h4>
          <div className="row">
            {products.map((item, index) => (
              <ProductItem key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      <Pagination pages={pages} />
    </>
  );
};

export default Search;
