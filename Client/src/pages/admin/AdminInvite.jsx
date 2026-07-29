import React from "react";

const AdminInvite = () => {
  return (
    <div className="p-6">

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Invite Client
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="font-medium">
              Select Event
            </label>

            <select className="w-full mt-2 border rounded-lg p-3 outline-none">
              <option>Select Event</option>
            </select>
          </div>

          <div>
            <label className="font-medium">
              Client Name
            </label>

            <input
              type="text"
              placeholder="Enter client name"
              className="w-full mt-2 border rounded-lg p-3 outline-none"
            />
          </div>

          <div>
            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full mt-2 border rounded-lg p-3 outline-none"
            />
          </div>

          <div>
            <label className="font-medium">
              Phone Number
            </label>

            <input
              type="number"
              placeholder="Enter phone number"
              className="w-full mt-2 border rounded-lg p-3 outline-none"
            />
          </div>

        </div>

        <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg">
          Send Invite
        </button>

      </div>

      {/* Invite List */}

      <div className="bg-white rounded-xl shadow mt-8 p-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-2xl font-bold">
            Invited Clients
          </h2>

          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg p-2 w-64"
          />

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">Name</th>

                <th className="p-3 text-left">Event</th>

                <th className="p-3 text-left">Email</th>

                <th className="p-3 text-left">Phone</th>

                <th className="p-3 text-left">Status</th>

                <th className="p-3 text-center">Action</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="p-3">Rahul</td>

                <td className="p-3">Wedding Album</td>

                <td className="p-3">rahul@gmail.com</td>

                <td className="p-3">9876543210</td>

                <td className="p-3">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Pending
                  </span>
                </td>

                <td className="p-3 flex justify-center gap-3">

                  <button className="bg-blue-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>

                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminInvite;