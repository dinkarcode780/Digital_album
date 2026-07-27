import React, { useEffect, useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

const EditUserDialog = ({ open, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    role: "User",
    status: "Active",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        role: user.userType || "User",
      //  status: user.isActive ? "Active" : "Inactive"
      });
    }
  }, [user]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...user,
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
        {/* Header */}

        <div className="flex justify-between items-center border-b p-5">
          <h2 className="text-2xl font-bold">Edit User</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="font-medium">Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="font-medium">Phone Number</label>

            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>


<div>
            <label className="font-medium">Address</label>

            <input
              type="text"
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

    
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="font-medium">Role</label>

              <select
                name="role"
                value={formData.userType}
                onChange={handleChange}
                className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="User">User</option>

                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* <div>
              <label className="font-medium">Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Active">Active</option>

                <option value="Inactive">Inactive</option>
              </select>
            </div> */}
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 pt-4 border-t">
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDialog;
