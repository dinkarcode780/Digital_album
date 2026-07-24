import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useState } from "react";
import CreateEventDialog from "../../components/admindilog/CreateEventDialog";

const events = [
  {
    id: 1,
    brideName: "Priya",
    groomName: "Rahul",
    category: "Wedding",
    eventDate: "12 Jul 2026",
    eventEndDate: "13 Jul 2026",
    location: "Patna",
    status: "Upcoming",
  },
  {
    id: 2,
    brideName: "Neha",
    groomName: "Amit",
    category: "Engagement",
    eventDate: "20 Jul 2026",
    eventEndDate: "20 Jul 2026",
    location: "Delhi",
    status: "Ongoing",
  },
  {
    id: 3,
    brideName: "Anjali",
    groomName: "Rohit",
    category: "Birthday",
    eventDate: "05 Jul 2026",
    eventEndDate: "05 Jul 2026",
    location: "Kolkata",
    status: "Completed",
  },
];

const EventPage = () => {

    const [openCreate, setOpenCreate] = useState(false);

const handleCreate = (data) => {
  console.log(data);

  // createEvent API
};
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold">
            Events
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all events.
          </p>

        </div>

        {/* <Link
          to="/admin/events/create"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-3"
        >
          <FaPlus />
          Create Event
        </Link> */}
        <button
  onClick={() => setOpenCreate(true)}
  className="bg-purple-600 text-white px-6 py-3 rounded-xl"
>
  Create Event
</button>

      </div>

      {/* Search */}

      <div className="flex flex-col lg:flex-row gap-4">

        <div className="relative flex-1">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Event..."
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

        <select className="border rounded-xl px-5 py-3">

          <option>All Status</option>

          <option>Upcoming</option>

          <option>Ongoing</option>

          <option>Completed</option>

        </select>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Couple</th>

              <th className="text-left p-4">Category</th>

              <th className="text-left p-4">Start Date</th>

              <th className="text-left p-4">End Date</th>

              <th className="text-left p-4">Location</th>

              <th className="text-left p-4">Status</th>

              <th className="text-center p-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {events.map((event) => (

              <tr
                key={event.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-semibold">
                  {event.groomName} & {event.brideName}
                </td>

                <td className="p-4">
                  {event.category}
                </td>

                <td className="p-4">
                  {event.eventDate}
                </td>

                <td className="p-4">
                  {event.eventEndDate}
                </td>

                <td className="p-4">
                  {event.location}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      event.status === "Upcoming"
                        ? "bg-yellow-100 text-yellow-700"
                        : event.status === "Ongoing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {event.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center">

                      <FaEye />

                    </button>

                    <button className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white flex items-center justify-center">

                      <FaEdit />

                    </button>

                    <button className="w-10 h-10 rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center">

                      <FaTrash />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      <CreateEventDialog
  open={openCreate}
  onClose={() => setOpenCreate(false)}
  onCreate={handleCreate}
/>

    </div>
  );
};

export default EventPage;