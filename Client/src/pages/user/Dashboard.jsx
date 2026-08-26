import React from "react";
import Banner from "./Banner";
import Album from "./Album";

import {
  FaImages,
  FaPhotoVideo,
  FaDownload,
  FaHeart,
} from "react-icons/fa";
import Blog from "./Blog";
import Testimonials from "./Testimonials";

const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* Banner */}
      <Banner />

      {/* Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Albums */}

        <div className=" bg-yellow-300 rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">

            <FaImages className="text-blue-800 text-3xl" />

          </div>

          <div>

            <h2 className="text-4xl font-bold text-gray-900">
              12
            </h2>

            <p className="font-semibold text-gray-900">
              Total Albums
            </p>

            <span className="text-sm text-gray-900">
              View all albums
            </span>

          </div>

        </div>

        {/* Photos */}

        <div className="bg-yellow-300 rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center">

            <FaPhotoVideo className="text-pink-600 text-3xl" />

          </div>

          <div>

            <h2 className="text-4xl font-bold text-gray-900">
              248
            </h2>

            <p className="font-semibold text-gray-900">
              Photos & Videos
            </p>

            <span className="text-sm text-gray-900">
              Across all albums
            </span>

          </div>

        </div>

        {/* Downloads */}

        <div className="bg-yellow-300 rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

            <FaDownload className="text-green-900 text-3xl" />

          </div>

          <div>

            <h2 className="text-4xl font-bold text-gray-900">
              36
            </h2>

            <p className="font-semibold text-gray-900">
              Downloads
            </p>

            <span className="text-sm text-gray-800">
              Downloaded files
            </span>

          </div>

        </div>

        {/* Favorites */}

        <div className="bg-yellow-300 rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-orange-300 flex items-center justify-center">

            <FaHeart className="text-red-500 text-3xl" />

          </div>

          <div>

            <h2 className="text-4xl font-bold text-gray-900">
              18
            </h2>

            <p className="font-semibold text-gray-900">
              Favorites
            </p>

            <span className="text-sm text-gray-800">
              Your favorite moments
            </span>

          </div>

        </div>

      </div>

      {/* Albums */}

      <div>

        {/* <div className="flex justify-between items-center mb-5">

          <h2 className="text-3xl font-bold">
            My Albums
          </h2>

          <button className="text-purple-600 font-semibold hover:underline">
            View All Albums →
          </button>

        </div> */}

        <Album />

        <Blog />

        <Testimonials />

      </div>

    </div>
  );
};

export default Dashboard;