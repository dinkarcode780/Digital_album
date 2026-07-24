import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCamera,
  FaSave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminById, adminUpdateProfile } from "../../app/admin/adminThunk";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { admin, loading } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    adminId: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    profileImage: null,
  });

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"));

    if (adminData?._id) {
      dispatch(getAdminById(adminData._id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (admin) {
      setFormData({
        adminId: admin._id,
        name: admin.name || "",
        email: admin.email || "",
        phoneNumber: admin.phoneNumber || "",
        address: admin.address || "",
        profileImage: null,
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files[0],
    }));
  };

  const handleSubmit = () => {
    dispatch(adminUpdateProfile(formData));
  };

  if (loading) {
    return <div className="text-center text-xl py-20">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Profile</h1>

        <p className="text-gray-500 mt-2">
          Manage your personal information and account settings.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left */}

        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <div className="relative w-40 h-40 mx-auto">
            <img
              src={
                formData.profileImage
                  ? URL.createObjectURL(formData.profileImage)
                  : admin?.profileImage || "https://i.pravatar.cc/300?img=12"
              }
              className="w-full h-full rounded-full object-cover border-4 border-purple-100"
              alt=""
            />

            <label className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center cursor-pointer">
              <FaCamera />

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />
            </label>
          </div>

          <h2 className="text-2xl font-bold mt-6">{admin?.name}</h2>

          <p className="text-gray-500">{admin?.userType || "Super Admin"}</p>

          <span className="inline-block mt-3 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm">
            Active Account
          </span>

          <button
            onClick={() => navigate("/admin/resetpassword")}
            className="mt-6 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl transition"
          >
            Reset Password
          </button>
        </div>

        {/* Right */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold mb-8">Personal Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold flex items-center gap-2">
                <FaUser className="text-purple-600" />
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2">
                <FaEnvelope className="text-purple-600" />
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2">
                <FaPhoneAlt className="text-purple-600" />
                Phone Number
              </label>

              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2">
                <FaMapMarkerAlt className="text-purple-600" />
                Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>
          </div>

          {/* <div className="mt-6">
            <label className="font-semibold">About</label>

            <textarea
              rows="5"
              defaultValue="Professional Wedding Studio Administrator."
              className="w-full border rounded-xl p-3 mt-2 resize-none outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div> */}

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl flex items-center gap-3"
            >
              <FaSave />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
