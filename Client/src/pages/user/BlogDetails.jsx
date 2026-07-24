import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUserCircle,
  FaTags,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";

const relatedBlogs = [
  {
    id: 1,
    title: "Top Wedding Photography Tips",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600",
  },
  {
    id: 2,
    title: "Creative Pre Wedding Shoot Ideas",
    image:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600",
  },
  {
    id: 3,
    title: "Latest Wedding Trends",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600",
  },
];

const BlogDetails = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      {/* Back */}

      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:underline"
      >
        <FaArrowLeft />
        Back to Blog
      </Link>

      {/* Hero */}

      <div className="mt-6">

        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1400"
          alt=""
          className="w-full h-[300px] md:h-[500px] rounded-3xl object-cover"
        />

      </div>

      {/* Title */}

      <div className="mt-8">

        <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm">
          Wedding Tips
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mt-5 leading-tight">
          Top 10 Wedding Photography Poses for Couples
        </h1>

        <div className="flex flex-wrap gap-6 mt-5 text-gray-500">

          <span className="flex items-center gap-2">
            <FaUserCircle />
            Album Studio
          </span>

          <span className="flex items-center gap-2">
            <FaCalendarAlt />
            25 June 2026
          </span>

          <span className="flex items-center gap-2">
            <FaTags />
            Wedding Tips
          </span>

        </div>

      </div>

      {/* Content */}

      <div className="grid lg:grid-cols-3 gap-10 mt-10">

        {/* Left */}

        <div className="lg:col-span-2">

          <p className="text-gray-600 leading-8">
            Wedding photography is more than capturing pictures. It is about
            preserving emotions, smiles and unforgettable memories that stay
            with you forever. Every couple deserves timeless photographs that
            tell their beautiful love story.
          </p>

          <p className="text-gray-600 leading-8 mt-6">
            Choosing the right poses helps create natural expressions while
            making your wedding album look elegant and premium. Whether it's
            candid moments, romantic close-ups or traditional family portraits,
            every frame should reflect genuine emotions.
          </p>

          <img
            src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200"
            alt=""
            className="rounded-2xl my-8 w-full h-[450px] object-cover"
          />

          <h2 className="text-3xl font-bold">
            Best Couple Poses
          </h2>

          <ul className="list-disc pl-6 mt-5 space-y-3 text-gray-600">
            <li>Walking hand in hand naturally.</li>
            <li>Forehead touching romantic pose.</li>
            <li>Bride looking away while groom smiles.</li>
            <li>Golden hour sunset portraits.</li>
            <li>Candid laughter moments.</li>
            <li>Traditional family portraits.</li>
            <li>Drone aerial wedding shots.</li>
          </ul>

          <blockquote className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-xl mt-10 italic text-gray-700">
            "The best wedding photographs are the ones that make you feel the
            emotions again, even after many years."
          </blockquote>

          <p className="text-gray-600 leading-8 mt-8">
            Modern wedding photography combines storytelling, cinematic
            composition and natural emotions. Always discuss your expectations
            with your photographer before the wedding day to ensure every
            important moment is beautifully captured.
          </p>

          {/* Share */}

          <div className="border-t mt-10 pt-8">

            <h3 className="font-bold text-xl mb-4">
              Share this Article
            </h3>

            <div className="flex gap-4">

              <button className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <FaFacebookF />
              </button>

              <button className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center">
                <FaTwitter />
              </button>

              <button className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center">
                <FaWhatsapp />
              </button>

            </div>

          </div>

        </div>

        {/* Sidebar */}

        <div>

          <div className="bg-white rounded-2xl shadow p-6 sticky top-24">

            <h2 className="text-2xl font-bold mb-6">
              Related Blogs
            </h2>

            <div className="space-y-5">

              {relatedBlogs.map((blog) => (

                <div
                  key={blog.id}
                  className="flex gap-4 group cursor-pointer"
                >

                  <img
                    src={blog.image}
                    alt=""
                    className="w-24 h-20 rounded-xl object-cover"
                  />

                  <div>

                    <h3 className="font-semibold group-hover:text-purple-600 transition">
                      {blog.title}
                    </h3>

                    <button className="text-purple-600 text-sm mt-2 flex items-center gap-2">
                      Read More
                      <FaArrowRight />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default BlogDetails;