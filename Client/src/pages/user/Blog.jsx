import React from "react";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Top 10 Wedding Photography Poses for Couples",
    category: "Wedding Tips",
    author: "Album Studio",
    date: "25 June 2026",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900",
    description:
      "Discover the most beautiful wedding poses that create unforgettable memories.",
  },
  {
    id: 2,
    title: "How to Choose the Best Wedding Photographer",
    category: "Photography",
    author: "Album Studio",
    date: "20 June 2026",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=900",
    description:
      "Important tips before hiring a wedding photographer for your special day.",
  },
  {
    id: 3,
    title: "5 Pre-Wedding Shoot Ideas",
    category: "Pre Wedding",
    author: "Album Studio",
    date: "15 June 2026",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=900",
    description:
      "Creative outdoor and indoor pre-wedding shoot ideas for modern couples.",
  },
  {
    id: 4,
    title: "Latest Wedding Photography Trends 2026",
    category: "Trending",
    author: "Album Studio",
    date: "10 June 2026",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=900",
    description:
      "Explore the latest photography styles that every couple loves in 2026.",
  },
];

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-5 items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Our Blog
          </h1>

          <p className="text-gray-500 mt-3">
            Photography tips, wedding ideas and latest trends.
          </p>

        </div>

        {/* <div className="flex items-center border rounded-lg px-4 py-3 w-full lg:w-96">

          <FaSearch className="text-gray-400" />

          <input
            type="text"
            placeholder="Search blog..."
            className="ml-3 outline-none w-full"
          />

        </div> */}

      </div>

      {/* Categories */}

      {/* <div className="flex gap-3 mt-8 overflow-x-auto">

        <button className="bg-purple-600 text-white px-5 py-2 rounded-full">
          All
        </button>

        <button className="border px-5 py-2 rounded-full">
          Wedding
        </button>

        <button className="border px-5 py-2 rounded-full">
          Photography
        </button>

        <button className="border px-5 py-2 rounded-full">
          Pre Wedding
        </button>

        <button className="border px-5 py-2 rounded-full">
          Trending
        </button>

      </div> */}

      {/* Blog Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

        {blogs.map((blog) => (

          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
          >

            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-6">

              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                {blog.category}
              </span>

              <h2 className="text-xl font-bold mt-4">
                {blog.title}
              </h2>

              <p className="text-gray-500 mt-4">
                {blog.description}
              </p>

              <div className="flex justify-between items-center mt-6 text-sm text-gray-500">

                <span className="flex items-center gap-2">

                  <FaUserCircle />

                  {blog.author}

                </span>

                <span className="flex items-center gap-2">

                  <FaCalendarAlt />

                  {blog.date}

                </span>

              </div>

              {/* <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg flex justify-center items-center gap-2">

                Read More

                <FaArrowRight />

              </button> */}

              <Link
  to={`/blog/${blog.id}`}
  className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg flex justify-center items-center gap-2"
>
  Read More
  <FaArrowRight />
</Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Blog;