import React from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";

const Pagination = ({ pages = {} }) => {
  const {
    totalPages = 1,
    page = 1,
    hasNext = false,
    hasPrev = false,
    next = null,
    prev = null,
  } = pages;

  const [searchParams] = useSearchParams();
  const location = useLocation();

  // giữ nguyên query hiện tại, chỉ thay page
  const formatUrl = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    return `${location.pathname}?${params.toString()}`;
  };

  // sinh danh sách số trang
  const renderPages = (delta = 1) => {
    const pageNumbers = [];
    const left = page - delta;
    const right = page + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || i === page || (i >= left && i <= right)) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        {/* Prev */}
        <li className={`page-item ${!hasPrev ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to={formatUrl(hasPrev ? prev || page - 1 : page)}
          >
            «
          </Link>
        </li>

        {/* Page numbers */}
        {renderPages().map((item) => (
          <li
            key={`page-${item}`}
            className={`page-item ${item === page ? "active" : ""}`}
          >
            <Link className="page-link" to={formatUrl(item)}>
              {item}
            </Link>
          </li>
        ))}

        {/* Next */}
        <li className={`page-item ${!hasNext ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to={formatUrl(hasNext ? next || page + 1 : page)}
          >
            »
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
