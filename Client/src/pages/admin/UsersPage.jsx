import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditUserDialog from "../../components/admindilog/EditUserDialog";
import UserStatusDialog from "../../components/admindilog/UserStatusDialog";
import DeleteUserDialog from "../../components/admindilog/DeleteUserDialog";
import Pagination from "../../components/common/Pagination";
import { toast } from "react-toastify";

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
import AddUserDialog from "../../components/admindilog/AddUserDilog";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error, totalPages, currentPage, totalUsers } =
    useSelector((state) => state.auth);

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
      // userType: "User",
    };

    if (search) params.search = search;
    if (role) params.userType = role;
    if (status) params.isActive = status;

    dispatch(getUserByFilter(params));
  }, [dispatch, search, role, status, page, limit]);

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

  const handleUpdate = async (updatedUser) => {
    const result = await dispatch(
      userUpdateProfile({
        userId: selectedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
        profileImage: updatedUser.profileImage,
      }),
    );

    if (userUpdateProfile.fulfilled.match(result)) {
      dispatch(getUserByFilter(buildParams(page)));
      setOpenEdit(false);
    }
  };

  const handleDelete = async (user) => {
    if (!user?._id) return;
    await dispatch(userDeleteById(user._id));
    dispatch(getUserByFilter(buildParams(page)));
    setOpenDelete(false);
  };

  const handleStatus = async () => {
    console.log("Selected User", selectedUser);
    const result = await dispatch(toggleUserStatus(selectedUser._id));

    console.log("Result =", result);

    if (toggleUserStatus.fulfilled.match(result)) {
      toast.success(result.payload.message);

      dispatch(getUserByFilter(buildParams(page)));

      setOpenStatus(false);
    } else {
      toast.error(result.payload?.message);
    }
  };

  //   const handleAddUser = async (userData) => {
  //   const resultAction = await dispatch(userRegister(userData));

  //   if (userRegister.fulfilled.match(resultAction)) {
  //     setOpenAdd(false);

  //     // User list refresh
  //     dispatch(
  //       getUserByFilter({
  //         search,
  //         userType,
  //         isActive,
  //         page: currentPage,
  //         limit: 10,
  //       })
  //     );
  //   }
  // };

  const handleAddUser = async (userData) => {
    const result = await dispatch(userRegister(userData));

    if (userRegister.fulfilled.match(result)) {
      setOpenAdd(false);

      dispatch(getUserByFilter(buildParams(page)));
    }
  };
  return (
    <div className="space-y-8">
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

      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-gray-500 mt-2">Manage all registered users.</p>
        </div>

        <Link
          onClick={() => setOpenAdd(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-3"
        >
          <FaPlus />
          Add User
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name, Email or Mobile..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setPage(1);
          }}
          className="border rounded-xl px-5 py-3"
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
          className="border rounded-xl px-5 py-3"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <span>
          Showing {users.length} of {totalUsers} users
        </span>

        <div className="flex items-center gap-2">
          <span>Rows :</span>

          <select
            value={limit}
            onChange={(e) => {
              const value =
                e.target.value === "All" ? totalUsers : Number(e.target.value);

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
            {loading ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : users?.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users?.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          user.profileImage ||
                          "https://i.pravatar.cc/150?img=11"
                        }
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-500">
                          ID : #{user._id?.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">{user.email || "N/A"}</td>
                  <td className="p-4">{user.phoneNumber || "N/A"}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.userType === "Admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.userType || "User"}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        user.isActive
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
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
                        className="w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center"
                      >
                        <FaTrash />
                      </button>

                      {user.isActive ? (
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      ) : null}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default UsersPage;
