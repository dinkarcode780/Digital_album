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
        const [usersRes, albumsRes, imagesRes, videosRes] = await Promise.allSettled([
          dispatch(getUserByFilter({ page: 1, limit: "All" })).unwrap(),
          dispatch(getMediaByFilter({ page: 1, limit: "All" })).unwrap(),
          dispatch(getMediaByFilter({ page: 1, limit: "All", mediaType: "Image" })).unwrap(),
          dispatch(getMediaByFilter({ page: 1, limit: "All", mediaType: "Video" })).unwrap(),
        ]);

        const usersResult = usersRes.status === "fulfilled" ? usersRes.value : null;
        const albumsResult = albumsRes.status === "fulfilled" ? albumsRes.value : null;
        const imagesResult = imagesRes.status === "fulfilled" ? imagesRes.value : null;
        const videosResult = videosRes.status === "fulfilled" ? videosRes.value : null;

        const totalUsers =
          usersResult?.totalUsers ??
          usersResult?.totalRecords ??
          (Array.isArray(usersResult?.data) ? usersResult.data.length : 0);

        const totalAlbums =
          albumsResult?.totalRecords ??
          (Array.isArray(albumsResult?.data) ? albumsResult.data.length : 0);

        const totalImages =
          imagesResult?.totalRecords ??
          (Array.isArray(imagesResult?.data) ? imagesResult.data.length : 0);

        const totalVideos =
          videosResult?.totalRecords ??
          (Array.isArray(videosResult?.data) ? videosResult.data.length : 0);

        setStats({
          totalUsers,
          totalAlbums,
          totalImages,
          totalVideos,
        });
      } catch (error) {
        console.error("Dashboard stats fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardCounts();
  }, [dispatch]);

  const cardData = [
    {
      title: "Total Users",
      value: loading ? "Loading..." : stats.totalUsers,
      icon: <FaUsers />,
      bg: "bg-blue-100",
      color: "text-blue-600",
      path: "/admin/users",
    },
    {
      title: "Bookings",
      value: "356",
      icon: <FaCalendarCheck />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Albums",
      value: loading ? "Loading..." : stats.totalAlbums,
      icon: <FaImages />,
      bg: "bg-purple-100",
      color: "text-purple-600",
      hasDropdown: true,
      path: "/admin/albums",
    },
    {
      title: "Revenue",
      value: "₹12.8L",
      icon: <FaRupeeSign />,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
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
  ];

  const events = [
    "Wedding Shoot - Patna",
    "Reception - Begusarai",
    "Birthday Shoot - Delhi",
    "Pre Wedding - Ranchi",
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
        <h1 className="text-4xl font-bold">Welcome Admin 👋</h1>
        <p className="mt-3 text-purple-100">
          Manage bookings, events, users and albums from one dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cardData.map((item, index) => (
          <div
            key={index}
            onClick={() => item.path && navigate(item.path)}
            className={`bg-white rounded-2xl shadow-sm hover:shadow-xl duration-300 p-6 flex flex-col justify-between ${
              item.path ? "cursor-pointer hover:bg-gray-50" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">{item.title}</p>
                <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
              </div>
              <div
                className={`w-16 h-16 rounded-2xl flex justify-center items-center text-3xl ${item.bg} ${item.color}`}
              >
                {item.icon}
              </div>
            </div>

            {item.hasDropdown && (
              <div className="mt-5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAlbumDetails((prev) => !prev);
                  }}
                  className="text-sm font-medium text-purple-600 hover:text-purple-800"
                >
                  {showAlbumDetails ? "Hide album details" : "Show album details"}
                </button>

                {showAlbumDetails && (
                  <div className="mt-3 rounded-2xl bg-purple-50 p-4 text-sm text-gray-700">
                    <div className="flex justify-between">
                      <span>Images</span>
                      <strong>{stats.totalImages}</strong>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span>Videos</span>
                      <strong>{stats.totalVideos}</strong>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Bookings</h2>
            <button className="text-purple-600 flex items-center gap-2">
              View All
              <FaArrowRight />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Booking ID</th>
                  <th className="text-left py-3">Customer</th>
                  <th className="text-left py-3">Event</th>
                  <th className="text-left py-3">Date</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.event}</td>
                    <td>{booking.date}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">Today's Events</h2>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex justify-center items-center">
                    <FaCamera className="text-purple-600" />
                  </div>
                  <p>{event}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-5">Booking Status</h2>
            <div className="space-y-5">
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <FaClock className="text-yellow-500" />
                  Pending
                </span>
                <strong>21</strong>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  Confirmed
                </span>
                <strong>48</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;