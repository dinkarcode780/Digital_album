import React from "react";
import {
  FaSearch,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
} from "react-icons/fa";

const bookings = [
  {
    id: "BK-1001",
    customer: "Rahul Kumar",
    phone: "+91 9876543210",
    event: "Wedding",
    date: "25 Dec 2026",
    location: "Begusarai",
    status: "Pending",
  },
  {
    id: "BK-1002",
    customer: "Priya Sharma",
    phone: "+91 9123456789",
    event: "Engagement",
    date: "28 Dec 2026",
    location: "Patna",
    status: "Confirmed",
  },
  {
    id: "BK-1003",
    customer: "Ankit Raj",
    phone: "+91 9876501234",
    event: "Birthday",
    date: "30 Dec 2026",
    location: "Muzaffarpur",
    status: "Pending",
  },
  {
    id: "BK-1004",
    customer: "Neha Kumari",
    phone: "+91 9988776655",
    event: "Reception",
    date: "02 Jan 2027",
    location: "Darbhanga",
    status: "Completed",
  },
];

const BookingPage = () => {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Booking Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all customer bookings.
          </p>

        </div>

        <div className="relative w-full md:w-80">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search booking..."
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-3">

        <button className="bg-purple-600 text-white px-5 py-2 rounded-full">
          All
        </button>

        <button className="border px-5 py-2 rounded-full">
          Pending
        </button>

        <button className="border px-5 py-2 rounded-full">
          Confirmed
        </button>

        <button className="border px-5 py-2 rounded-full">
          Completed
        </button>

        <button className="border px-5 py-2 rounded-full">
          Cancelled
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left p-4">Booking ID</th>

              <th className="text-left p-4">Customer</th>

              <th className="text-left p-4">Phone</th>

              <th className="text-left p-4">Event</th>

              <th className="text-left p-4">Date</th>

              <th className="text-left p-4">Location</th>

              <th className="text-left p-4">Status</th>

              <th className="text-center p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-medium">
                  {booking.id}
                </td>

                <td className="p-4">
                  {booking.customer}
                </td>

                <td className="p-4">
                  {booking.phone}
                </td>

                <td className="p-4">
                  {booking.event}
                </td>

                <td className="p-4 flex items-center gap-2">

                  <FaCalendarAlt className="text-purple-600" />

                  {booking.date}

                </td>

                <td className="p-4">
                  {booking.location}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {booking.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition">

                      <FaEye />

                    </button>

                    <button className="w-10 h-10 rounded-lg bg-green-100 text-green-600 hover:bg-green-600 hover:text-white transition">

                      <FaCheckCircle />

                    </button>

                    <button className="w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition">

                      <FaTimesCircle />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default BookingPage;