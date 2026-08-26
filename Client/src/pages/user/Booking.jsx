// import React, { useState } from "react";
// import {
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaUsers,
//   FaRupeeSign,
//   FaRegStickyNote,
//   FaCamera,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Booking = () => {
//   const [formData, setFormData] = useState({
//   name: "",
//   phone: "",
//   email: "",
//   eventType: "",
//   eventDate: "",
//   eventEndDate: "", // New
//   location: "",
//   guest: "",
//   budget: "",
//   message: "",
// });

// const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     console.log(formData);

// //     alert("Booking Submitted Successfully");
// //   };

// const handleSubmit = (e) => {
//   e.preventDefault();

//   console.log(formData);

//   // API call baad me yahan hogi

//   navigate("/booking-details");
// };

//   return (
//     <div className="max-w-7xl mx-auto px-5 py-10">

//       {/* Header */}

//       <div className="text-center mb-10">

//         <h1 className="text-4xl font-bold">
//           Book Your Event
//         </h1>

//         <p className="text-gray-500 mt-3">
//           Fill in your details and we'll contact you shortly.
//         </p>

//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">

//         {/* Booking Form */}

//         <div className="lg:col-span-2 bg-white rounded-2xl shadow p-8">

//           <form onSubmit={handleSubmit} className="space-y-6">

//             <div className="grid md:grid-cols-2 gap-5">

//               <div>

//                 <label className="font-semibold">
//                   Full Name
//                 </label>

//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter Name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
//                 />

//               </div>

//               <div>

//                 <label className="font-semibold">
//                   Phone Number
//                 </label>

//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Enter Phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
//                 />

//               </div>

//             </div>

//             <div className="grid md:grid-cols-2 gap-5">

//               <div>

//                 <label className="font-semibold">
//                   Email
//                 </label>

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Enter Email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
//                 />

//               </div>

//               <div>

//                 <label className="font-semibold">
//                   Event Type
//                 </label>

//                 <select
//                   name="eventType"
//                   value={formData.eventType}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
//                 >

//                   <option value="">
//                     Select Event
//                   </option>

//                   <option>
//                     Wedding
//                   </option>

//                   <option>
//                     Engagement
//                   </option>

//                   <option>
//                     Reception
//                   </option>

//                   <option>
//                     Birthday
//                   </option>

//                   <option>
//                     Pre Wedding
//                   </option>

//                 </select>

//               </div>

//             </div>

//             <div className="grid md:grid-cols-3 gap-5">

//               <div>

//                 <label className="font-semibold">
//                   Event Date
//                 </label>

//                 <input
//                   type="date"
//                   name="eventDate"
//                   value={formData.eventDate}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
//                 />

//               </div>

//                <div>

//     <label className="font-semibold">
//       Event End Date
//     </label>

//     <input
//       type="date"
//       name="eventEndDate"
//       value={formData.eventEndDate}
//       onChange={handleChange}
//       className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
//     />

//   </div>

//               <div>

//                 <label className="font-semibold">
//                   Location
//                 </label>

//                 <input
//                   type="text"
//                   name="location"
//                   placeholder="Event Location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
//                 />

//               </div>

//             </div>

//             <div className="grid md:grid-cols-2 gap-5">

//               <div>

//                 <label className="font-semibold">
//                   Guest Count
//                 </label>

//                 <input
//                   type="number"
//                   name="guest"
//                   placeholder="Approx Guests"
//                   value={formData.guest}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
//                 />

//               </div>

//               <div>

//                 <label className="font-semibold">
//                   Budget
//                 </label>

//                 <input
//                   type="number"
//                   name="budget"
//                   placeholder="Approx Budget"
//                   value={formData.budget}
//                   onChange={handleChange}
//                   className="w-full border rounded-lg mt-2 p-3 outline-none focus:ring-2 focus:ring-purple-500"
//                 />

//               </div>

//             </div>

//             <div>

//               <label className="font-semibold">
//                 Special Requirements
//               </label>

//               <textarea
//                 rows="5"
//                 name="message"
//                 placeholder="Write your message..."
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg mt-2 p-3 outline-none resize-none focus:ring-2 focus:ring-purple-500"
//               ></textarea>

//             </div>

//             <button
//               className="w-full bg-purple-600 hover:bg-purple-700 duration-300 text-white py-4 rounded-xl font-semibold text-lg"
//             >
//               Submit Booking
//             </button>

//           </form>

//         </div>

//         {/* Booking Summary */}

//         <div>

//           <div className="bg-white rounded-2xl shadow p-6 sticky top-24">

//             <h2 className="text-2xl font-bold mb-6">
//               Booking Summary
//             </h2>

//             <div className="space-y-5">

//               <div className="flex justify-between">

//                 <span className="flex items-center gap-2">
//                   <FaCamera className="text-purple-600" />
//                   Service
//                 </span>

//                 <span className="font-semibold">
//                   Wedding Shoot
//                 </span>

//               </div>

//               <div className="flex justify-between">

//   <span className="flex items-center gap-2">
//     <FaCalendarAlt className="text-purple-600" />
//     Duration
//   </span>

//   <span className="text-right text-sm">
//     {formData.eventDate || "--"}
//     <br />
//     to
//     <br />
//     {formData.eventEndDate || "--"}
//   </span>

// </div>

//               <div className="flex justify-between">

//                 <span className="flex items-center gap-2">
//                   <FaMapMarkerAlt className="text-purple-600" />
//                   Location
//                 </span>

//                 <span>
//                   {formData.location || "--"}
//                 </span>

//               </div>

//               <div className="flex justify-between">

//                 <span className="flex items-center gap-2">
//                   <FaUsers className="text-purple-600" />
//                   Guests
//                 </span>

//                 <span>
//                   {formData.guest || "--"}
//                 </span>

//               </div>

//               <div className="flex justify-between">

//                 <span className="flex items-center gap-2">
//                   <FaRupeeSign className="text-purple-600" />
//                   Budget
//                 </span>

//                 <span>
//                   ₹ {formData.budget || "--"}
//                 </span>

//               </div>

//               <hr />

//               <div>

//                 <h3 className="font-semibold mb-2">
//                   Why Choose Us?
//                 </h3>

//                 <ul className="text-gray-500 text-sm space-y-2">

//                   <li>✔ Professional Photography</li>

//                   <li>✔ 4K Cinematic Videography</li>

//                   <li>✔ Drone Coverage</li>

//                   <li>✔ Premium Digital Album</li>

//                   <li>✔ Fast Delivery</li>

//                 </ul>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default Booking;
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaRupeeSign,
  FaCamera,
  FaCheckCircle,
  FaArrowRight,
  FaHeart,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    eventDate: "",
    eventEndDate: "",
    location: "",
    guest: "",
    budget: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // API call baad me yahan hogi
    navigate("/booking-details");
  };

  const formatDate = (date) => {
    if (!date) return "--";

    const newDate = new Date(date);

    return newDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const features = [
    "Professional Photography",
    "4K Cinematic Videography",
    "Drone Coverage",
    "Premium Digital Album",
    "Fast Delivery",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#faf8ff] via-[#f5efff] to-[#eee5ff] px-4 py-8 md:px-8">

      {/* =====================================================
          ANIMATED BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 top-10 h-[400px] w-[400px] rounded-full bg-purple-300/20 blur-[100px] animate-pulse" />

      <div
        className="pointer-events-none absolute right-[-150px] top-[25%] h-[450px] w-[450px] rounded-full bg-violet-400/20 blur-[110px]"
        style={{
          animation: "floatingBlob 8s ease-in-out infinite",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-[-150px] left-[35%] h-[400px] w-[400px] rounded-full bg-fuchsia-300/15 blur-[100px]"
        style={{
          animation: "floatingBlob 10s ease-in-out infinite reverse",
        }}
      />

      {/* Floating circles */}

      <div
        className="pointer-events-none absolute left-[12%] top-[30%] h-4 w-4 rounded-full bg-purple-400/40"
        style={{
          animation: "floatingSmall 5s ease-in-out infinite",
        }}
      />

      <div
        className="pointer-events-none absolute right-[20%] top-[15%] h-3 w-3 rounded-full bg-violet-500/50"
        style={{
          animation: "floatingSmall 6s ease-in-out infinite reverse",
        }}
      />

      <div
        className="pointer-events-none absolute right-[35%] bottom-[20%] h-5 w-5 rounded-full bg-fuchsia-400/30"
        style={{
          animation: "floatingSmall 7s ease-in-out infinite",
        }}
      />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =====================================================
            HERO HEADER
        ====================================================== */}

        <div className="mb-10 text-center">

          {/* Badge */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200/70 bg-white/60 px-4 py-2 shadow-sm backdrop-blur-xl">

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-md">

              <FaHeart className="text-xs" />

            </span>

            <span className="text-sm font-semibold text-purple-700">
              Create Your Perfect Event
            </span>

          </div>

          {/* Heading */}

          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800 md:text-5xl lg:text-6xl">

            Book Your{" "}

            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">

              Dream Event

            </span>

          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500 md:text-lg">

            Tell us about your special day and our team will
            help you create unforgettable memories.

          </p>

          {/* Small status */}

          <div className="mt-5 inline-flex items-center gap-2 text-sm text-gray-500">

            <span className="relative flex h-3 w-3">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />

              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />

            </span>

            Our booking team is available

          </div>

        </div>


        {/* =====================================================
            MAIN GRID
        ====================================================== */}

        <div className="grid gap-8 lg:grid-cols-[1.65fr_0.85fr]">

          {/* =================================================
              BOOKING FORM
          ================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/80
              bg-white/55
              p-6
              shadow-[0_20px_70px_rgba(124,58,237,0.12)]
              backdrop-blur-2xl
              md:p-8
            "
          >

            {/* Card glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-purple-200/30 blur-3xl" />

            <div className="relative">

              {/* Form heading */}

              <div className="mb-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-300/40">

                  <FaCamera className="text-xl" />

                </div>

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    Event Details
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Fill in the details below to get started.
                  </p>

                </div>

              </div>


              <form onSubmit={handleSubmit} className="space-y-6">

                {/* =========================================
                    PERSONAL DETAILS
                ========================================== */}

                <div>

                  <div className="mb-4 flex items-center gap-2">

                    <div className="h-2 w-2 rounded-full bg-purple-600" />

                    <h3 className="font-bold text-gray-700">
                      Personal Information
                    </h3>

                  </div>


                  <div className="grid gap-5 md:grid-cols-2">

                    {/* Name */}

                    <div className="group">

                      <label className="text-sm font-semibold text-gray-700">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="
                          mt-2
                          w-full
                          rounded-xl
                          border
                          border-purple-100
                          bg-white/70
                          px-4
                          py-3.5
                          text-gray-700
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-gray-400
                          hover:border-purple-200
                          focus:border-purple-400
                          focus:bg-white
                          focus:ring-4
                          focus:ring-purple-100
                        "
                      />

                    </div>


                    {/* Phone */}

                    <div className="group">

                      <label className="text-sm font-semibold text-gray-700">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="
                          mt-2
                          w-full
                          rounded-xl
                          border
                          border-purple-100
                          bg-white/70
                          px-4
                          py-3.5
                          text-gray-700
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-gray-400
                          hover:border-purple-200
                          focus:border-purple-400
                          focus:bg-white
                          focus:ring-4
                          focus:ring-purple-100
                        "
                      />

                    </div>

                  </div>


                  {/* Email + Event */}

                  <div className="mt-5 grid gap-5 md:grid-cols-2">

                    {/* Email */}

                    <div>

                      <label className="text-sm font-semibold text-gray-700">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="
                          mt-2
                          w-full
                          rounded-xl
                          border
                          border-purple-100
                          bg-white/70
                          px-4
                          py-3.5
                          text-gray-700
                          outline-none
                          transition-all
                          duration-300
                          placeholder:text-gray-400
                          hover:border-purple-200
                          focus:border-purple-400
                          focus:bg-white
                          focus:ring-4
                          focus:ring-purple-100
                        "
                      />

                    </div>


                    {/* Event Type */}

                    <div>

                      <label className="text-sm font-semibold text-gray-700">
                        Event Type
                      </label>

                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="
                          mt-2
                          w-full
                          rounded-xl
                          border
                          border-purple-100
                          bg-white/70
                          px-4
                          py-3.5
                          text-gray-700
                          outline-none
                          transition-all
                          duration-300
                          hover:border-purple-200
                          focus:border-purple-400
                          focus:bg-white
                          focus:ring-4
                          focus:ring-purple-100
                        "
                      >

                        <option value="">
                          Select Event
                        </option>

                        <option value="Wedding">
                          Wedding
                        </option>

                        <option value="Engagement">
                          Engagement
                        </option>

                        <option value="Reception">
                          Reception
                        </option>

                        <option value="Birthday">
                          Birthday
                        </option>

                        <option value="Pre Wedding">
                          Pre Wedding
                        </option>

                      </select>

                    </div>

                  </div>

                </div>


                {/* =========================================
                    EVENT INFORMATION
                ========================================== */}

                <div>

                  <div className="mb-4 mt-8 flex items-center gap-2">

                    <div className="h-2 w-2 rounded-full bg-violet-600" />

                    <h3 className="font-bold text-gray-700">
                      Event Information
                    </h3>

                  </div>


                  <div className="grid gap-5 md:grid-cols-3">

                    {/* Start Date */}

                    <div>

                      <label className="text-sm font-semibold text-gray-700">
                        Event Date
                      </label>

                      <div className="relative">

                        <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />

                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-purple-100
                            bg-white/70
                            py-3.5
                            pl-11
                            pr-4
                            text-gray-700
                            outline-none
                            transition-all
                            focus:border-purple-400
                            focus:bg-white
                            focus:ring-4
                            focus:ring-purple-100
                          "
                        />

                      </div>

                    </div>


                    {/* End Date */}

                    <div>

                      <label className="text-sm font-semibold text-gray-700">
                        End Date
                      </label>

                      <div className="relative">

                        <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />

                        <input
                          type="date"
                          name="eventEndDate"
                          value={formData.eventEndDate}
                          onChange={handleChange}
                          className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-purple-100
                            bg-white/70
                            py-3.5
                            pl-11
                            pr-4
                            text-gray-700
                            outline-none
                            transition-all
                            focus:border-purple-400
                            focus:bg-white
                            focus:ring-4
                            focus:ring-purple-100
                          "
                        />

                      </div>

                    </div>


                    {/* Location */}

                    <div>

                      <label className="text-sm font-semibold text-gray-700">
                        Location
                      </label>

                      <div className="relative">

                        <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />

                        <input
                          type="text"
                          name="location"
                          placeholder="Event location"
                          value={formData.location}
                          onChange={handleChange}
                          className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-purple-100
                            bg-white/70
                            py-3.5
                            pl-11
                            pr-4
                            text-gray-700
                            outline-none
                            transition-all
                            focus:border-purple-400
                            focus:bg-white
                            focus:ring-4
                            focus:ring-purple-100
                          "
                        />

                      </div>

                    </div>

                  </div>


                  {/* Guests + Budget */}

                  <div className="mt-5 grid gap-5 md:grid-cols-2">

                    {/* Guests */}

                    <div>

                      <label className="text-sm font-semibold text-gray-700">
                        Guest Count
                      </label>

                      <div className="relative">

                        <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />

                        <input
                          type="number"
                          name="guest"
                          placeholder="Approx guests"
                          value={formData.guest}
                          onChange={handleChange}
                          className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-purple-100
                            bg-white/70
                            py-3.5
                            pl-11
                            pr-4
                            text-gray-700
                            outline-none
                            transition-all
                            focus:border-purple-400
                            focus:bg-white
                            focus:ring-4
                            focus:ring-purple-100
                          "
                        />

                      </div>

                    </div>


                    {/* Budget */}

                    <div>

                      <label className="text-sm font-semibold text-gray-700">
                        Estimated Budget
                      </label>

                      <div className="relative">

                        <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />

                        <input
                          type="number"
                          name="budget"
                          placeholder="Approx budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="
                            mt-2
                            w-full
                            rounded-xl
                            border
                            border-purple-100
                            bg-white/70
                            py-3.5
                            pl-11
                            pr-4
                            text-gray-700
                            outline-none
                            transition-all
                            focus:border-purple-400
                            focus:bg-white
                            focus:ring-4
                            focus:ring-purple-100
                          "
                        />

                      </div>

                    </div>

                  </div>

                </div>


                {/* =========================================
                    MESSAGE
                ========================================== */}

                <div>

                  <div className="mb-4 mt-8 flex items-center gap-2">

                    <div className="h-2 w-2 rounded-full bg-fuchsia-600" />

                    <h3 className="font-bold text-gray-700">
                      Special Requirements
                    </h3>

                  </div>

                  <textarea
                    rows="5"
                    name="message"
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-purple-100
                      bg-white/70
                      px-4
                      py-3.5
                      text-gray-700
                      outline-none
                      transition-all
                      placeholder:text-gray-400
                      hover:border-purple-200
                      focus:border-purple-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-purple-100
                    "
                  />

                </div>


                {/* =========================================
                    SUBMIT
                ========================================== */}

                <button
                  type="submit"
                  className="
                    group
                    relative
                    w-full
                    overflow-hidden
                    rounded-xl
                    bg-gradient-to-r
                    from-purple-600
                    via-violet-600
                    to-fuchsia-600
                    py-4
                    text-lg
                    font-bold
                    text-white
                    shadow-lg
                    shadow-purple-300/40
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    hover:shadow-purple-300/50
                    active:translate-y-0
                  "
                >

                  {/* Shine animation */}

                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative flex items-center justify-center gap-3">

                    Submit Booking

                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />

                  </span>

                </button>


                <p className="flex items-center justify-center gap-2 text-xs text-gray-400">

                  <FaCheckCircle className="text-green-500" />

                  Your information is safe and secure

                </p>

              </form>

            </div>

          </div>


          {/* =================================================
              BOOKING SUMMARY
          ================================================== */}

          <div>

            <div className="sticky top-24 space-y-6">

              {/* Summary Card */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-white/80
                  bg-white/60
                  p-6
                  shadow-[0_20px_60px_rgba(124,58,237,0.12)]
                  backdrop-blur-2xl
                "
              >

                {/* Header gradient */}

                <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600 p-5 text-white">

                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />

                  <div className="relative">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">

                        <FaCamera />

                      </div>

                      <div>

                        <h2 className="text-xl font-bold">
                          Booking Summary
                        </h2>

                        <p className="text-xs text-purple-100">
                          Live preview of your booking
                        </p>

                      </div>

                    </div>

                  </div>

                </div>


                {/* Summary details */}

                <div className="space-y-4">

                  {/* Service */}

                  <div className="flex items-center justify-between rounded-xl bg-purple-50/70 p-3">

                    <div className="flex items-center gap-3">

                      <FaCamera className="text-purple-600" />

                      <span className="text-sm text-gray-600">
                        Service
                      </span>

                    </div>

                    <span className="text-sm font-bold text-gray-800">
                      {formData.eventType || "Wedding Shoot"}
                    </span>

                  </div>


                  {/* Date */}

                  <div className="rounded-xl bg-purple-50/70 p-3">

                    <div className="flex items-center gap-3">

                      <FaCalendarAlt className="text-purple-600" />

                      <span className="text-sm text-gray-600">
                        Event Duration
                      </span>

                    </div>

                    <div className="mt-2 ml-7 text-sm font-semibold text-gray-700">

                      <div>
                        {formatDate(formData.eventDate)}
                      </div>

                      <div className="my-1 text-xs text-gray-400">
                        to
                      </div>

                      <div>
                        {formatDate(formData.eventEndDate)}
                      </div>

                    </div>

                  </div>


                  {/* Location */}

                  <div className="flex items-center justify-between rounded-xl bg-purple-50/70 p-3">

                    <div className="flex items-center gap-3">

                      <FaMapMarkerAlt className="text-purple-600" />

                      <span className="text-sm text-gray-600">
                        Location
                      </span>

                    </div>

                    <span className="max-w-[150px] truncate text-right text-sm font-semibold text-gray-800">
                      {formData.location || "--"}
                    </span>

                  </div>


                  {/* Guests */}

                  <div className="flex items-center justify-between rounded-xl bg-purple-50/70 p-3">

                    <div className="flex items-center gap-3">

                      <FaUsers className="text-purple-600" />

                      <span className="text-sm text-gray-600">
                        Guests
                      </span>

                    </div>

                    <span className="font-semibold text-gray-800">
                      {formData.guest || "--"}
                    </span>

                  </div>


                  {/* Budget */}

                  <div className="flex items-center justify-between rounded-xl bg-purple-50/70 p-3">

                    <div className="flex items-center gap-3">

                      <FaRupeeSign className="text-purple-600" />

                      <span className="text-sm text-gray-600">
                        Budget
                      </span>

                    </div>

                    <span className="font-bold text-purple-700">

                      {formData.budget
                        ? `₹ ${Number(formData.budget).toLocaleString("en-IN")}`
                        : "--"}

                    </span>

                  </div>

                </div>


                {/* Divider */}

                <div className="my-6 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />


                {/* Why Choose Us */}

                <div>

                  <div className="mb-4 flex items-center gap-2">

                    <FaHeart className="text-purple-600" />

                    <h3 className="font-bold text-gray-800">
                      Why Choose Us?
                    </h3>

                  </div>


                  <div className="space-y-3">

                    {features.map((feature, index) => (

                      <div
                        key={feature}
                        className="group flex items-center gap-3 rounded-xl p-2 transition-all duration-300 hover:bg-purple-50 hover:translate-x-1"
                      >

                        <div
                          className="
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            bg-green-100
                            text-green-600
                            transition-transform
                            duration-300
                            group-hover:scale-110
                          "
                        >

                          <FaCheckCircle className="text-sm" />

                        </div>

                        <span className="text-sm text-gray-600">
                          {feature}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>


              {/* Support card */}

              <div className="overflow-hidden rounded-[25px] bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 p-6 text-white shadow-xl">

                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md">

                    <FaPhoneAlt />

                  </div>

                  <div>

                    <h3 className="font-bold">
                      Need help?
                    </h3>

                    <p className="mt-1 text-sm text-purple-200">
                      Our team is available to assist you.
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-xs text-purple-200">

                      <FaClock />

                      Mon - Sat · 9 AM - 7 PM

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          ANIMATION CSS
      ====================================================== */}

      <style>{`

        @keyframes floatingBlob {

          0% {
            transform: translate(0px, 0px);
          }

          50% {
            transform: translate(-25px, -25px);
          }

          100% {
            transform: translate(0px, 0px);
          }

        }


        @keyframes floatingSmall {

          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-20px);
          }

          100% {
            transform: translateY(0px);
          }

        }

      `}</style>

    </div>
  );
};

export default Booking;