import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../app/auth/authThunk";
import {
  FaUserEdit,
  FaLock,
  FaImages,
  FaDownload,
  FaHeart,
  FaSignOutAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">

      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-500 mt-2">
          Manage your account information.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left Card */}

        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <img
            src={user?.profileImage || "https://i.pravatar.cc/200"}
            alt={user?.name || "User"}
            className="w-32 h-32 rounded-full mx-auto border-4 border-purple-500 object-cover"
          />

          <h2 className="text-2xl font-bold mt-4">
            {user?.name || "Dinkar Paswan"}
          </h2>

          <p className="text-gray-500">
            {user?.userType || "Wedding Client"}
          </p>

          <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto">

            <FaUserEdit />

            Edit Profile

          </button>

        </div>

        {/* Right Card */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-semibold mb-6">
            Personal Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="text-gray-500 text-sm">
                Full Name
              </label>

              <input
                value={user?.name || "Dinkar Paswan"}
                readOnly
                className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50"
              />

            </div>

            <div>

              <label className="text-gray-500 text-sm">
                Email
              </label>

              <input
                value={user?.email || "dinkar@gmail.com"}
                readOnly
                className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50"
              />

            </div>

            <div>

              <label className="text-gray-500 text-sm">
                Phone
              </label>

              <input
                value={user?.phoneNumber || "+91 9876543210"}
                readOnly
                className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50"
              />

            </div>

            <div>

              <label className="text-gray-500 text-sm">
                Address
              </label>

              <input
                value={user?.address || "Begusarai, Bihar"}
                readOnly
                className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50"
              />

            </div>

          </div>

          {/* Quick Actions */}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">

            <button className="border rounded-xl py-5 hover:bg-purple-50 transition">

              <FaLock
                className="mx-auto text-purple-600"
                size={24}
              />

              <p className="mt-3">
                Change Password
              </p>

            </button>

            <button className="border rounded-xl py-5 hover:bg-purple-50 transition">

              <FaImages
                className="mx-auto text-purple-600"
                size={24}
              />

              <p className="mt-3">
                My Albums
              </p>

            </button>

            <button className="border rounded-xl py-5 hover:bg-purple-50 transition">

              <FaDownload
                className="mx-auto text-purple-600"
                size={24}
              />

              <p className="mt-3">
                Downloads
              </p>

            </button>

            <button className="border rounded-xl py-5 hover:bg-purple-50 transition">

              <FaHeart
                className="mx-auto text-red-500"
                size={24}
              />

              <p className="mt-3">
                Favorites
              </p>

            </button>

            <button
              onClick={async () => {
                await dispatch(userLogout());
                navigate("/");
              }}
              className="border rounded-xl py-5 hover:bg-red-50 transition text-red-500 cursor-pointer"
            >

              <FaSignOutAlt
                className="mx-auto"
                size={24}
              />

              <p className="mt-3">
                Logout
              </p>

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;