// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   FaUsers,
//   FaCalendarCheck,
//   FaImages,
//   FaRupeeSign,
//   FaClock,
//   FaCheckCircle,
//   FaCamera,
//   FaArrowRight,
// } from "react-icons/fa";
// import { getUserByFilter } from "../../app/auth/authThunk";
// import { getMediaByFilter } from "../../app/media/mediaThunk";

// const AdminDashboard = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalAlbums: 0,
//     totalImages: 0,
//     totalVideos: 0,
//   });

//   const [showAlbumDetails, setShowAlbumDetails] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardCounts = async () => {
//       try {
//         const usersResult = await dispatch(
//           getUserByFilter({ page: 1, limit: "All" }),
//         ).unwrap();

//         const albumsResult = await dispatch(
//           getMediaByFilter({ page: 1, limit: "All" }),
//         ).unwrap();

//         const imagesResult = await dispatch(
//           getMediaByFilter({
//             page: 1,
//             limit: "All",
//             mediaType: "Image",
//           }),
//         ).unwrap();

//         const videosResult = await dispatch(
//           getMediaByFilter({
//             page: 1,
//             limit: "All",
//             mediaType: "Video",
//           }),
//         ).unwrap();

//         setStats({
//           totalUsers: usersResult.totalUsers || 0,
//           totalAlbums: albumsResult.totalRecords || 0,
//           totalImages: imagesResult.totalRecords || 0,
//           totalVideos: videosResult.totalRecords || 0,
//         });
//       } catch (error) {
//         console.error("Dashboard stats fetch failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardCounts();
//   }, [dispatch]);

//   const cardData = [
//     {
//       title: "Total Users",
//       value: loading ? "Loading..." : stats.totalUsers,
//       icon: <FaUsers />,
//       bg: "bg-blue-100",
//       color: "text-blue-600",
//       path: "/admin/users",
//     },
//     {
//       title: "Bookings",
//       value: "356",
//       icon: <FaCalendarCheck />,
//       bg: "bg-green-100",
//       color: "text-green-600",
//     },
//     {
//       title: "Albums",
//       value: loading ? "Loading..." : stats.totalAlbums,
//       icon: <FaImages />,
//       bg: "bg-purple-100",
//       color: "text-purple-600",
//       hasDropdown: true,
//       path: "/admin/albums",
//     },
//     {
//       title: "Revenue",
//       value: "₹12.8L",
//       icon: <FaRupeeSign />,
//       bg: "bg-yellow-100",
//       color: "text-yellow-600",
//     },
//   ];

//   const bookings = [
//     {
//       id: "BK-1001",
//       customer: "Rahul Kumar",
//       event: "Wedding",
//       date: "25 Dec 2026",
//       status: "Pending",
//     },
//     {
//       id: "BK-1002",
//       customer: "Priya Singh",
//       event: "Engagement",
//       date: "28 Dec 2026",
//       status: "Confirmed",
//     },
//     {
//       id: "BK-1003",
//       customer: "Ankit Raj",
//       event: "Reception",
//       date: "30 Dec 2026",
//       status: "Pending",
//     },
//   ];

//   const events = [
//     "Wedding Shoot - Patna",
//     "Reception - Begusarai",
//     "Birthday Shoot - Delhi",
//     "Pre Wedding - Ranchi",
//   ];

//   return (
//     <div className="space-y-8">
//       <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
//         <h1 className="text-4xl font-bold">Welcome Admin 👋</h1>
//         <p className="mt-3 text-purple-100">
//           Manage bookings, events, users and albums from one dashboard.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
//         {cardData.map((item, index) => (
//           <div
//             key={index}
//             onClick={() => item.path && navigate(item.path)}
//             className={`bg-white rounded-2xl shadow-sm hover:shadow-xl duration-300 p-6 flex flex-col justify-between ${
//               item.path ? "cursor-pointer hover:bg-gray-50" : ""
//             }`}
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-gray-500">{item.title}</p>
//                 <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
//               </div>
//               <div
//                 className={`w-16 h-16 rounded-2xl flex justify-center items-center text-3xl ${item.bg} ${item.color}`}
//               >
//                 {item.icon}
//               </div>
//             </div>

//             {item.hasDropdown && (
//               <div className="mt-5">
//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setShowAlbumDetails((prev) => !prev);
//                   }}
//                   className="text-sm font-medium text-purple-600 hover:text-purple-800"
//                 >
//                   {showAlbumDetails ? "Hide album details" : "Show album details"}
//                 </button>

//                 {showAlbumDetails && (
//                   <div className="mt-3 rounded-2xl bg-purple-50 p-4 text-sm text-gray-700">
//                     <div className="flex justify-between">
//                       <span>Images</span>
//                       <strong>{stats.totalImages}</strong>
//                     </div>
//                     <div className="flex justify-between mt-2">
//                       <span>Videos</span>
//                       <strong>{stats.totalVideos}</strong>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Recent Bookings</h2>
//             <button className="text-purple-600 flex items-center gap-2">
//               View All
//               <FaArrowRight />
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left py-3">Booking ID</th>
//                   <th className="text-left py-3">Customer</th>
//                   <th className="text-left py-3">Event</th>
//                   <th className="text-left py-3">Date</th>
//                   <th className="text-left py-3">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookings.map((booking) => (
//                   <tr key={booking.id} className="border-b hover:bg-gray-50">
//                     <td className="py-4">{booking.id}</td>
//                     <td>{booking.customer}</td>
//                     <td>{booking.event}</td>
//                     <td>{booking.date}</td>
//                     <td>
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm ${
//                           booking.status === "Confirmed"
//                             ? "bg-green-100 text-green-600"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         {booking.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-xl font-bold mb-5">Today's Events</h2>
//             <div className="space-y-4">
//               {events.map((event, index) => (
//                 <div key={index} className="flex items-center gap-4">
//                   <div className="w-10 h-10 rounded-full bg-purple-100 flex justify-center items-center">
//                     <FaCamera className="text-purple-600" />
//                   </div>
//                   <p>{event}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow p-6">
//             <h2 className="text-xl font-bold mb-5">Booking Status</h2>
//             <div className="space-y-5">
//               <div className="flex justify-between">
//                 <span className="flex items-center gap-2">
//                   <FaClock className="text-yellow-500" />
//                   Pending
//                 </span>
//                 <strong>21</strong>
//               </div>
//               <div className="flex justify-between">
//                 <span className="flex items-center gap-2">
//                   <FaCheckCircle className="text-green-600" />
//                   Confirmed
//                 </span>
//                 <strong>48</strong>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaCalendarCheck,
  FaImages,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaCamera,
  FaArrowRight,
  FaChartLine,
  FaPhotoVideo,
  FaUserFriends,
} from "react-icons/fa";

import { getUserByFilter } from "../../app/auth/authThunk";
import { getMediaByFilter } from "../../app/media/mediaThunk";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAlbums: 0,
    totalImages: 0,
    totalVideos: 0,
  });

  const [showAlbumDetails, setShowAlbumDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const usersResult = await dispatch(
          getUserByFilter({
            page: 1,
            limit: "All",
          })
        ).unwrap();

        const albumsResult = await dispatch(
          getMediaByFilter({
            page: 1,
            limit: "All",
          })
        ).unwrap();

        const imagesResult = await dispatch(
          getMediaByFilter({
            page: 1,
            limit: "All",
            mediaType: "Image",
          })
        ).unwrap();

        const videosResult = await dispatch(
          getMediaByFilter({
            page: 1,
            limit: "All",
            mediaType: "Video",
          })
        ).unwrap();

        setStats({
          totalUsers: usersResult.totalUsers || 0,
          totalAlbums: albumsResult.totalRecords || 0,
          totalImages: imagesResult.totalRecords || 0,
          totalVideos: videosResult.totalRecords || 0,
        });
      } catch (error) {
        console.error(
          "Dashboard stats fetch failed:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardCounts();
  }, [dispatch]);

  const cardData = [
    {
      title: "Total Users",
      value: loading ? "..." : stats.totalUsers,
      icon: <FaUsers />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      accent: "from-blue-500 to-cyan-500",
      path: "/admin/users",
      description: "Registered clients",
    },

    {
      title: "Bookings",
      value: "356",
      icon: <FaCalendarCheck />,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      accent: "from-emerald-500 to-teal-500",
      description: "Total reservations",
    },

    {
      title: "Albums",
      value: loading ? "..." : stats.totalAlbums,
      icon: <FaImages />,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      accent: "from-purple-500 to-fuchsia-500",
      path: "/admin/albums",
      hasDropdown: true,
      description: "Created albums",
    },

    {
      title: "Revenue",
      value: "₹12.8L",
      icon: <FaRupeeSign />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      accent: "from-amber-400 to-orange-500",
      description: "Total earnings",
    },
  ];

  const bookings = [
    {
      id: "BK-1001",
      customer: "Rahul Kumar",
      event: "Wedding",
      date: "25 Dec 2026",
      status: "Pending",
    },

    {
      id: "BK-1002",
      customer: "Priya Singh",
      event: "Engagement",
      date: "28 Dec 2026",
      status: "Confirmed",
    },

    {
      id: "BK-1003",
      customer: "Ankit Raj",
      event: "Reception",
      date: "30 Dec 2026",
      status: "Pending",
    },
    {
      id: "BK-1001",
      customer: "Rahul Kumar",
      event: "Wedding",
      date: "25 Dec 2026",
      status: "Pending",
    },

    {
      id: "BK-1002",
      customer: "Priya Singh",
      event: "Engagement",
      date: "28 Dec 2026",
      status: "Confirmed",
    },

    {
      id: "BK-1003",
      customer: "Ankit Raj",
      event: "Reception",
      date: "30 Dec 2026",
      status: "Pending",
    },
    
  ];

  const events = [
    "Wedding Shoot - Patna",
    "Reception - Begusarai",
    "Birthday Shoot - Delhi",
    "Pre Wedding - Ranchi",
  ];

  return (
    <div className="dashboard-page relative space-y-8 pb-8">

      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div
          className="
            dashboard-pulse
            absolute
            -left-32
            top-20
            h-80
            w-80
            rounded-full
            bg-purple-300/20
            blur-3xl
          "
        />

        <div
          className="
            dashboard-pulse
            absolute
            right-0
            top-80
            h-96
            w-96
            rounded-full
            bg-indigo-300/20
            blur-3xl
          "
        />

      </div>


      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="
          dashboard-item
          dashboard-shimmer
          relative
          overflow-hidden
          rounded-[30px]
          bg-gradient-to-br
          from-[#4c1d95]
          via-[#6d28d9]
          to-[#7c3aed]
          px-6
          py-8
          text-white
          shadow-[0_20px_60px_rgba(109,40,217,0.25)]
          sm:px-8
          lg:px-10
        "
      >

        {/* Decorative circles */}

        <div
          className="
            absolute
            -right-20
            -top-28
            h-80
            w-80
            rounded-full
            border-[35px]
            border-white/10
          "
        />

        <div
          className="
            absolute
            -bottom-24
            left-1/3
            h-64
            w-64
            rounded-full
            bg-white/5
            blur-2xl
          "
        />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/20
                bg-white/10
                px-4
                py-2
                text-sm
                font-medium
                backdrop-blur-md
              "
            >
              <FaCamera />

              Album Studio Admin Panel
            </div>


            <h1
              className="
                text-3xl
                font-extrabold
                tracking-tight
                sm:text-4xl
                lg:text-5xl
              "
            >
              Welcome Admin 👋
            </h1>


            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-purple-100
                sm:text-base
              "
            >
              Manage your clients, bookings, events and
              beautiful memories from one powerful dashboard.
            </p>


            <div className="mt-6 flex flex-wrap gap-3">

              <button
                onClick={() => navigate("/admin/users")}
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  font-bold
                  text-purple-700
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >

                <FaUserFriends />

                Manage Users

                <FaArrowRight
                  className="
                    text-xs
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </button>


              <button
                onClick={() => navigate("/admin/albums")}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/25
                  bg-white/10
                  px-5
                  py-3
                  font-semibold
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:bg-white/20
                "
              >

                <FaImages />

                View Albums

              </button>

            </div>

          </div>


          {/* Hero icon */}

          <div
            className="
              dashboard-float
              hidden
              h-36
              w-36
              items-center
              justify-center
              rounded-[35px]
              border
              border-white/20
              bg-white/10
              text-7xl
              shadow-2xl
              backdrop-blur-md
              lg:flex
            "
          >
            📸
          </div>

        </div>

      </section>


      {/* =================================================
          STAT CARDS
      ================================================= */}

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {cardData.map((item, index) => (

          <div
            key={item.title}
            onClick={() =>
              item.path && navigate(item.path)
            }
            style={{
              animationDelay: `${index * 100}ms`,
            }}
            className={`
              dashboard-item
              dashboard-card
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-gray-100
              bg-white
              p-6
              shadow-sm
              ${
                item.path
                  ? "cursor-pointer"
                  : ""
              }
            `}
          >

            {/* Top gradient line */}

            <div
              className={`
                absolute
                left-0
                right-0
                top-0
                h-1
                bg-gradient-to-r
                ${item.accent}
              `}
            />


            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-semibold text-gray-500">
                  {item.title}
                </p>


                <h2
                  className="
                    mt-2
                    text-3xl
                    font-extrabold
                    tracking-tight
                    text-gray-800
                  "
                >
                  {item.value}
                </h2>


                <p className="mt-2 text-xs text-gray-400">
                  {item.description}
                </p>

              </div>


              <div
                className={`
                  dashboard-icon
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  text-2xl
                  shadow-sm
                  ${item.iconBg}
                  ${item.iconColor}
                `}
              >
                {item.icon}
              </div>

            </div>


            {/* Album dropdown */}

            {item.hasDropdown && (

              <div className="mt-5">

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    setShowAlbumDetails(
                      (prev) => !prev
                    );
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    bg-purple-50
                    px-4
                    py-3
                    text-sm
                    font-bold
                    text-purple-600
                    transition
                    hover:bg-purple-100
                  "
                >

                  <span>
                    {showAlbumDetails
                      ? "Hide details"
                      : "View album details"}
                  </span>

                  <FaArrowRight
                    className={`
                      transition-transform
                      duration-300
                      ${
                        showAlbumDetails
                          ? "rotate-90"
                          : ""
                      }
                    `}
                  />

                </button>


                {showAlbumDetails && (

                  <div
                    className="
                      mt-3
                      space-y-3
                      rounded-2xl
                      border
                      border-purple-100
                      bg-purple-50/70
                      p-4
                      text-sm
                    "
                  >

                    <div className="flex items-center justify-between">

                      <span className="flex items-center gap-2 text-gray-600">

                        <FaImages className="text-purple-500" />

                        Images

                      </span>

                      <strong className="text-gray-800">
                        {stats.totalImages}
                      </strong>

                    </div>


                    <div className="flex items-center justify-between">

                      <span className="flex items-center gap-2 text-gray-600">

                        <FaPhotoVideo className="text-pink-500" />

                        Videos

                      </span>

                      <strong className="text-gray-800">
                        {stats.totalVideos}
                      </strong>

                    </div>

                  </div>

                )}

              </div>

            )}

          </div>

        ))}

      </section>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <section className="grid gap-8 lg:grid-cols-3">

        {/* =================================================
            RECENT BOOKINGS
        ================================================= */}

        <div
          className="
            dashboard-item
            overflow-hidden
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-sm
            lg:col-span-2
          "
        >

          {/* Header */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-b
              border-gray-100
              p-6
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div>

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-purple-100
                    text-purple-600
                  "
                >
                  <FaCalendarCheck />
                </div>


                <div>

                  <h2 className="text-xl font-extrabold text-gray-800">
                    Recent Bookings
                  </h2>

                  <p className="text-xs text-gray-400">
                    Latest customer reservations
                  </p>

                </div>

              </div>

            </div>


            <button
              onClick={() => navigate("/admin/bookings")}
              className="
                group
                flex
                items-center
                gap-2
                self-start
                rounded-xl
                bg-purple-50
                px-4
                py-2.5
                text-sm
                font-bold
                text-purple-600
                transition-all
                duration-300
                hover:bg-purple-600
                hover:text-white
              "
            >

              View All

              <FaArrowRight
                className="
                  text-xs
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </button>

          </div>


          {/* Table */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[680px]">

              <thead>

                <tr className="bg-gray-50/80">

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                    Booking ID
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                    Event
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {bookings.map((booking, index) => (

                  <tr
                    key={booking.id}
                    style={{
                      animationDelay: `${300 + index * 100}ms`,
                    }}
                    className="
                      dashboard-row
                      border-b
                      border-gray-50
                    "
                  >

                    <td className="px-6 py-5">

                      <span
                        className="
                          rounded-lg
                          bg-purple-50
                          px-3
                          py-2
                          text-xs
                          font-extrabold
                          text-purple-600
                        "
                      >
                        {booking.id}
                      </span>

                    </td>


                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-purple-500
                            to-indigo-500
                            text-xs
                            font-bold
                            text-white
                          "
                        >
                          {booking.customer
                            .charAt(0)}
                        </div>

                        <span className="font-semibold text-gray-700">
                          {booking.customer}
                        </span>

                      </div>

                    </td>


                    <td className="px-6 py-5">

                      <span className="text-sm text-gray-600">
                        {booking.event}
                      </span>

                    </td>


                    <td className="px-6 py-5">

                      <span className="text-sm text-gray-500">
                        {booking.date}
                      </span>

                    </td>


                    <td className="px-6 py-5">

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          px-3
                          py-1.5
                          text-xs
                          font-bold
                          ${
                            booking.status ===
                            "Confirmed"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        `}
                      >

                        <span className="h-1.5 w-1.5 rounded-full bg-current" />

                        {booking.status}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="space-y-6">


          {/* Today's Events */}

          <div
            className="
              dashboard-item
              rounded-2xl
              border
              border-gray-100
              bg-white
              p-6
              shadow-sm
            "
          >

            <div className="mb-6 flex items-center gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-orange-100
                  text-orange-500
                "
              >
                <FaCamera />
              </div>


              <div>

                <h2 className="text-xl font-extrabold text-gray-800">
                  Today's Events
                </h2>

                <p className="text-xs text-gray-400">
                  Scheduled shoots
                </p>

              </div>

            </div>


            <div className="space-y-3">

              {events.map((event, index) => (

                <div
                  key={event}
                  className="
                    dashboard-event
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-gray-100
                    bg-gray-50/70
                    p-3
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-purple-100
                      text-purple-600
                    "
                  >
                    <FaCamera />
                  </div>


                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold text-gray-700">
                      {event}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      Event #{index + 1}
                    </p>

                  </div>


                  <FaArrowRight className="text-xs text-gray-300" />

                </div>

              ))}

            </div>

          </div>


          {/* Booking Status */}

          <div
            className="
              dashboard-item
              rounded-2xl
              border
              border-gray-100
              bg-white
              p-6
              shadow-sm
            "
          >

            <div className="mb-6 flex items-center gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                "
              >
                <FaChartLine />
              </div>


              <div>

                <h2 className="text-xl font-extrabold text-gray-800">
                  Booking Status
                </h2>

                <p className="text-xs text-gray-400">
                  Current booking overview
                </p>

              </div>

            </div>


            <div className="space-y-5">

              {/* Pending */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <span
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-gray-600
                    "
                  >

                    <FaClock className="text-yellow-500" />

                    Pending

                  </span>

                  <strong className="text-gray-800">
                    21
                  </strong>

                </div>


                <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="
                      h-full
                      w-[30%]
                      rounded-full
                      bg-gradient-to-r
                      from-yellow-400
                      to-orange-400
                    "
                  />

                </div>

              </div>


              {/* Confirmed */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <span
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-gray-600
                    "
                  >

                    <FaCheckCircle className="text-green-500" />

                    Confirmed

                  </span>

                  <strong className="text-gray-800">
                    48
                  </strong>

                </div>


                <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="
                      h-full
                      w-[70%]
                      rounded-full
                      bg-gradient-to-r
                      from-green-400
                      to-emerald-500
                    "
                  />

                </div>

              </div>

            </div>


            {/* Summary */}

            <div
              className="
                mt-6
                rounded-xl
                bg-gradient-to-r
                from-purple-50
                to-indigo-50
                p-4
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-medium text-gray-400">
                    Total Active
                  </p>

                  <p className="mt-1 text-2xl font-extrabold text-purple-700">
                    69
                  </p>

                </div>


                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-purple-600
                    shadow-sm
                  "
                >
                  <FaCalendarCheck />
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default AdminDashboard;