import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaQuestionCircle,
} from "react-icons/fa";

const faqs = [
  {
    id: 1,
    question: "How can I download my selected photos?",
    answer: "After the studio approves your selection, the Download button will appear in your album.",
  },
  {
    id: 2,
    question: "Can I change my selected photos later?",
    answer: "Yes, until the studio locks your selection, you can modify it anytime.",
  },
  {
    id: 3,
    question: "Why can't I download videos?",
    answer: "Video downloads depend on the permissions given by the studio.",
  },
];

const Support = () => {
  return (
    <div className="max-w-7xl mx-auto px-5 py-8">

      {/* Heading */}

      <div className="text-center">

        <h1 className="text-4xl font-bold">
          Help & Support
        </h1>

        <p className="text-gray-500 mt-2">
          Need help? Contact us or raise a support request.
        </p>

      </div>

      {/* Contact Cards */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow p-6 text-center">

          <FaPhoneAlt
            className="mx-auto text-purple-600"
            size={35}
          />

          <h3 className="font-bold mt-4">
            Phone
          </h3>

          <p className="text-gray-500 mt-2">
            +91 9876543210
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">

          <FaEnvelope
            className="mx-auto text-purple-600"
            size={35}
          />

          <h3 className="font-bold mt-4">
            Email
          </h3>

          <p className="text-gray-500 mt-2">
            support@albumstudio.com
          </p>

        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">

          <FaMapMarkerAlt
            className="mx-auto text-purple-600"
            size={35}
          />

          <h3 className="font-bold mt-4">
            Address
          </h3>

          <p className="text-gray-500 mt-2">
            Begusarai, Bihar
          </p>

        </div>

      </div>

      {/* Support Form */}

      <div className="bg-white rounded-xl shadow mt-10 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Raise a Support Ticket
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Your Name"
            className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

        </div>

        <input
          type="text"
          placeholder="Subject"
          className="border rounded-lg px-4 py-3 mt-5 w-full outline-none focus:ring-2 focus:ring-purple-500"
        />

        <textarea
          rows="5"
          placeholder="Describe your issue..."
          className="border rounded-lg px-4 py-3 mt-5 w-full outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        ></textarea>

        <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg">

          Submit Ticket

        </button>

      </div>

      {/* FAQ */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">

          {faqs.map((faq) => (

            <div
              key={faq.id}
              className="bg-white rounded-xl shadow p-5"
            >

              <div className="flex items-center gap-3">

                <FaQuestionCircle className="text-purple-600" />

                <h3 className="font-semibold">
                  {faq.question}
                </h3>

              </div>

              <p className="text-gray-500 mt-3">
                {faq.answer}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* WhatsApp */}

      <div className="bg-green-500 text-white rounded-xl mt-10 p-6 flex justify-between items-center flex-col md:flex-row gap-4">

        <div>

          <h2 className="text-2xl font-bold">
            Need Instant Help?
          </h2>

          <p className="mt-2">
            Chat with our support team on WhatsApp.
          </p>

        </div>

        <button className="bg-white text-green-600 px-6 py-3 rounded-lg flex items-center gap-2 font-semibold">

          <FaWhatsapp />

          Chat Now

        </button>

      </div>

    </div>
  );
};

export default Support;