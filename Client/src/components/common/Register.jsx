import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaLock,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaCamera,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../app/auth/authThunk";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error, message } = useSelector(
    (state) => state.auth,
  );
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(userRegister(formData));
    console.log(result,"hhh");

    if (userRegister.fulfilled.match(result)) {
      toast.success(result.payload.message);

      setTimeout(() => {
        console.log("navi", navigate);
        navigate("/");
      }, 1000);

      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
      });
    } else {
      toast.error(result.payload?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left */}

      <div className="hidden lg:flex relative">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1400"
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white px-10">
          <FaCamera className="text-7xl mb-6" />

          <h1 className="text-5xl font-bold">Album Studio</h1>

          <p className="mt-5 text-center text-lg max-w-md">
            Create your account and access your albums, photos and memories.
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex justify-center items-center bg-gray-50 px-5 py-10">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl p-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Register</h2>

            <p className="text-gray-500 mt-2">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            <div>
              <label className="font-semibold">Full Name</label>

              <div className="relative mt-2">
                <FaUser className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  required
                  className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
            <div>
              <label className="font-semibold">Mobile Number</label>

              <div className="relative mt-2">
                <FaPhoneAlt className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="Enter Mobile Number"
                  required
                  className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>
            <div>
              <div>
                <label className="font-semibold">Email (Optional)</label>

                <div className="relative mt-2">
                  <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email (Optional)"
                    className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="font-semibold">Address</label>

              <div className="relative mt-2">
                <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">Password</label>

              <div className="relative mt-2">
                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  required
                  className="w-full border rounded-xl py-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-purple-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {error && (
  <p className="text-red-500 text-center text-sm">
    {error}
  </p>
)}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 cursor-pointer hover:bg-purple-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-purple-600 font-semibold">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
