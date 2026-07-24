import React from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaLayerGroup,
} from "react-icons/fa";

const subCategories = [
  {
    id: 1,
    category: "Wedding",
    name: "Haldi Ceremony",
    events: 18,
  },
  {
    id: 2,
    category: "Wedding",
    name: "Mehendi",
    events: 24,
  },
  {
    id: 3,
    category: "Wedding",
    name: "Reception",
    events: 35,
  },
  {
    id: 4,
    category: "Birthday",
    name: "Kids Birthday",
    events: 14,
  },
  {
    id: 5,
    category: "Corporate",
    name: "Seminar",
    events: 9,
  },
];

const SubCategoryPage = () => {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold">
            Sub Categories
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all event sub categories.
          </p>

        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-3">

          <FaPlus />

          Add Sub Category

        </button>

      </div>

      {/* Search */}

      <div className="relative max-w-sm">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-purple-500"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left p-4">
                #
              </th>

              <th className="text-left p-4">
                Category
              </th>

              <th className="text-left p-4">
                Sub Category
              </th>

              <th className="text-left p-4">
                Total Events
              </th>

              <th className="text-center p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {subCategories.map((item, index) => (

              <tr
                key={item.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-semibold">
                  {index + 1}
                </td>

                <td className="p-4">

                  <span className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">

                    <FaLayerGroup />

                    {item.category}

                  </span>

                </td>

                <td className="p-4 font-medium">
                  {item.name}
                </td>

                <td className="p-4">
                  {item.events}
                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <button className="bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition flex items-center gap-2">

                      <FaEdit />

                      Edit

                    </button>

                    <button className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg transition flex items-center gap-2">

                      <FaTrash />

                      Delete

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default SubCategoryPage;