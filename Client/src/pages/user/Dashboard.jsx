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

        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">

            <FaImages className="text-indigo-600 text-3xl" />

          </div>

          <div>

            <h2 className="text-4xl font-bold">
              12
            </h2>

            <p className="font-semibold text-gray-800">
              Total Albums
            </p>

            <span className="text-sm text-gray-400">
              View all albums
            </span>

          </div>

        </div>

        {/* Photos */}

        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center">

            <FaPhotoVideo className="text-pink-600 text-3xl" />

          </div>

          <div>

            <h2 className="text-4xl font-bold">
              248
            </h2>

            <p className="font-semibold text-gray-800">
              Photos & Videos
            </p>

            <span className="text-sm text-gray-400">
              Across all albums
            </span>

          </div>

        </div>

        {/* Downloads */}

        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

            <FaDownload className="text-green-600 text-3xl" />

          </div>

          <div>

            <h2 className="text-4xl font-bold">
              36
            </h2>

            <p className="font-semibold text-gray-800">
              Downloads
            </p>

            <span className="text-sm text-gray-400">
              Downloaded files
            </span>

          </div>

        </div>

        {/* Favorites */}

        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 p-6 flex items-center gap-5">

          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">

            <FaHeart className="text-orange-500 text-3xl" />

          </div>

          <div>

            <h2 className="text-4xl font-bold">
              18
            </h2>

            <p className="font-semibold text-gray-800">
              Favorites
            </p>

            <span className="text-sm text-gray-400">
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