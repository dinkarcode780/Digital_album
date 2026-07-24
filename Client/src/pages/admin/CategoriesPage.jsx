import React from "react";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaPlus,
  FaImages,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Wedding",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
    events: 125,
  },
  {
    id: 2,
    name: "Engagement",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600",
    events: 48,
  },
  {
    id: 3,
    name: "Reception",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600",
    events: 65,
  },
  {
    id: 4,
    name: "Birthday",
    image:
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=600",
    events: 30,
  },
];

const CategoriesPage = () => {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all event categories.
          </p>

        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-3">

          <FaPlus />

          Add Category

        </button>

      </div>

      {/* Search */}

      <div className="relative max-w-sm">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search Category..."
          className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7">

        {categories.map((category) => (

          <div
            key={category.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl duration-300 overflow-hidden"
          >

            <img
              src={category.image}
              alt={category.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold">
                {category.name}
              </h2>

              <div className="flex items-center gap-2 text-gray-500 mt-3">

                <FaImages />

                {category.events} Events

              </div>

              <div className="flex gap-3 mt-6">

                <button className="flex-1 bg-blue-100 text-blue-600 py-2 rounded-xl hover:bg-blue-600 hover:text-white duration-300 flex justify-center items-center gap-2">

                  <FaEdit />

                  Edit

                </button>

                <button className="flex-1 bg-red-100 text-red-600 py-2 rounded-xl hover:bg-red-600 hover:text-white duration-300 flex justify-center items-center gap-2">

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

export default CategoriesPage;