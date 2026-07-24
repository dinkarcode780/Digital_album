import React from "react";
import { FaHandSparkles } from "react-icons/fa6";

const Banner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#f8f3ff] via-[#f4efff] to-[#efe8ff] shadow-md border border-purple-100">

      {/* Background Decoration */}
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute right-20 top-0 w-56 h-56 bg-purple-100/30 rounded-full blur-3xl"></div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[240px] px-8 lg:px-12 py-8">

        {/* Left */}

        <div className="z-10 w-full lg:w-1/2">

          <h3 className="text-2xl lg:text-4xl font-medium text-gray-800">
            Welcome back,
          </h3>

          <h1 className="mt-2 text-4xl lg:text-6xl font-bold text-purple-700 flex items-center gap-3">

            Dinkar Paswan

            <FaHandSparkles className="text-yellow-400 text-4xl" />

          </h1>

          <p className="mt-4 text-gray-500 text-lg">
            Relive your beautiful moments
          </p>

        </div>

        {/* Right */}

        <div className="relative w-full lg:w-1/2 flex justify-end mt-8 lg:mt-0">

          {/* Circle */}

          <div className="absolute w-80 h-80 rounded-full bg-purple-100 opacity-60 right-10 bottom-0"></div>

          {/* Couple Image */}

          <img
            src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&auto=format&fit=crop&q=80"
            alt="Wedding Couple"
            className="relative z-10 h-64 md:h-72 lg:h-80 object-contain"
          />

        </div>

      </div>

      {/* Bottom Decoration */}

      <div className="absolute bottom-0 left-0 w-full flex justify-center gap-3 opacity-40">

        <div className="w-4 h-16 bg-purple-300 rounded-full"></div>
        <div className="w-4 h-20 bg-purple-400 rounded-full"></div>
        <div className="w-4 h-14 bg-purple-300 rounded-full"></div>
        <div className="w-4 h-24 bg-purple-500 rounded-full"></div>
        <div className="w-4 h-18 bg-purple-400 rounded-full"></div>
        <div className="w-4 h-20 bg-purple-300 rounded-full"></div>

      </div>

    </div>
  );
};

export default Banner;