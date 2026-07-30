import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { adminLogin } from "../../app/admin/adminThunk";
import { userLogin } from "../../app/auth/authThunk";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCamera,
  FaCameraRetro,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminState = useSelector((state) => state.admin);
  const userState = useSelector((state) => state.auth);

  const [loginType, setLoginType] = useState("User");

  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
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

     if (loginType === "User") {
    if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
  }

    if (loginType === "Admin") {
      dispatch(
        adminLogin({
          email: formData.email,
          password: formData.password,
        }),
      );
    } else {
      dispatch(
        userLogin({
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        }),
      );
    }
  };

  useEffect(() => {
    if (adminState.isAuthenticated) {
      navigate("/admin/dashboard");
    }

    if (userState.token) {
      navigate("/user/dashboard");
    }
  }, [adminState.isAuthenticated, userState.token, navigate]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}

      <div className="hidden lg:flex relative">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1400"
          alt="Login"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white px-10">
          <FaCamera className="text-7xl mb-6" />

          <h1 className="text-5xl font-bold">Album Studio</h1>

          <p className="mt-6 text-center text-lg max-w-md">
            Welcome back! Login to access your albums, memories and downloads.
          </p>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex items-center justify-center bg-gray-50 px-6 py-10">
        <div className="bg-white shadow-xl rounded-3xl w-full max-w-md p-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold">Login</h2>

            <p className="text-gray-500 mt-2">
              {loginType === "User"
                ? "Login using your mobile number"
                : "Login using your email address"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Login Type */}

            {/* <div>

              <label className="font-semibold">
                Login As
              </label>

              <select
                name="loginType"
                value={formData.loginType}
                onChange={handleChange}
                className="w-full border rounded-xl py-3 px-4 mt-2 outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="User">
                  User
                </option>

                <option value="Admin">
                  Admin
                </option>

              </select>

            </div> */}

            <div className="mt-6">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setLoginType("User")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    loginType === "User"
                      ? "bg-purple-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  👤 User
                </button>

                <button
                  type="button"
                  onClick={() => setLoginType("Admin")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    loginType === "Admin"
                      ? "bg-purple-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {/* 🛡 Admin */}
                  <FaCameraRetro className="inline mr-2" />
                  Studio
                </button>
              </div>
            </div>

            {/* User Login */}

            {loginType === "User" ? (
              <div>
                <label className="font-semibold">Mobile Number</label>

                <div className="relative mt-2">
                  <FaPhoneAlt className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    maxLength={10}
                    required
                    // pattern="[6-9]{1}[0-9]{9}"
                    className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="font-semibold">Email Address</label>

                <div className="relative mt-2">
                  <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter Email Address"
                    className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
            )}

            {/* Password */}

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
                  className="absolute right-4 top-4 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}

            <div className="text-right">
              <Link
                to={
                  loginType === "Admin"
                    ? "/forgot-password"
                    : "/forgot-password"
                }
                className="text-purple-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {loginType === "Admin"
              ? adminState.error && (
                  <p className="text-red-500 text-sm text-center">
                    {adminState.error}
                  </p>
                )
              : userState.error && (
                  <p className="text-red-500 text-sm text-center">
                    {userState.error}
                  </p>
                )}

            {/* Login */}

            <button
              type="submit"
              disabled={
                loginType === "Admin" ? adminState.loading : userState.loading
              }
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              {loginType === "Admin"
                ? adminState.loading
                  ? "Logging..."
                  : "Admin Login"
                : userState.loading
                  ? "Logging..."
                  : "User Login"}
            </button>

            {/* Register */}

{loginType === "User" && (
  <div className="text-center mt-2">
    <p className="text-gray-600">
      Don't have an account?{" "}
      <Link
        to="/users/register"
        className="text-purple-600 font-semibold hover:underline"
      >
        Register
      </Link>
    </p>
  </div>
)}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
