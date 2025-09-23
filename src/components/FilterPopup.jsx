import React, { useState } from "react";

export default function FilterPopup({ onApply, onClose }) {
  const [filters, setFilters] = useState({ firstName: "", lastName: "", email: "", department: "" });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onApply(filters);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <input
          type="text"
          name="firstName"
          placeholder="Filter by first name"
          value={filters.firstName}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded mb-3"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Filter by last name"
          value={filters.lastName}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded mb-3"
        />
        <input
          type="text"
          name="email"
          placeholder="Filter by email"
          value={filters.email}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded mb-3"
        />
        <input
          type="text"
          name="department"
          placeholder="Filter by department"
          value={filters.department}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded mb-3"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleApply} className="px-4 py-2 bg-blue-500 text-white rounded">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}