import React from "react";
import { FaHeart, FaImage, FaVideo, FaEye } from "react-icons/fa";

const favorites = [
  {
    id: 1,
    title: "Wedding Ceremony",
    type: "Image",
    image: "https://picsum.photos/500/350?1",
    date: "25 Jun 2026",
  },
  {
    id: 2,
    title: "Bride Entry",
    type: "Video",
    image: "https://picsum.photos/500/350?2",
    date: "25 Jun 2026",
  },
  {
    id: 3,
    title: "Haldi Function",
    type: "Image",
    image: "https://picsum.photos/500/350?3",
    date: "24 Jun 2026",
  },
  {
    id: 4,
    title: "Reception",
    type: "Video",
    image: "https://picsum.photos/500/350?4",
    date: "23 Jun 2026",
  },
  {
    id: 5,
    title: "Family Photo",
    type: "Image",
    image: "https://picsum.photos/500/350?5",
    date: "22 Jun 2026",
  },
  {
    id: 6,
    title: "Dance Performance",
    type: "Video",
    image: "https://picsum.photos/500/350?6",
    date: "21 Jun 2026",
  },
];

const Favorites = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-8">

      {/* Heading */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold">❤️ Favorites</h1>
          <p className="text-gray-500 mt-2">
            Your favourite photos & videos
          </p>
        </div>

        <input
          type="text"
          placeholder="Search Favorites..."
          className="border rounded-lg px-4 py-2 w-full md:w-80 outline-none focus:ring-2 focus:ring-purple-500"
        />

      </div>

      {/* Filter */}

      <div className="flex gap-3 mt-8">

        <button className="bg-purple-600 text-white px-5 py-2 rounded-full">
          All
        </button>

        <button className="border px-5 py-2 rounded-full">
          Photos
        </button>

        <button className="border px-5 py-2 rounded-full">
          Videos
        </button>

      </div>

      {/* Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-8">

        {favorites.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-xl duration-300 overflow-hidden"
          >

            <div className="relative">

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-red-500 shadow">

                <FaHeart />

              </button>

              <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">

                {item.type === "Image" ? (
                  <FaImage />
                ) : (
                  <FaVideo />
                )}

                {item.type}

              </div>

            </div>

            <div className="p-5">

              <h2 className="font-bold text-lg">
                {item.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {item.date}
              </p>

              <button className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex justify-center items-center gap-2">

                <FaEye />

                View

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Favorites;