import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import EditUserDialog from "../../components/admindilog/EditUserDialog";
import UserStatusDialog from "../../components/admindilog/UserStatusDialog";
import DeleteUserDialog from "../../components/admindilog/DeleteUserDialog";
import AddUserDialog from "../../components/admindilog/AddUserDilog";
import Pagination from "../../components/common/Pagination";

import {
  getUserByFilter,
  toggleUserStatus,
  userDeleteById,
  userRegister,
  userUpdateProfile,
} from "../../app/auth/authThunk";

import {
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaUserCheck,
  FaUserSlash,
  FaPlus,
} from "react-icons/fa";

const UsersPage = () => {
  const dispatch = useDispatch();

  const {
    users,
    loading,
    error,
    totalPages,
    currentPage,
    totalUsers,
  } = useSelector((state) => state.auth);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const params = {
      page,
      limit,
    };

    if (search) params.search = search;
    if (role) params.userType = role;
    if (status) params.isActive = status;

    dispatch(getUserByFilter(params));
  }, [dispatch, page, limit, search, role, status]);

  const buildParams = (nextPage = page) => {
    const params = {
      page: nextPage,
      limit,
    };

    if (search) params.search = search;
    if (role) params.userType = role;
    if (status) params.isActive = status;

    return params;
  };

  // ================= Update =================

  const handleUpdate = async (updatedUser) => {
    const result = await dispatch(
      userUpdateProfile({
        userId: selectedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
        profileImage: updatedUser.profileImage,
      })
    );

    if (userUpdateProfile.fulfilled.match(result)) {
      toast.success("User updated successfully");
      dispatch(getUserByFilter(buildParams(page)));
      setOpenEdit(false);
    }
  };

  // ================= Delete =================

  const handleDelete = async (user) => {
    if (!user?._id) return;

    const result = await dispatch(userDeleteById(user._id));

    if (userDeleteById.fulfilled.match(result)) {
      toast.success("User deleted successfully");
      dispatch(getUserByFilter(buildParams(page)));
      setOpenDelete(false);
    }
  };

  // ================= Status =================

  const handleStatus = async () => {
    const result = await dispatch(toggleUserStatus(selectedUser._id));

    if (toggleUserStatus.fulfilled.match(result)) {
      toast.success(result.payload.message);
      dispatch(getUserByFilter(buildParams(page)));
      setOpenStatus(false);
    } else {
      toast.error(result.payload?.message);
    }
  };

  // ================= Add User =================

  const handleAddUser = async (userData) => {
    const result = await dispatch(userRegister(userData));

    if (userRegister.fulfilled.match(result)) {
      toast.success("User Added Successfully");
      dispatch(getUserByFilter(buildParams(page)));
      setOpenAdd(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* ================= Dialogs ================= */}

      <EditUserDialog
        open={openEdit}
        user={selectedUser}
        onClose={() => setOpenEdit(false)}
        onSave={handleUpdate}
      />

      <AddUserDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAddUser}
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

      {/* ================= Heading ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Users Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage all registered users.
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <FaPlus />
          Add User
        </button>

      </div>

      {/* ================= Search ================= */}

      <div className="bg-white rounded-2xl shadow-sm p-4">

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="relative flex-1">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />

          </div>

          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setPage(1);
            }}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

        </div>

      </div>

      {/* ================= Top Info ================= */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-3">

        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold">{users.length}</span> of{" "}
          <span className="font-semibold">{totalUsers}</span> users
        </p>

        <div className="flex items-center gap-2">

          <span className="text-sm text-gray-600">
            Rows :
          </span>

          <select
            value={limit}
            onChange={(e) => {
              const value =
                e.target.value === "All"
                  ? totalUsers
                  : Number(e.target.value);

              setLimit(value);
              setPage(1);
            }}
            className="border rounded-lg px-3 py-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value="All">All</option>
          </select>

        </div>

      </div>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto hide-scrollbar">
          <table className="min-w-[1050px] w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-4 text-left font-semibold text-gray-700 w-20">
                  ID
                </th>

                <th className="px-4 py-4 text-left font-semibold text-gray-700 min-w-[240px]">
                  User
                </th>

                <th className="px-4 py-4 text-left font-semibold text-gray-700 min-w-[260px]">
                  Email
                </th>

                <th className="px-4 py-4 text-left font-semibold text-gray-700 min-w-[150px]">
                  Phone
                </th>

                <th className="px-4 py-4 text-left font-semibold text-gray-700 min-w-[120px]">
                  Role
                </th>

                <th className="px-4 py-4 text-left font-semibold text-gray-700 min-w-[120px]">
                  Status
                </th>

                <th className="px-4 py-4 text-center font-semibold text-gray-700 min-w-[220px]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-16 text-gray-500"
                  >
                    Loading Users...
                  </td>
                </tr>
              ) : users?.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-16 text-gray-500"
                  >
                    No Users Found.
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* Serial Number */}

                    <td className="px-4 py-5 font-semibold text-gray-700 whitespace-nowrap align-middle">
                      {(page - 1) * limit + index + 1}
                    </td>

                    {/* User */}

                    <td className="px-4 py-5 align-middle">
                      <Link to={`/admin/users/details/${user._id}`} className="flex items-center gap-3 min-w-[220px]">
                        <img
                          src={
                            user.profileImage ||
                            "https://i.pravatar.cc/150?img=11"
                          }
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {user.name}
                          </h3>

                          {/* <p className="text-xs text-gray-500">
                            #{user._id.slice(-6)}
                          </p> */}
                        </div>
                      </Link>
                    </td>

                    {/* Email */}

                    <td className="px-4 py-5 whitespace-nowrap align-middle">
                      {user.email || "N/A"}
                    </td>

                    {/* Phone */}

                    <td className="px-4 py-5 whitespace-nowrap align-middle">
                      {user.phoneNumber || "N/A"}
                    </td>

                    {/* Role */}

                    <td className="px-4 py-5 align-middle">
                      <span
                        className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium ${
                          user.userType === "Admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {user.userType}
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-4 py-5 align-middle">
                      <span
                        className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium ${
                          user.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-4 py-5 align-middle">
                      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                        <Link
                          to={`/admin/users/details/${user._id}`}
                          className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition"
                        >
                          <FaEye />
                        </Link>

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
                          className="w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition"
                        >
                          <FaTrash />
                        </button>

                        {user.isActive ? (
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenStatus(true);
                            }}
                            className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white flex items-center justify-center transition"
                          >
                            <FaUserSlash />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenStatus(true);
                            }}
                            className="w-10 h-10 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white flex items-center justify-center transition"
                          >
                            <FaUserCheck />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Error */}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Pagination */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default UsersPage;
