import React, { useState } from "react";
import {
  FaArrowLeft,
  FaDownload,
  FaTrash,
  FaImage,
  FaVideo,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const media = [
  {
    id: 1,
    type: "Image",
    url: "https://picsum.photos/600/600?1",
  },
  {
    id: 2,
    type: "Video",
    url: "https://picsum.photos/600/600?2",
  },
  {
    id: 3,
    type: "Image",
    url: "https://picsum.photos/600/600?3",
  },
  {
    id: 4,
    type: "Image",
    url: "https://picsum.photos/600/600?4",
  },
  {
    id: 5,
    type: "Video",
    url: "https://picsum.photos/600/600?5",
  },
  {
    id: 6,
    type: "Image",
    url: "https://picsum.photos/600/600?6",
  },
];

const AdminAlbumDetailsPage = () => {
  const [filter, setFilter] = useState("All");

  const filteredMedia =
    filter === "All"
      ? media
      : media.filter((item) => item.type === filter);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-5">

        <div>

          <Link
            to="/admin/albums"
            className="text-purple-600 font-semibold flex items-center gap-2 mb-3"
          >
            <FaArrowLeft />

            Back

          </Link>

          <h1 className="text-3xl font-bold">
            Rahul & Priya Wedding
          </h1>

          <p className="text-gray-500 mt-2">
            Uploaded by Rahul Kumar • 25 June 2026
          </p>

        </div>

        <div className="relative w-full lg:w-80">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search media..."
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

      </div>

      {/* Filter */}

      <div className="flex gap-3 flex-wrap">

        <button
          onClick={() => setFilter("All")}
          className={`px-5 py-2 rounded-xl ${
            filter === "All"
              ? "bg-purple-600 text-white"
              : "bg-white border"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Image")}
          className={`px-5 py-2 rounded-xl ${
            filter === "Image"
              ? "bg-purple-600 text-white"
              : "bg-white border"
          }`}
        >
          Images
        </button>

        <button
          onClick={() => setFilter("Video")}
          className={`px-5 py-2 rounded-xl ${
            filter === "Video"
              ? "bg-purple-600 text-white"
              : "bg-white border"
          }`}
        >
          Videos
        </button>

      </div>

      {/* Grid */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {filteredMedia.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
          >

            <div className="relative">

              <img
                src={item.url}
                alt=""
                className="w-full h-60 object-cover"
              />

              <span className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">

                {item.type === "Image" ? (
                  <>
                    <FaImage /> Image
                  </>
                ) : (
                  <>
                    <FaVideo /> Video
                  </>
                )}

              </span>

            </div>

            <div className="p-4">

              <div className="flex justify-between">

                <button className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">

                  <FaDownload />

                  Download

                </button>

                <button className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg">

                  <FaTrash />

                  Delete

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminAlbumDetailsPage;