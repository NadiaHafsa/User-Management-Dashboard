import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import FilterPopup from "./components/FilterPopup";
import Pagination from "./components/Pagination";
import ErrorMessage from "./components/ErrorMessage";

export default function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [users, search, sortKey, sortOrder]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      // Map users to include firstName, lastName, and department
      const mappedUsers = res.data.map((u) => {
        const [firstName, ...lastNameParts] = (u.name || "").split(" ");
        return {
          ...u,
          firstName: firstName || "",
          lastName: lastNameParts.join(" ") || "",
          department: u.company?.name || "General",
        };
      });
      setUsers(mappedUsers);
      setFilteredUsers(mappedUsers);
      setError("");
    } catch {
      setError("Failed to fetch users. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let data = [...users];

    if (search) {
      data = data.filter(
        (u) =>
          (u.firstName && u.firstName.toLowerCase().includes(search.toLowerCase())) ||
          (u.lastName && u.lastName.toLowerCase().includes(search.toLowerCase())) ||
          (u.email && u.email.toLowerCase().includes(search.toLowerCase())) ||
          (u.department && u.department.toLowerCase().includes(search.toLowerCase()))
      );
    }

    data.sort((a, b) => {
      if (sortKey === "id") {
        const aId = Number(a.id) || 0;
        const bId = Number(b.id) || 0;
        return sortOrder === "asc" ? aId - bId : bId - aId;
      } else {
        const aVal = a[sortKey] ? a[sortKey].toString().toLowerCase() : "";
        const bVal = b[sortKey] ? b[sortKey].toString().toLowerCase() : "";
        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
      }
    });

    setFilteredUsers(data);
    setPage(1);
  };

  const handleAddUser = async (user) => {
    try {
      // Generate next continuous numeric ID
      const maxId = users.length > 0 ? Math.max(...users.map(u => Number(u.id) || 0)) : 0;
      const newUser = { ...user, id: maxId + 1 };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setPage(1);
      setShowForm(false);
      setEditUser(null);
    } catch {
      setError("Failed to add user.");
    }
  };

  const handleEditUser = async (user) => {
    try {
      // Simulate API call: update user locally
      const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setShowForm(false);
      setEditUser(null);
    } catch {
      setError("Failed to edit user.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      // Simulate API call
      setUsers(users.filter((u) => u.id !== id));
    } catch {
      setError("Failed to delete user.");
    }
  };

  const startIndex = (page - 1) * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

  return (
  <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management Dashboard</h1>

      {error && <ErrorMessage message={error} />}

      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded w-full sm:w-1/3 mb-2 sm:mb-0"
        />
        <div className="flex flex-row gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded sm:mr-2 w-full sm:w-auto"
          >
            Add User
          </button>
          <button
            onClick={() => setShowFilters(true)}
            className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Filters
          </button>
          <button
            onClick={() => {
              setFilteredUsers(users);
              setPage(1);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <UserTable
        users={paginatedUsers}
        onEdit={(u) => {
          setEditUser(u);
          setShowForm(true);
        }}
        onDelete={handleDeleteUser}
        sortKey={sortKey}
        sortOrder={sortOrder}
        setSortKey={setSortKey}
        setSortOrder={setSortOrder}
      />

      <Pagination
        total={filteredUsers.length}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
      />

      {showForm && (
        <UserForm
          initialData={editUser}
          onSubmit={editUser ? handleEditUser : handleAddUser}
          onCancel={() => {
            setShowForm(false);
            setEditUser(null);
          }}
        />
      )}

      {showFilters && (
        <FilterPopup
          onApply={(filters) => {
            let data = [...users];
            if (filters.firstName) {
              data = data.filter((u) =>
                u.firstName &&
                typeof u.firstName === 'string' &&
                u.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
              );
            }
            if (filters.lastName) {
              data = data.filter((u) =>
                u.lastName &&
                typeof u.lastName === 'string' &&
                u.lastName.toLowerCase().includes(filters.lastName.toLowerCase())
              );
            }
            if (filters.email) {
              data = data.filter((u) =>
                u.email &&
                typeof u.email === 'string' &&
                u.email.toLowerCase().includes(filters.email.toLowerCase())
              );
            }
            if (filters.department) {
              data = data.filter((u) =>
                u.department &&
                typeof u.department === 'string' &&
                u.department.toLowerCase().includes(filters.department.toLowerCase())
              );
            }
            setFilteredUsers(data);
            setPage(1);
            setShowFilters(false);
          }}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}