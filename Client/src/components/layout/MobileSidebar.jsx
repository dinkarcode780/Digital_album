import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../app/auth/authThunk";
import {
  FaTimes,
  FaHome,
  FaImages,
  FaHeart,
  FaDownload,
  FaUser,
  FaLock,
  FaHeadset,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FaHome />,
  },
  {
    name: "My Albums",
    path: "/albums",
    icon: <FaImages />,
  },
  {
    name: "Favorites",
    path: "/favorites",
    icon: <FaHeart />,
  },
  {
    name: "Downloads",
    path: "/downloads",
    icon: <FaDownload />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
  {
    name: "Change Password",
    path: "/change-password",
    icon: <FaLock />,
  },
  {
    name: "Support",
    path: "/support",
    icon: <FaHeadset />,
  },

  {
    name: "Logout",
    path: "/logout", // baad me logout function call kar dena
    icon: <FaSignOutAlt />,
    danger: true,
  },
];

const MobileSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0
       h-screen
       w-[280px]
     bg-white
        flex
       flex-col
      overflow-hidden
       z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`} >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-purple-600">Album Studio</h2>

            <p className="text-sm text-gray-500">We Capture Your Happiness</p>
          </div>

          <button onClick={onClose}>
            <FaTimes size={22} />
          </button>
        </div>

        {/* User */}
        <div className="p-5 border-b shrink-0">
          <img
            src={user?.profileImage || "https://i.pravatar.cc/100"}
            alt=""
            className="w-14 h-14 rounded-full object-cover"
          />

          <h3 className="font-semibold mt-3">{user?.name || "Dinkar Paswan"}</h3>

          <p className="text-sm text-gray-500">{user?.userType || "User"}</p>
        </div>

        {/* Menu */}

        {/* <div className="flex-1 overflow-y-auto mt-3">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 transition
                ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-100"
                }`
              }
            >
              {item.icon}

              <span>{item.name}</span>
            </NavLink>
          ))}

        </div> */}
        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            if (item.danger) {
              return (
                <button
                  key={item.name}
                  onClick={async () => {
                    onClose();
                    await dispatch(userLogout());
                    navigate("/");
                  }}
                  className="w-full flex items-center gap-4 px-5 py-4 transition text-red-500 hover:bg-red-50 cursor-pointer text-left font-medium"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              );
            }
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 transition ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "hover:bg-purple-100 text-gray-700 font-medium"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
        

        {/* Help */}
      </div>
    </>
  );
};

export default MobileSidebar;
