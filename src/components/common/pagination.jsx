import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pages.map((page) => (
          <li key={page} className={setPageActive(page)}>
            <span
              style={{ cursor: "pointer" }}
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );

  function setPageActive(page) {
    let classes = "page-item";
    if (currentPage === page) classes += " active";
    return classes;
  }
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
