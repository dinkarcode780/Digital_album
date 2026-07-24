import React from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaImages,
  FaImage,
  FaVideo,
  FaEye,
} from "react-icons/fa";

const albums = [
  {
    id: 1,
    title: "Rahul & Priya Wedding",
    user: "Rahul Kumar",
    date: "25 June 2026",
    images: 120,
    videos: 20,
    cover:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
  },
  {
    id: 2,
    title: "Ankit Engagement",
    user: "Ankit Singh",
    date: "15 June 2026",
    images: 85,
    videos: 12,
    cover:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  },
  {
    id: 3,
    title: "Birthday Celebration",
    user: "Neha Sharma",
    date: "08 June 2026",
    images: 65,
    videos: 10,
    cover:
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600",
  },
  {
    id: 4,
    title: "Haldi Ceremony",
    user: "Dinkar Paswan",
    date: "01 June 2026",
    images: 140,
    videos: 25,
    cover:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600",
  },
];

const AdminAlbumPage = () => {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold">
            Media Library
          </h1>

          <p className="text-gray-500 mt-2">
            View all user albums.
          </p>

        </div>

        <div className="relative w-full md:w-80">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search album..."
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

      </div>

      {/* Cards */}

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">

        {albums.map((album) => (

          <div
            key={album.id}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl duration-300"
          >

            <img
              src={album.cover}
              alt={album.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold">
                {album.title}
              </h2>

              <p className="text-gray-500 mt-2">
                👤 {album.user}
              </p>

              <p className="text-gray-500">
                📅 {album.date}
              </p>

              <div className="flex justify-between mt-5">

                <div className="flex items-center gap-2 text-purple-600">

                  <FaImage />

                  <span>{album.images}</span>

                </div>

                <div className="flex items-center gap-2 text-red-500">

                  <FaVideo />

                  <span>{album.videos}</span>

                </div>

                <div className="flex items-center gap-2 text-green-600">

                  <FaImages />

                  <span>{album.images + album.videos}</span>

                </div>

              </div>

              <Link
                to={`/admin/albums/${album.id}`}
                className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl flex justify-center items-center gap-3"
              >

                <FaEye />

                View Media

              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminAlbumPage;