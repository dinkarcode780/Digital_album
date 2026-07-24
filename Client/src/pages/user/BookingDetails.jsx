import React from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaCamera,
  FaMoneyBillWave,
  FaCheckCircle,
  FaDownload,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const BookingDetails = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* Back */}

      <Link 
        to="/book"
        className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:underline"
      >
        <FaArrowLeft />
        Back to My Bookings
      </Link>

      {/* Header */}

      <div className="bg-white rounded-3xl shadow mt-6 p-8">

        <div className="flex flex-col lg:flex-row justify-between gap-6">

          <div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              Confirmed
            </span>

            <h1 className="text-4xl font-bold mt-5">
              Wedding Photography
            </h1>

            <p className="text-gray-500 mt-3">
              Booking ID :
              <span className="font-semibold text-black ml-2">
                BK-20260025
              </span>
            </p>

          </div>

          <div className="flex gap-4">

            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">

              <FaDownload />

              Invoice

            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">

              <FaWhatsapp />

              Contact Studio

            </button>

          </div>

        </div>

      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-3 gap-8 mt-8">

        {/* Left */}

        <div className="lg:col-span-2 space-y-8">

          {/* Customer */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
              Customer Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex items-center gap-3">

                <FaUser className="text-purple-600 text-xl" />

                <div>

                  <p className="text-gray-500">
                    Customer Name
                  </p>

                  <h3 className="font-semibold">
                    Dinkar Paswan
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <FaPhoneAlt className="text-purple-600 text-xl" />

                <div>

                  <p className="text-gray-500">
                    Phone
                  </p>

                  <h3 className="font-semibold">
                    +91 9876543210
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <FaEnvelope className="text-purple-600 text-xl" />

                <div>

                  <p className="text-gray-500">
                    Email
                  </p>

                  <h3 className="font-semibold">
                    dinkar@gmail.com
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Event */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
              Event Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex items-center gap-3">

                <FaCamera className="text-purple-600 text-xl" />

                <div>

                  <p className="text-gray-500">
                    Event Type
                  </p>

                  <h3 className="font-semibold">
                    Wedding
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <FaCalendarAlt className="text-purple-600 text-xl" />

                <div>

                  <p className="text-gray-500">
                    Event Date
                  </p>

                  <h3 className="font-semibold">
                    25 December 2026
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <FaMapMarkerAlt className="text-purple-600 text-xl" />

                <div>

                  <p className="text-gray-500">
                    Venue
                  </p>

                  <h3 className="font-semibold">
                    Begusarai, Bihar
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Timeline */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-2xl font-bold mb-6">
              Booking Timeline
            </h2>

            <div className="space-y-6">

              {[
                "Booking Submitted",
                "Studio Contacted",
                "Booking Confirmed",
                "Shoot Scheduled",
                "Album Delivery",
              ].map((step, index) => (

                <div
                  key={index}
                  className="flex gap-4"
                >

                  <div>

                    <FaCheckCircle
                      className={`text-2xl ${
                        index < 3
                          ? "text-green-500"
                          : "text-gray-300"
                      }`}
                    />

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {step}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {index < 3
                        ? "Completed"
                        : "Pending"}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Right */}

        <div>

          <div className="bg-white rounded-2xl shadow p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Payment Summary
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span>Total Amount</span>

                <span className="font-semibold">
                  ₹25,000
                </span>

              </div>

              <div className="flex justify-between">

                <span>Advance Paid</span>

                <span className="text-green-600 font-semibold">
                  ₹5,000
                </span>

              </div>

              <div className="flex justify-between">

                <span>Remaining</span>

                <span className="text-red-500 font-semibold">
                  ₹20,000
                </span>

              </div>

              <hr />

              <div className="flex justify-between">

                <span className="flex items-center gap-2">

                  <FaMoneyBillWave />

                  Payment Status

                </span>

                <span className="text-yellow-600 font-semibold">
                  Partial Paid
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BookingDetails;