import { useState } from "react";
import { FaArrowLeft, FaImage, FaVideo, FaCheck } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const media = [
  {
    id: 1,
    type: "image",
    src: "https://picsum.photos/400/400?1",
  },
  {
    id: 2,
    type: "image",
    src: "https://picsum.photos/400/400?2",
  },
  {
    id: 3,
    type: "video",
    src: "https://picsum.photos/400/400?3",
  },
  {
    id: 4,
    type: "image",
    src: "https://picsum.photos/400/400?4",
  },
  {
    id: 5,
    type: "video",
    src: "https://picsum.photos/400/400?5",
  },
  {
    id: 6,
    type: "image",
    src: "https://picsum.photos/400/400?6",
  },
  {
    id: 7,
    type: "image",
    src: "https://picsum.photos/400/400?7",
  },
  {
    id: 8,
    type: "image",
    src: "https://picsum.photos/400/400?8",
  },
];

export default function AlbumDetails() {
  const [selected, setSelected] = useState([]);
  const { id } = useParams();
  const location = useLocation();

const album = location.state?.album;
  const navigate = useNavigate();

//   const album = albums.find(
//   (item) => item.id === Number(id)
// );

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Header */}

      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-purple-600 font-semibold">
        <FaArrowLeft />
        Back
      </button>

      <h1 className="text-3xl font-bold mt-4">
        {/* Rahul & Priya Wedding */}
          {album.title}
      </h1>

      <p className="text-gray-500 mt-2">
        25 May 2026 • Begusarai, Bihar
      </p>

      {/* Search */}

      <input
        placeholder="Search photo..."
        className="mt-6 border rounded-lg px-4 py-3 w-full"
      />

      {/* Filter */}

      <div className="flex gap-3 mt-6 flex-wrap">

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

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-8">

        {media.map((item) => (

          <div
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            className="relative cursor-pointer group"
          >

            <img
              src={item.src}
              className="rounded-xl w-full h-60 object-cover"
            />

            {item.type === "video" && (
              <div className="absolute top-3 left-3 bg-black/60 text-white rounded-full p-2">
                <FaVideo />
              </div>
            )}

            {selected.includes(item.id) && (

              <div className="absolute inset-0 bg-purple-700/40 rounded-xl flex justify-center items-center">

                <div className="bg-white rounded-full p-3">

                  <FaCheck className="text-green-600" />

                </div>

              </div>

            )}

          </div>

        ))}

      </div>

      {/* Bottom */}

      <div className="sticky bottom-5 bg-white shadow-xl rounded-xl p-4 flex justify-between items-center mt-10">

        <h2 className="font-bold">
          Selected : {selected.length}
        </h2>

        <div className="flex gap-3">

          <button className="border px-5 py-2 rounded-lg">
            Clear
          </button>

          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg">
            Save Selection
          </button>

        </div>

      </div>

    </div>
  );
}