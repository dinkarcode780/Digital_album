import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaRupeeSign,
  FaRegStickyNote,
  FaCamera,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  eventEndDate: "", // New
  location: "",
  guest: "",
  budget: "",
  message: "",
});

const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log(formData);

//     alert("Booking Submitted Successfully");
//   };

const handleSubmit = (e) => {
  e.preventDefault();

  console.log(formData);

  // API call baad me yahan hogi

  navigate("/booking-details");
};

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* Header */}

      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold">
          Book Your Event
        </h1>

        <p className="text-gray-500 mt-3">
          Fill in your details and we'll contact you shortly.
        </p>

      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Booking Form */}

        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="font-semibold">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Event Type
                </label>

                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
                >

                  <option value="">
                    Select Event
                  </option>

                  <option>
                    Wedding
                  </option>

                  <option>
                    Engagement
                  </option>

                  <option>
                    Reception
                  </option>

                  <option>
                    Birthday
                  </option>

                  <option>
                    Pre Wedding
                  </option>

                </select>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-5">

              <div>

                <label className="font-semibold">
                  Event Date
                </label>

                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
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
      className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
    />

  </div>

              <div>

                <label className="font-semibold">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="Event Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="font-semibold">
                  Guest Count
                </label>

                <input
                  type="number"
                  name="guest"
                  placeholder="Approx Guests"
                  value={formData.guest}
                  onChange={handleChange}
                  className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Budget
                </label>

                <input
                  type="number"
                  name="budget"
                  placeholder="Approx Budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

            </div>

            <div>

              <label className="font-semibold">
                Special Requirements
              </label>

              <textarea
                rows="5"
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded-lg mt-2 p-3 outline-none resize-none focus:ring-2 focus:ring-purple-500"
              ></textarea>

            </div>

            <button
              className="w-full bg-purple-600 hover:bg-purple-700 duration-300 text-white py-4 rounded-xl font-semibold text-lg"
            >
              Submit Booking
            </button>

          </form>

        </div>

        {/* Booking Summary */}

        <div>

          <div className="bg-white rounded-2xl shadow p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Booking Summary
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span className="flex items-center gap-2">
                  <FaCamera className="text-purple-600" />
                  Service
                </span>

                <span className="font-semibold">
                  Wedding Shoot
                </span>

              </div>

              <div className="flex justify-between">

  <span className="flex items-center gap-2">
    <FaCalendarAlt className="text-purple-600" />
    Duration
  </span>

  <span className="text-right text-sm">
    {formData.eventDate || "--"}
    <br />
    to
    <br />
    {formData.eventEndDate || "--"}
  </span>

</div>

              <div className="flex justify-between">

                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-purple-600" />
                  Location
                </span>

                <span>
                  {formData.location || "--"}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="flex items-center gap-2">
                  <FaUsers className="text-purple-600" />
                  Guests
                </span>

                <span>
                  {formData.guest || "--"}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="flex items-center gap-2">
                  <FaRupeeSign className="text-purple-600" />
                  Budget
                </span>

                <span>
                  ₹ {formData.budget || "--"}
                </span>

              </div>

              <hr />

              <div>

                <h3 className="font-semibold mb-2">
                  Why Choose Us?
                </h3>

                <ul className="text-gray-500 text-sm space-y-2">

                  <li>✔ Professional Photography</li>

                  <li>✔ 4K Cinematic Videography</li>

                  <li>✔ Drone Coverage</li>

                  <li>✔ Premium Digital Album</li>

                  <li>✔ Fast Delivery</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Booking;
