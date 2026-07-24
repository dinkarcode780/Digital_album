import React, { useState } from "react";
import { Link } from "react-router-dom";

const albums = [
  {
    id: 1,
    title: "Rahul & Priya Wedding",
    date: "25 May 2024",
    photos: 86,
    videos: 42,
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
  },
  {
    id: 2,
    title: "Ankit & Neha Engagement",
    date: "18 May 2024",
    photos: 52,
    videos: 20,
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
  },
  {
    id: 3,
    title: "Birthday Celebration",
    date: "10 May 2024",
    photos: 120,
    videos: 15,
    image:
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600",
  },
  {
    id: 4,
    title: "Pre Wedding Shoot",
    date: "05 May 2024",
    photos: 45,
    videos: 18,
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600",
  },
  {
    id: 5,
    title: "Haldi Ceremony",
    date: "02 May 2024",
    photos: 74,
    videos: 30,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600",
  },
  {
    id: 6,
    title: "Reception",
    date: "30 Apr 2024",
    photos: 95,
    videos: 28,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
  },
];

const Album = () => {
  const [filter, setFilter] = useState("All");
  return (
    <div className="max-w-7xl mx-auto px-5 py-8">

      {/* Heading */}

      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">

        <div>
          <h1 className="text-3xl font-bold">My Albums</h1>
          <p className="text-gray-500">
            Browse all your albums
          </p>
        </div>

        <input
          type="text"
          placeholder="Search Album..."
          className="border rounded-lg px-4 py-2 w-full md:w-72 outline-none focus:ring-2 focus:ring-purple-500"
        />

      </div>

      {/* Filter */}

      <div className="flex gap-3 mt-8 overflow-x-auto">

        {/* <button className="bg-purple-600 text-white px-5 py-2 rounded-full">
          All
        </button> */}

         <button
    onClick={() => setFilter("All")}
    className={`px-5 py-2 rounded-full ${
      filter === "All"
        ? "bg-purple-600 text-white"
        : "border"
    }`}
  >
    All
  </button>

        {/* <button className="border px-5 py-2 rounded-full">
          Wedding
        </button> */}

        {/* <button className="border px-5 py-2 rounded-full">
          Engagement
        </button> */}

        {/* <button className="border px-5 py-2 rounded-full">
          Birthday
        </button> */}

          <button
    onClick={() => setFilter("Wedding")}
    className={`px-5 py-2 rounded-full ${
      filter === "Wedding"
        ? "bg-purple-600 text-white"
        : "border"
    }`}
  >
    Wedding
  </button>

  <button
    onClick={() => setFilter("Engagement")}
    className={`px-5 py-2 rounded-full ${
      filter === "Engagement"
        ? "bg-purple-600 text-white"
        : "border"
    }`}
  >
    Engagement
  </button>

  <button
    onClick={() => setFilter("Birthday")}
    className={`px-5 py-2 rounded-full ${
      filter === "Birthday"
        ? "bg-purple-600 text-white"
        : "border"
    }`}
  >
    Birthday
  </button>

  <button
    onClick={() => setFilter("Cinematic")}
    className={`px-5 py-2 rounded-full ${
      filter === "Cinematic"
        ? "bg-purple-600 text-white"
        : "border"
    }`}
  >
    Cinematic
  </button>



      </div>

      {/* Albums */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-8">

        {albums.map((album) => (

          <div
            key={album.id}
            className="rounded-xl overflow-hidden shadow hover:shadow-xl duration-300 bg-white"
          >

            <img
              src={album.image}
              alt={album.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">

              <h2 className="font-bold text-lg">
                {album.title}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {album.date}
              </p>

              <div className="flex gap-5 mt-4 text-gray-600 text-sm">

                <span>📷 {album.photos}</span>

                <span>🎥 {album.videos}</span>

              </div>

              {/* <Link
  to={`/albums/${album.id}`}
  className="block mt-5"
>
  <button
    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
  >
    View Album
  </button>
</Link> */}

<Link
  to={`/albums/${album.id}`}
  state={{ album }}
  className="block w-full mt-5 bg-purple-600 text-white py-2 rounded-lg text-center hover:bg-purple-700"
>
  View Album
</Link>

              {/* <button
                className="mt-5 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
              >
                View Album
              </button> */}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Album;