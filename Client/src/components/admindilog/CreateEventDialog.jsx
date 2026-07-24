import React, { useState } from "react";

const CreateEventDialog = ({ open, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    userId: "",
    eventSubCategoryId: "",
    brideName: "",
    groomName: "",
    eventDate: "",
    eventEndDate: "",
    location: "",
    status: "Upcoming",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onCreate(formData);

    setFormData({
      userId: "",
      eventSubCategoryId: "",
      brideName: "",
      groomName: "",
      eventDate: "",
      eventEndDate: "",
      location: "",
      status: "Upcoming",
    });

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl">

        {/* Header */}

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold">
            Create Event
          </h2>

        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">
                Bride Name
              </label>

              <input
                type="text"
                name="brideName"
                value={formData.brideName}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-semibold">
                Groom Name
              </label>

              <input
                type="text"
                name="groomName"
                value={formData.groomName}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">
                Select User
              </label>

              <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              >
                <option value="">
                  Select User
                </option>

                <option value="1">
                  Dinkar Paswan
                </option>

                <option value="2">
                  Rahul Kumar
                </option>

              </select>

            </div>

            <div>

              <label className="font-semibold">
                Event Category
              </label>

              <select
                name="eventSubCategoryId"
                value={formData.eventSubCategoryId}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              >

                <option value="">
                  Select Category
                </option>

                <option value="1">
                  Wedding
                </option>

                <option value="2">
                  Engagement
                </option>

                <option value="3">
                  Reception
                </option>

                <option value="4">
                  Haldi
                </option>

              </select>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">
                Event Date
              </label>

              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-semibold">
                Event End Date
              </label>

              <input
                type="date"
                name="eventEndDate"
                value={formData.eventEndDate}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>

              <label className="font-semibold">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div>

              <label className="font-semibold">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 mt-2"
              >

                <option>
                  Upcoming
                </option>

                <option>
                  Ongoing
                </option>

                <option>
                  Completed
                </option>

              </select>

            </div>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl"
            >
              Create Event
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateEventDialog;