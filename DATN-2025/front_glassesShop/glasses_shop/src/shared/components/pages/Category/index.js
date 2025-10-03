import React, { useState, useEffect } from "react";
import { getCategoryProducts } from "../../../services/Api";
import { useParams, useSearchParams } from "react-router-dom";
import ProductItem from "../../product-item";
import Pagination from "../../pagination";

const Category = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  // pages state: lưu metadata pagination trả từ API
  const [pages, setPages] = useState({
    limit: 8,
    totalPages: 1,
    page: 1,
    hasNext: false,
    hasPrev: false,
    next: null,
    prev: null,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // ensure URL has page param at least 1 on first load
  useEffect(() => {
    if (!searchParams.get("page")) {
      const p = new URLSearchParams(searchParams.toString());
      p.set("page", "1");
      // replace: true để không push new history entry
      setSearchParams(p, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  useEffect(() => {
    console.log("[Category] fetch categoryId=", id, "page=", currentPage);
    getCategoryProducts(id, {
      params: {
        limit: pages.limit || 8,
        page: currentPage,
      },
    })
      .then(({ data }) => {
        console.log("[Category] API response", data);
        setPages((prev) => ({ ...prev, ...data.data.pages }));
        setProducts(data.data.docs || []);
      })
      .catch((error) => {
        console.error("[Category] fetch error:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentPage]);

  return (
    <>
      <section className="product-store">
        <div className="container-fluid px-3 px-md-5 padding-medium">
          <h4 className="fw-light text-lowercase ">
            {pages.totalRows ?? 0} sản phẩm
          </h4>
          <div className="row">
            {products.map((item, index) => (
              <ProductItem key={item._id ?? index} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="container my-4">
        <Pagination pages={pages} />
      </div>
    </>
  );
};

export default Category;
