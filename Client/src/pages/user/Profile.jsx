// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { userLogout } from "../../app/auth/authThunk";
// import {
//   FaUserEdit,
//   FaLock,
//   FaImages,
//   FaDownload,
//   FaHeart,
//   FaSignOutAlt,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaMapMarkerAlt,
// } from "react-icons/fa";

// const Profile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   return (
//     <div className="max-w-6xl mx-auto px-5 py-8">

//       {/* Heading */}

//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">My Profile</h1>
//         <p className="text-gray-500 mt-2">
//           Manage your account information.
//         </p>
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">

//         {/* Left Card */}

//         <div className="bg-white rounded-2xl shadow p-6 text-center">

//           <img
//             src={user?.profileImage || "https://i.pravatar.cc/200"}
//             alt={user?.name || "User"}
//             className="w-32 h-32 rounded-full mx-auto border-4 border-purple-500 object-cover"
//           />

//           <h2 className="text-2xl font-bold mt-4">
//             {user?.name || "Dinkar Paswan"}
//           </h2>

//           <p className="text-gray-500">
//             {user?.userType || "Wedding Client"}
//           </p>

//           <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto">

//             <FaUserEdit />

//             Edit Profile

//           </button>

//         </div>

//         {/* Right Card */}

//         <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">

//           <h2 className="text-xl font-semibold mb-6">
//             Personal Information
//           </h2>

//           <div className="grid md:grid-cols-2 gap-6">

//             <div>

//               <label className="text-gray-500 text-sm">
//                 Full Name
//               </label>

//               <input
//                 value={user?.name || "Dinkar Paswan"}
//                 readOnly
//                 className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50"
//               />

//             </div>

//             <div>

//               <label className="text-gray-500 text-sm">
//                 Email
//               </label>

//               <input
//                 value={user?.email || "dinkar@gmail.com"}
//                 readOnly
//                 className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50"
//               />

//             </div>

//             <div>

//               <label className="text-gray-500 text-sm">
//                 Phone
//               </label>

//               <input
//                 value={user?.phoneNumber || "+91 9876543210"}
//                 readOnly
//                 className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50"
//               />

//             </div>

//             <div>

//               <label className="text-gray-500 text-sm">
//                 Address
//               </label>

//               <input
//                 value={user?.address || "Begusarai, Bihar"}
//                 readOnly
//                 className="w-full mt-2 border rounded-lg px-4 py-3 bg-gray-50"
//               />

//             </div>

//           </div>

//           {/* Quick Actions */}

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">

//             <button className="border rounded-xl py-5 hover:bg-purple-50 transition">

//               <FaLock
//                 className="mx-auto text-purple-600"
//                 size={24}
//               />

//               <p className="mt-3">
//                 Change Password
//               </p>

//             </button>

//             <button className="border rounded-xl py-5 hover:bg-purple-50 transition">

//               <FaImages
//                 className="mx-auto text-purple-600"
//                 size={24}
//               />

//               <p className="mt-3">
//                 My Albums
//               </p>

//             </button>

//             <button className="border rounded-xl py-5 hover:bg-purple-50 transition">

//               <FaDownload
//                 className="mx-auto text-purple-600"
//                 size={24}
//               />

//               <p className="mt-3">
//                 Downloads
//               </p>

//             </button>

//             <button className="border rounded-xl py-5 hover:bg-purple-50 transition">

//               <FaHeart
//                 className="mx-auto text-red-500"
//                 size={24}
//               />

//               <p className="mt-3">
//                 Favorites
//               </p>

//             </button>

//             <button
//               onClick={async () => {
//                 await dispatch(userLogout());
//                 navigate("/");
//               }}
//               className="border rounded-xl py-5 hover:bg-red-50 transition text-red-500 cursor-pointer"
//             >

//               <FaSignOutAlt
//                 className="mx-auto"
//                 size={24}
//               />

//               <p className="mt-3">
//                 Logout
//               </p>

//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Profile;

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
  FaCamera,
  FaCalendarAlt,
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const actionItems = [
    {
      title: "Change Password",
      subtitle: "Keep your account secure",
      icon: FaLock,
      color: "purple",
      action: () => navigate("/change-password"),
    },
    {
      title: "My Albums",
      subtitle: "View your memories",
      icon: FaImages,
      color: "violet",
      action: () => navigate("/user/albums"),
    },
    {
      title: "Downloads",
      subtitle: "Your downloaded files",
      icon: FaDownload,
      color: "blue",
      action: () => navigate("/user/downloads"),
    },
    {
      title: "Favorites",
      subtitle: "Your favorite moments",
      icon: FaHeart,
      color: "pink",
      action: () => navigate("/user/favorites"),
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#faf8ff] via-[#f5f0ff] to-[#eee7ff] px-4 py-8 md:px-8">

      {/* =====================================================
          ANIMATED BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-purple-300/20 blur-[110px] animate-pulse" />

      <div
        className="pointer-events-none absolute -right-40 top-[25%] h-[500px] w-[500px] rounded-full bg-violet-400/20 blur-[120px]"
        style={{
          animation: "profileFloat 9s ease-in-out infinite",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-[-150px] left-[35%] h-[450px] w-[450px] rounded-full bg-fuchsia-300/15 blur-[110px]"
        style={{
          animation: "profileFloat 11s ease-in-out infinite reverse",
        }}
      />

      {/* Floating dots */}

      <div
        className="absolute left-[10%] top-[25%] h-3 w-3 rounded-full bg-purple-500/30"
        style={{
          animation: "smallFloat 5s ease-in-out infinite",
        }}
      />

      <div
        className="absolute right-[15%] top-[18%] h-4 w-4 rounded-full bg-violet-500/30"
        style={{
          animation: "smallFloat 7s ease-in-out infinite reverse",
        }}
      />

      <div
        className="absolute bottom-[20%] right-[35%] h-3 w-3 rounded-full bg-fuchsia-400/30"
        style={{
          animation: "smallFloat 6s ease-in-out infinite",
        }}
      />


      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">

          <div className="flex items-center gap-2 text-sm font-semibold text-purple-600">

            <FaHeart className="text-purple-600" />

            My Account

          </div>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-800 md:text-5xl">

            My{" "}

            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Profile
            </span>

          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account and keep your memories close.
          </p>

        </div>


        {/* =====================================================
            PROFILE HERO
        ====================================================== */}

        <div
          className="
            relative
            mb-8
            overflow-hidden
            rounded-[32px]
            border
            border-white/80
            bg-white/55
            shadow-[0_20px_70px_rgba(124,58,237,0.12)]
            backdrop-blur-2xl
          "
        >

          {/* Background circles */}

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

          <div className="absolute -bottom-32 left-[35%] h-72 w-72 rounded-full bg-violet-200/20 blur-3xl" />


          <div className="relative flex flex-col items-center gap-7 p-7 md:flex-row md:p-10">

            {/* Profile Image */}

            <div className="relative flex-shrink-0">

              {/* Outer animated ring */}

              <div
                className="
                  absolute
                  -inset-2
                  rounded-full
                  border-2
                  border-purple-300/40
                "
                style={{
                  animation: "profileRotate 8s linear infinite",
                }}
              />

              {/* Gradient ring */}

              <div className="rounded-full bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 p-1.5 shadow-xl shadow-purple-300/30">

                <img
                  src={
                    user?.profileImage ||
                    "https://i.pravatar.cc/300"
                  }
                  alt={user?.name || "User"}
                  className="
                    h-32
                    w-32
                    rounded-full
                    border-4
                    border-white
                    object-cover
                    md:h-36
                    md:w-36
                  "
                />

              </div>


              {/* Online */}

              <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-green-500 text-white shadow-md">

                <FaCheckCircle className="text-xs" />

              </div>

            </div>


            {/* User info */}

            <div className="flex-1 text-center md:text-left">

              <div className="flex flex-col items-center gap-2 md:flex-row">

                <h2 className="text-3xl font-extrabold text-gray-800">

                  {user?.name || "Dinkar Paswan"}

                </h2>

                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">

                  {user?.userType || "Wedding Client"}

                </span>

              </div>


              <p className="mt-2 text-gray-500">
                Welcome to your personal digital album.
              </p>


              {/* User contact */}

              <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">

                <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm text-gray-600 backdrop-blur-md">

                  <FaPhoneAlt className="text-purple-500" />

                  {user?.phoneNumber || "+91 9876543210"}

                </div>


                <div className="flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm text-gray-600 backdrop-blur-md">

                  <FaEnvelope className="text-purple-500" />

                  {user?.email || "dinkar@gmail.com"}

                </div>

              </div>

            </div>


            {/* Edit */}

            <button
              className="
                group
                flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-purple-600
                to-violet-600
                px-5
                py-3
                font-semibold
                text-white
                shadow-lg
                shadow-purple-300/30
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
              "
            >

              <FaUserEdit />

              Edit Profile

              <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />

            </button>

          </div>

        </div>


        {/* =====================================================
            STATS
        ====================================================== */}

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">

          <div className="group rounded-2xl border border-white/80 bg-white/55 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition-transform group-hover:scale-110">

                <FaImages />

              </div>

              <div>

                <p className="text-2xl font-extrabold text-gray-800">
                  12
                </p>

                <p className="text-xs text-gray-500">
                  Albums
                </p>

              </div>

            </div>

          </div>


          <div className="group rounded-2xl border border-white/80 bg-white/55 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-100 text-pink-500 transition-transform group-hover:scale-110">

                <FaHeart />

              </div>

              <div>

                <p className="text-2xl font-extrabold text-gray-800">
                  48
                </p>

                <p className="text-xs text-gray-500">
                  Favorites
                </p>

              </div>

            </div>

          </div>


          <div className="group rounded-2xl border border-white/80 bg-white/55 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-500 transition-transform group-hover:scale-110">

                <FaDownload />

              </div>

              <div>

                <p className="text-2xl font-extrabold text-gray-800">
                  126
                </p>

                <p className="text-xs text-gray-500">
                  Downloads
                </p>

              </div>

            </div>

          </div>


          <div className="group rounded-2xl border border-white/80 bg-white/55 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600 transition-transform group-hover:scale-110">

                <FaShieldAlt />

              </div>

              <div>

                <p className="text-sm font-bold text-green-600">
                  Protected
                </p>

                <p className="text-xs text-gray-500">
                  Account Status
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            CONTENT GRID
        ====================================================== */}

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">


          {/* =================================================
              PERSONAL INFORMATION
          ================================================== */}

          <div
            className="
              rounded-[30px]
              border
              border-white/80
              bg-white/55
              p-6
              shadow-[0_20px_60px_rgba(124,58,237,0.08)]
              backdrop-blur-2xl
              md:p-8
            "
          >

            <div className="mb-7 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your account information
                </p>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">

                <FaUserEdit />

              </div>

            </div>


            <div className="grid gap-5 md:grid-cols-2">


              {/* Name */}

              <div className="rounded-2xl border border-purple-100 bg-white/60 p-4 transition-all hover:border-purple-200 hover:shadow-sm">

                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">

                  <FaUserEdit className="text-purple-500" />

                  FULL NAME

                </div>

                <p className="mt-2 font-semibold text-gray-800">

                  {user?.name || "Dinkar Paswan"}

                </p>

              </div>


              {/* Email */}

              <div className="rounded-2xl border border-purple-100 bg-white/60 p-4 transition-all hover:border-purple-200 hover:shadow-sm">

                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">

                  <FaEnvelope className="text-purple-500" />

                  EMAIL ADDRESS

                </div>

                <p className="mt-2 break-all font-semibold text-gray-800">

                  {user?.email || "dinkar@gmail.com"}

                </p>

              </div>


              {/* Phone */}

              <div className="rounded-2xl border border-purple-100 bg-white/60 p-4 transition-all hover:border-purple-200 hover:shadow-sm">

                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">

                  <FaPhoneAlt className="text-purple-500" />

                  PHONE NUMBER

                </div>

                <p className="mt-2 font-semibold text-gray-800">

                  {user?.phoneNumber || "+91 9876543210"}

                </p>

              </div>


              {/* Address */}

              <div className="rounded-2xl border border-purple-100 bg-white/60 p-4 transition-all hover:border-purple-200 hover:shadow-sm">

                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">

                  <FaMapMarkerAlt className="text-purple-500" />

                  ADDRESS

                </div>

                <p className="mt-2 font-semibold text-gray-800">

                  {user?.address || "Begusarai, Bihar"}

                </p>

              </div>


              {/* Account type */}

              <div className="rounded-2xl border border-purple-100 bg-white/60 p-4 transition-all hover:border-purple-200 hover:shadow-sm">

                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">

                  <FaCamera className="text-purple-500" />

                  ACCOUNT TYPE

                </div>

                <p className="mt-2 font-semibold text-purple-700">

                  {user?.userType || "Wedding Client"}

                </p>

              </div>


              {/* Joined */}

              <div className="rounded-2xl border border-purple-100 bg-white/60 p-4 transition-all hover:border-purple-200 hover:shadow-sm">

                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">

                  <FaCalendarAlt className="text-purple-500" />

                  MEMBER SINCE

                </div>

                <p className="mt-2 font-semibold text-gray-800">
                  2026
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              QUICK ACTIONS
          ================================================== */}

          <div>

            <div className="mb-5">

              <h2 className="text-2xl font-bold text-gray-800">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your account easily
              </p>

            </div>


            <div className="space-y-4">

              {actionItems.map((item) => {

                const Icon = item.icon;

                return (

                  <button
                    key={item.title}
                    onClick={item.action}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      gap-4
                      rounded-2xl
                      border
                      border-white/80
                      bg-white/55
                      p-4
                      text-left
                      shadow-sm
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-purple-200
                      hover:shadow-lg
                    "
                  >

                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        transition-all
                        duration-300
                        group-hover:scale-110
                        ${
                          item.color === "pink"
                            ? "bg-pink-100 text-pink-500"
                            : item.color === "blue"
                            ? "bg-blue-100 text-blue-500"
                            : item.color === "violet"
                            ? "bg-violet-100 text-violet-600"
                            : "bg-purple-100 text-purple-600"
                        }
                      `}
                    >

                      <Icon />

                    </div>


                    <div className="flex-1">

                      <p className="font-bold text-gray-800">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.subtitle}
                      </p>

                    </div>


                    <FaArrowRight
                      className="
                        text-gray-300
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-purple-500
                      "
                    />

                  </button>

                );

              })}


              {/* LOGOUT */}

              <button
                onClick={async () => {
                  await dispatch(userLogout());
                  navigate("/");
                }}
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-red-100
                  bg-red-50/60
                  p-4
                  text-left
                  shadow-sm
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-red-200
                  hover:bg-red-50
                  hover:shadow-lg
                "
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-500 transition-transform duration-300 group-hover:scale-110">

                  <FaSignOutAlt />

                </div>


                <div className="flex-1">

                  <p className="font-bold text-red-600">
                    Logout
                  </p>

                  <p className="mt-1 text-xs text-red-400">
                    Sign out of your account
                  </p>

                </div>


                <FaArrowRight
                  className="
                    text-red-300
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-red-500
                  "
                />

              </button>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM SECURITY CARD
        ====================================================== */}

        <div className="mt-8 overflow-hidden rounded-3xl border border-purple-100 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 p-6 text-white shadow-[0_20px_60px_rgba(124,58,237,0.2)]">

          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-xl">

                <FaShieldAlt className="text-xl" />

              </div>

              <div>

                <h3 className="text-lg font-bold">
                  Your memories are protected
                </h3>

                <p className="mt-1 text-sm text-purple-100">
                  Your personal information and albums are securely stored.
                </p>

              </div>

            </div>


            <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-md">

              <FaCheckCircle />

              Secure Account

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          ANIMATION CSS
      ====================================================== */}

      <style>{`

        @keyframes profileFloat {

          0% {
            transform: translate(0px, 0px);
          }

          50% {
            transform: translate(-25px, -25px);
          }

          100% {
            transform: translate(0px, 0px);
          }

        }


        @keyframes smallFloat {

          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-20px);
          }

          100% {
            transform: translateY(0px);
          }

        }


        @keyframes profileRotate {

          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }

        }

      `}</style>

    </div>
  );
};

export default Profile;