import React from "react";

export default function UserTable({
  users,
  onEdit,
  onDelete,
  sortKey,
  sortOrder,
  setSortKey,
  setSortOrder,
}) {
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 mb-4 text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-200">
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("id")}
            >
              ID {sortKey === "id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("firstName")}
            >
              First Name{" "}
              {sortKey === "firstName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("lastName")}
            >
              Last Name{" "}
              {sortKey === "lastName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("email")}
            >
              Email{" "}
              {sortKey === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th
              className="p-2 cursor-pointer"
              onClick={() => handleSort("department")}
            >
              Department{" "}
              {sortKey === "department" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.firstName}</td>
                <td className="p-2">{user.lastName}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.department}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}