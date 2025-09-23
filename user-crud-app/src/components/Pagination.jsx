import React from "react";

export default function Pagination({ total, page, setPage, limit, setLimit }) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        <label>Rows per page: </label>
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-2 py-1 border rounded mr-2">
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-2 py-1 border rounded ml-2">
          Next
        </button>
      </div>
    </div>
  );
}
