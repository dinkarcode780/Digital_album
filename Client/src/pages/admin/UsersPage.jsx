import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditUserDialog from "../../components/admindilog/EditUserDialog";
import UserStatusDialog from "../../components/admindilog/UserStatusDialog";
import DeleteUserDialog from "../../components/admindilog/DeleteUserDialog";
// import
import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaUserCheck,
  FaUserSlash,
  FaPlus,
} from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "Dinkar Paswan",
    email: "dinkar@gmail.com",
    phone: "9876543210",
    role: "User",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    phone: "9123456789",
    role: "User",
    status: "Inactive",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "9988776655",
    role: "Admin",
    status: "Active",
    image: "https://i.pravatar.cc/150?img=5",
  },
];

const UsersPage = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUpdate = (updatedUser) => {
    console.log(updatedUser);

    // API Call

    setOpenEdit(false);
  };

  const handleDelete = (user) => {
    console.log("Delete User:", user);

    // Backend API call yahan hogi

    setOpenDelete(false);
  };

  const handleStatus = (user) => {
    console.log("Status Changed:", user);

    // Backend API call

    setOpenStatus(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <EditUserDialog
        open={openEdit}
        user={selectedUser}
        onClose={() => setOpenEdit(false)}
        onSave={handleUpdate}
      />

      <DeleteUserDialog
        open={openDelete}
        user={selectedUser}
        onClose={() => setOpenDelete(false)}
        onDelete={handleDelete}
      />

      <UserStatusDialog
        open={openStatus}
        user={selectedUser}
        onClose={() => setOpenStatus(false)}
        onConfirm={handleStatus}
      />

      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>

          <p className="text-gray-500 mt-2">Manage all registered users.</p>
        </div>

        <Link
          to="/admin/users/create"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-3"
        >
          <FaPlus />
          Add User
        </Link>
      </div>

      {/* Search & Filter */}

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search user..."
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <select className="border rounded-xl px-5 py-3">
          <option>All Roles</option>
          <option>Admin</option>
          <option>User</option>
        </select>

        <select className="border rounded-xl px-5 py-3">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">User</th>

              <th className="text-left p-4">Email</th>

              <th className="text-left p-4">Phone</th>

              <th className="text-left p-4">Role</th>

              <th className="text-left p-4">Status</th>

              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">{user.name}</h3>

                      <p className="text-sm text-gray-500">ID : #{user.id}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">{user.phone}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/admin/users/details/${user.id}`}
                      className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition"
                    >
                      <FaEye />
                    </Link>

                    {/* <Link
                    
                      to={`/admin/users/edit/${user.id}`}
                      className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white flex items-center justify-center transition"
                    >
                      <FaEdit />
                    </Link> */}

                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenEdit(true);
                      }}
                      className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white flex items-center justify-center transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setOpenDelete(true);
                      }}
                      className="w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center"
                    >
                      <FaTrash />
                    </button>

                    {user.status === "Active" ? (
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenStatus(true);
                        }}
                        className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white transition flex items-center justify-center"
                      >
                        <FaUserSlash />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setOpenStatus(true);
                        }}
                        className="w-10 h-10 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition flex items-center justify-center"
                      >
                        <FaUserCheck />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
