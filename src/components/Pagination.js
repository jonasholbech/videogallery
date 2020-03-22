import React, { useState } from "react";

export default function Pagination({ children, currentPage, perPage = 10 }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(children.length / perPage);
  const toShow = children.slice((page - 1) * 10, perPage * page);

  const links = [];
  if (page > 1) {
    links.push(
      <button
        key={"arrow_" + 1}
        onClick={() => {
          setPage(1);
        }}
      >
        <span role="img" aria-label="First page">
          ⏮
        </span>
      </button>
    );
    links.push(
      <button key={"arrow" + page - 1} onClick={() => setPage(page - 1)}>
        <span role="img" aria-label="Go back one page">
          ⏪
        </span>
      </button>
    );
  }

  if (page - 1 > 0) {
    links.push(
      <button key={page - 1} onClick={() => setPage(page - 1)}>
        {page - 1}
      </button>
    );
  }
  if (page - 2 > 0) {
    links.push(
      <button key={page - 2} onClick={() => setPage(page - 2)}>
        {page - 2}
      </button>
    );
  }

  links.push(
    <button key={page} disabled>
      {page}
    </button>
  );
  if (page + 1 < totalPages) {
    links.push(
      <button key={page + 1} onClick={() => setPage(page + 1)}>
        {page + 1}
      </button>
    );
  }
  if (page + 2 < totalPages) {
    links.push(
      <button key={page + 2} onClick={() => setPage(page + 2)}>
        {page + 2}
      </button>
    );
  }

  if (page < totalPages) {
    links.push(
      <button key={"arrow" + page + 1} onClick={() => setPage(page + 1)}>
        <span role="img" aria-label="Go forward one page">
          ⏩
        </span>
      </button>
    );
    links.push(
      <button key={totalPages} onClick={() => setPage(totalPages)}>
        <span role="img" aria-label="Go to last page">
          ⏭
        </span>
      </button>
    );
  }
  return (
    <>
      <div className="pagination">{links}</div>
      {toShow}
    </>
  );
}
