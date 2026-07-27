import React, { useState } from "react";
import {
  FaTimes,
  FaSave,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaMapMarkerAlt,
  FaUserShield,
  FaImage,
} from "react-icons/fa";

const AddUserDialog = ({
  open,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    userType: "User",
    profileImage: null,
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      setFormData({
        ...formData,
        profileImage: files[0],
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);

    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      userType: "User",
      profileImage: null,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center px-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-5">

          <h2 className="text-2xl font-bold">
            Add New User
          </h2>

          <button onClick={onClose}>
            <FaTimes size={20} />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          <div className="grid md:grid-cols-2 gap-5">

            {/* Name */}

            <div>

              <label className="font-medium">
                Full Name
              </label>

              <div className="relative mt-2">

                <FaUser className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full border rounded-lg py-3 pl-11 pr-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="font-medium">
                Email (Optional)
              </label>

              <div className="relative mt-2">

                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full border rounded-lg py-3 pl-11 pr-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

            </div>

            {/* Mobile */}

            <div>

              <label className="font-medium">
                Mobile Number
              </label>

              <div className="relative mt-2">

                <FaPhoneAlt className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  maxLength={10}
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className="w-full border rounded-lg py-3 pl-11 pr-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="font-medium">
                Password
              </label>

              <div className="relative mt-2">

                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full border rounded-lg py-3 pl-11 pr-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

            </div>

          </div>

          {/* Address */}

          <div>

            <label className="font-medium">
              Address
            </label>

            <div className="relative mt-2">

              <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Address"
                className="w-full border rounded-lg py-3 pl-11 pr-3 outline-none focus:ring-2 focus:ring-purple-500"
              />

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {/* User Type */}

            <div>

              <label className="font-medium">
                User Type
              </label>

              <div className="relative mt-2">

                <FaUserShield className="absolute left-4 top-4 text-gray-400" />

                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full border rounded-lg py-3 pl-11 pr-3 outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="User">
                    User
                  </option>

                  <option value="Admin">
                    Admin
                  </option>

                </select>

              </div>

            </div>

            {/* Profile */}

            <div>

              <label className="font-medium">
                Profile Image
              </label>

              <div className="relative mt-2">

                <FaImage className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border rounded-lg py-2.5 pl-11 pr-3"
                />

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t pt-5">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              <FaSave />

              Add User
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddUserDialog;