import React from "react";
import { FaDownload, FaImage, FaVideo } from "react-icons/fa";

const downloads = [
  {
    id: 1,
    title: "Rahul & Priya Wedding",
    type: "Image",
    date: "25 Jun 2026",
    size: "3.2 MB",
    image: "https://picsum.photos/500/350?1",
  },
  {
    id: 2,
    title: "Sangeet Night",
    type: "Video",
    date: "24 Jun 2026",
    size: "120 MB",
    image: "https://picsum.photos/500/350?2",
  },
  {
    id: 3,
    title: "Haldi Ceremony",
    type: "Image",
    date: "22 Jun 2026",
    size: "2.8 MB",
    image: "https://picsum.photos/500/350?3",
  },
  {
    id: 4,
    title: "Wedding Ceremony",
    type: "Video",
    date: "20 Jun 2026",
    size: "250 MB",
    image: "https://picsum.photos/500/350?4",
  },
  {
    id: 5,
    title: "Reception",
    type: "Image",
    date: "18 Jun 2026",
    size: "4.1 MB",
    image: "https://picsum.photos/500/350?5",
  },
  {
    id: 6,
    title: "Pre Wedding",
    type: "Video",
    date: "15 Jun 2026",
    size: "180 MB",
    image: "https://picsum.photos/500/350?6",
  },
];

const Downloads = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl font-bold">Downloads</h1>
          <p className="text-gray-500">
            View your downloaded photos & videos
          </p>
        </div>

        <input
          type="text"
          placeholder="Search Download..."
          className="border rounded-lg px-4 py-2 w-full md:w-80 outline-none focus:ring-2 focus:ring-purple-500"
        />

      </div>

      {/* Total */}

      <div className="mt-8 bg-purple-600 text-white rounded-xl p-5 flex justify-between items-center">

        <div>
          <h2 className="text-xl font-semibold">
            Total Downloads
          </h2>

          <p className="text-3xl font-bold mt-2">
            {downloads.length}
          </p>
        </div>

        <FaDownload size={45} />

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        {downloads.map((item) => (

          <div
            key={item.id}
            className="bg-white rounded-xl shadow hover:shadow-xl duration-300 overflow-hidden"
          >

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <div className="flex justify-between items-center">

                <h3 className="font-bold text-lg">
                  {item.title}
                </h3>

                <span className="text-purple-600">
                  {item.type === "Image" ? (
                    <FaImage />
                  ) : (
                    <FaVideo />
                  )}
                </span>

              </div>

              <p className="text-gray-500 mt-2">
                Downloaded : {item.date}
              </p>

              <p className="text-gray-500">
                Size : {item.size}
              </p>

              <button className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex justify-center items-center gap-2">

                <FaDownload />

                Download Again

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Downloads;