import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaImages,
  FaCalendarCheck,
  FaHeart,
  FaDownload,
  FaEdit,
} from "react-icons/fa";

const albums = [
  {
    id: 1,
    title: "Rahul & Priya Wedding",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
    date: "25 May 2026",
  },
  {
    id: 2,
    title: "Engagement Ceremony",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    date: "12 June 2026",
  },
  {
    id: 3,
    title: "Birthday Celebration",
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600",
    date: "18 July 2026",
  },
];

const bookings = [
  {
    id: "BK1001",
    event: "Wedding",
    date: "25 Dec 2026",
    status: "Confirmed",
  },
  {
    id: "BK1002",
    event: "Reception",
    date: "28 Dec 2026",
    status: "Pending",
  },
];

const UserDetailsPage = () => {
  return (
    <div className="space-y-8">

      {/* Back */}

      <Link
        to="/admin/users"
        className="inline-flex items-center gap-2 text-purple-600 font-semibold"
      >
        <FaArrowLeft />
        Back to Users
      </Link>

      {/* Profile */}

      <div className="bg-white rounded-2xl shadow p-8">

        <div className="flex flex-col lg:flex-row gap-8">

          <img
            src="https://i.pravatar.cc/200?img=11"
            alt=""
            className="w-40 h-40 rounded-full object-cover border-4 border-purple-500"
          />

          <div className="flex-1">

            <div className="flex justify-between items-start flex-wrap gap-4">

              <div>

                <h1 className="text-4xl font-bold">
                  Dinkar Paswan
                </h1>

                <p className="text-gray-500 mt-2">
                  Registered User
                </p>

              </div>

              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-3">

                <FaEdit />

                Edit User

              </button>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

              <div className="flex items-center gap-3">

                <FaEnvelope className="text-purple-600" />

                dinkar@gmail.com

              </div>

              <div className="flex items-center gap-3">

                <FaPhone className="text-green-600" />

                +91 9876543210

              </div>

              <div className="flex items-center gap-3">

                <FaMapMarkerAlt className="text-red-500" />

                Begusarai, Bihar

              </div>

              <div className="flex items-center gap-3">

                <FaCalendarAlt className="text-blue-600" />

                Joined : 15 Jan 2026

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <FaImages className="text-4xl text-purple-600 mx-auto" />

          <h2 className="text-3xl font-bold mt-3">
            8
          </h2>

          <p>Total Albums</p>

        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <FaCalendarCheck className="text-4xl text-green-600 mx-auto" />

          <h2 className="text-3xl font-bold mt-3">
            5
          </h2>

          <p>Total Bookings</p>

        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <FaHeart className="text-4xl text-pink-600 mx-auto" />

          <h2 className="text-3xl font-bold mt-3">
            124
          </h2>

          <p>Favorites</p>

        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <FaDownload className="text-4xl text-orange-500 mx-auto" />

          <h2 className="text-3xl font-bold mt-3">
            45
          </h2>

          <p>Downloads</p>

        </div>

      </div>

      {/* Albums */}

      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            User Albums
          </h2>

          <button className="text-purple-600 font-semibold">
            View All
          </button>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

          {albums.map((album) => (

            <div
              key={album.id}
              className="rounded-xl overflow-hidden border hover:shadow-lg transition"
            >

              <img
                src={album.image}
                alt=""
                className="w-full h-52 object-cover"
              />

              <div className="p-4">

                <h3 className="font-bold">
                  {album.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  {album.date}
                </p>

                <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg">
                  View Album
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Booking History */}

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Booking History
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Booking ID
                </th>

                <th className="text-left p-4">
                  Event
                </th>

                <th className="text-left p-4">
                  Date
                </th>

                <th className="text-left p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr
                  key={booking.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {booking.id}
                  </td>

                  <td className="p-4">
                    {booking.event}
                  </td>

                  <td className="p-4">
                    {booking.date}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
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

    </div>
  );
};

export default UserDetailsPage;