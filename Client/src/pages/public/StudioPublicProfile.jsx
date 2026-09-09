import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaGlobe,
  FaImages,
  FaServicestack,
  FaBookOpen,
  FaCommentDots,
  FaCheckCircle,
  FaCrown,
  FaTimes,
  FaCalendarAlt,
  FaSpinner,
  FaCamera,
  FaVideo,
  FaArrowLeft,
  FaQuoteLeft,
  FaChevronRight,
  FaInfoCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../config/axios";
import Footer from "../../components/layout/Footer";

export default function StudioPublicProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studio, setStudio] = useState(null);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("albums"); // 'albums' | 'services' | 'about' | 'blogs' | 'reviews'

  // Lightbox Modal for Showcase Albums
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState(null);

  // Booking Modal
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    eventType: "Wedding Photography",
    eventDate: "",
    eventEndDate: "",
    location: "",
    notes: "",
  });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  // Check auth
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (currentUser) {
      setBookingForm((prev) => ({
        ...prev,
        clientName: currentUser.name || "",
        clientEmail: currentUser.email || "",
        clientPhone: currentUser.phoneNumber ? String(currentUser.phoneNumber) : "",
      }));
    }
  }, []);

  const loadStudioDetails = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/public/studios/${id}`);
      const data = res.data?.data || {};
      setStudio(data.studio || null);
      setServices(data.services || []);
      setBlogs(data.blogs || []);
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Error loading studio details:", error);
      toast.error("Studio profile not found or is currently private");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudioDetails();
  }, [id]);

  const handleOpenBooking = (service = null) => {
    setSelectedService(service);
    if (service) {
      setBookingForm((prev) => ({
        ...prev,
        eventType: service.title || prev.eventType,
      }));
    }
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.info("Please sign in or register to complete your booking with this studio!");
      // Save intended booking state in localStorage so we can resume
      localStorage.setItem(
        "pendingBooking",
        JSON.stringify({
          adminId: studio?.adminId?._id || studio?.adminId,
          ...bookingForm,
        })
      );
      navigate(`/login?redirect=/studio/${id}`);
      return;
    }

    if (!bookingForm.eventDate || !bookingForm.clientPhone) {
      toast.error("Please provide your contact phone number and shoot date");
      return;
    }

    try {
      setBookingSubmitting(true);
      const adminId = studio?.adminId?._id || studio?.adminId;

      await axiosInstance.post("/public/book-inquiry", {
        adminId,
        ...bookingForm,
        serviceId: selectedService?._id || null,
      });

      toast.success("🎉 Shoot booking inquiry submitted successfully! The studio will contact you shortly.");
      setShowBookingModal(false);
      setSelectedService(null);
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.message || "Failed to submit booking inquiry");
    } finally {
      setBookingSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-24">
        <FaSpinner className="animate-spin text-purple-600 text-5xl mb-4" />
        <p className="text-gray-600 font-bold text-base">Loading studio showcase portfolio...</p>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <FaCamera className="text-5xl text-gray-300 mb-3" />
        <h2 className="text-2xl font-bold text-gray-800">Studio Profile Not Found</h2>
        <p className="text-gray-500 text-sm mt-1 max-w-sm">
          This studio profile might have been unlisted or removed.
        </p>
        <Link
          to="/studios"
          className="mt-5 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-2xl shadow-md"
        >
          Explore All Studios
        </Link>
      </div>
    );
  }

  const adminData = studio.adminId || {};
  const showcaseAlbums = studio.showcaseAlbums || [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navbar Header */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/studios"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-purple-600 transition"
          >
            <FaArrowLeft />
            <span>Back to All Studios</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenBooking(null)}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-2xl text-xs font-bold shadow-md shadow-purple-500/20 transition"
            >
              Book Studio Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Cover Banner */}
      <section className="relative bg-gray-900 text-white">
        <div className="h-64 sm:h-80 md:h-96 w-full overflow-hidden relative">
          <img
            src={studio.coverBanner}
            alt={studio.studioName}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/40 to-transparent"></div>
        </div>

        {/* Studio Info Header floating over banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 relative z-10 pb-8">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 text-gray-900 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <img
                src={
                  studio.logo ||
                  adminData.profileImage ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    studio.studioName
                  )}&background=7c3aed&color=fff`
                }
                alt={studio.studioName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-purple-500/20 shadow-xl bg-white shrink-0"
              />

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                    {studio.studioName}
                  </h1>
                  {studio.isFeatured && (
                    <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <FaCrown className="text-amber-600" /> Featured
                    </span>
                  )}
                </div>

                <p className="text-gray-500 text-xs sm:text-sm font-medium">
                  {studio.tagline}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-600 flex-wrap pt-1">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <FaMapMarkerAlt className="text-purple-600" />
                    <span>{studio.city}</span>
                    {studio.address && <span className="text-gray-400">· {studio.address}</span>}
                  </span>

                  <span className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-md">
                    <FaStar />
                    <span>{studio.rating}</span>
                    <span className="text-gray-400 font-normal">({studio.reviewCount} Reviews)</span>
                  </span>

                  <span className="text-gray-500 font-medium">
                    {studio.experienceYears}+ Years Experience · {studio.eventsCompleted}+ Shoots
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Contact / Book CTAs */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {studio.whatsappNumber && (
                <a
                  href={`https://wa.me/${studio.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-2xl text-sm font-bold transition flex items-center gap-1.5"
                  title="WhatsApp Studio"
                >
                  <FaWhatsapp className="text-lg" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              )}

              {studio.phoneNumber && (
                <a
                  href={`tel:${studio.phoneNumber}`}
                  className="p-3 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-2xl text-sm font-bold transition flex items-center gap-1.5"
                  title="Call Studio"
                >
                  <FaPhoneAlt />
                  <span className="hidden sm:inline">Call</span>
                </a>
              )}

              {studio.instagram && (
                <a
                  href={studio.instagram.startsWith("http") ? studio.instagram : `https://instagram.com/${studio.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-pink-50 text-pink-600 hover:bg-pink-100 rounded-2xl text-sm font-bold transition"
                  title="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </a>
              )}

              <button
                onClick={() => handleOpenBooking(null)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-md shadow-purple-500/20 transition transform hover:-translate-y-0.5"
              >
                Book Studio Shoot
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section with Tabs */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 space-y-8 w-full">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
          {[
            { id: "albums", label: `Showcase Albums (${showcaseAlbums.length})`, icon: <FaImages /> },
            { id: "services", label: `Packages & Services (${services.length})`, icon: <FaServicestack /> },
            { id: "about", label: "About Studio & Bio", icon: <FaInfoCircle /> },
            { id: "reviews", label: `Client Reviews (${testimonials.length})`, icon: <FaCommentDots /> },
            { id: "blogs", label: `Studio Stories (${blogs.length})`, icon: <FaBookOpen /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-700 border border-gray-200"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: SHOWCASE / DEMO PORTFOLIO ALBUMS */}
        {/* ========================================================================= */}
        {activeTab === "albums" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Showcase Portfolio Albums</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Explore real wedding shoots, pre-wedding teasers, and high-res client galleries captured by {studio.studioName}.
              </p>
            </div>

            {showcaseAlbums.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                <FaImages className="text-4xl text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 font-bold text-sm">No showcase albums published yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {showcaseAlbums.map((album, idx) => (
                  <div
                    key={album._id || idx}
                    onClick={() => {
                      setSelectedAlbum(album);
                      setActiveLightboxImage(album.mediaUrls?.[0] || album.coverImage);
                    }}
                    className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                  >
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      <img
                        src={album.coverImage}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-3 py-1 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                          {album.category || "Wedding"}
                        </span>
                      </div>

                      <div className="absolute bottom-3.5 left-3.5 right-3.5">
                        <p className="text-white font-black text-base truncate">{album.title}</p>
                        <p className="text-white/80 text-xs mt-0.5 flex items-center gap-1.5">
                          <FaImages className="text-[10px]" />
                          <span>{(album.mediaUrls || []).length || 1} High-Res Photos</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-white flex items-center justify-between text-xs font-bold text-purple-600">
                      <span>Click to View Full Album Gallery</span>
                      <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PACKAGES & SERVICES */}
        {/* ========================================================================= */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Photography Packages & Services</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Transparent pricing and full coverage details for weddings, events, and portrait sessions.
              </p>
            </div>

            {services.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                <FaServicestack className="text-4xl text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 font-bold text-sm">No services listed yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {services.map((srv) => (
                  <div
                    key={srv._id}
                    className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl mb-4">
                        <FaCamera />
                      </div>

                      <h3 className="text-xl font-black text-gray-900">{srv.title}</h3>
                      <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                        {srv.description}
                      </p>

                      <div className="mt-5 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Package Pricing</p>
                        <p className="text-2xl font-black text-gray-900 mt-0.5">
                          {srv.price > 0 ? `₹${srv.price.toLocaleString("en-IN")}` : "Custom Quote"}
                        </p>
                      </div>

                      {/* Included Features */}
                      <div className="mt-5 space-y-2">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          Deliverables Included
                        </p>
                        {(srv.features || []).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                            <FaCheckCircle className="text-emerald-500 text-sm mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenBooking(srv)}
                      className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-2xl font-bold text-xs shadow-md shadow-purple-500/20 transition flex items-center justify-center gap-2"
                    >
                      <span>Book This Package</span>
                      <FaChevronRight className="text-[10px]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ABOUT STUDIO & BIO */}
        {/* ========================================================================= */}
        {activeTab === "about" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
                <h2 className="text-2xl font-black text-gray-900">About {studio.studioName}</h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {studio.aboutBio ||
                    "We are dedicated to crafting timeless visuals, capturing every tear, smile, and dance move with artistic cinematic perfection."}
                </p>

                {/* Specialties */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
                    Our Areas of Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(studio.specialties || []).map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-700 text-xs font-bold"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-3xl font-black text-purple-600">{studio.experienceYears}+</p>
                  <p className="text-xs font-bold text-gray-500 mt-1 uppercase">Years in Business</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-3xl font-black text-indigo-600">{studio.eventsCompleted}+</p>
                  <p className="text-xs font-bold text-gray-500 mt-1 uppercase">Shoots Delivered</p>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm text-center">
                  <p className="text-3xl font-black text-amber-500">{studio.rating} ★</p>
                  <p className="text-xs font-bold text-gray-500 mt-1 uppercase">Client Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Sidebar Studio Contact Card */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-gray-900">Studio Contact Information</h3>

                <div className="space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-purple-600 text-sm mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold">Studio Location</p>
                      <p className="text-gray-500">{studio.address || studio.city}</p>
                    </div>
                  </div>

                  {studio.phoneNumber && (
                    <div className="flex items-start gap-3">
                      <FaPhoneAlt className="text-purple-600 text-sm mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold">Direct Phone</p>
                        <p className="text-gray-500">{studio.phoneNumber}</p>
                      </div>
                    </div>
                  )}

                  {studio.email && (
                    <div className="flex items-start gap-3">
                      <FaEnvelope className="text-purple-600 text-sm mt-0.5 shrink-0" />
                      <div>
                        <p className="font-bold">Email</p>
                        <p className="text-gray-500">{studio.email}</p>
                      </div>
                    </div>
                  )}
                </div>

                {studio.googleMapLink && (
                  <a
                    href={studio.googleMapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-2xl border border-purple-200 text-purple-700 text-xs font-bold flex items-center justify-center gap-2 hover:bg-purple-50 transition"
                  >
                    <FaMapMarkerAlt /> Open in Google Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CLIENT TESTIMONIALS */}
        {/* ========================================================================= */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Client Reviews & Testimonials</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Real feedback from happy brides, grooms, and event hosts who trusted {studio.studioName}.
              </p>
            </div>

            {testimonials.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                <FaCommentDots className="text-4xl text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 font-bold text-sm">No client reviews added yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {testimonials.map((t) => (
                  <div
                    key={t._id}
                    className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex text-amber-400 text-sm">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">{t.eventName}</span>
                      </div>

                      <FaQuoteLeft className="text-purple-200 text-2xl mb-2" />
                      <p className="text-gray-700 text-sm leading-relaxed italic">
                        "{t.feedback}"
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-sm">
                        {t.clientName?.charAt(0) || "C"}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{t.clientName}</p>
                        <p className="text-[11px] text-gray-400">{t.clientRole}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: STUDIO BLOGS */}
        {/* ========================================================================= */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Studio Articles & Stories</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Photography tips, outfit advice, and wedding day inspiration from {studio.studioName}.
              </p>
            </div>

            {blogs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100">
                <FaBookOpen className="text-4xl text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 font-bold text-sm">No studio articles posted yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((b) => (
                  <div
                    key={b._id}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {b.image && (
                        <div className="h-44 overflow-hidden bg-gray-100">
                          <img
                            src={b.image}
                            alt={b.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 text-[10px] font-bold uppercase">
                          {b.category || "Story"}
                        </span>
                        <h3 className="text-lg font-black text-gray-900 mt-2 line-clamp-2">
                          {b.title}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1.5 line-clamp-3">
                          {b.description || b.content}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 text-[11px] text-gray-400">
                      Published on {new Date(b.createdAt).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* LIGHTBOX MODAL: FULL-SCREEN ALBUM GALLERY VIEWER */}
      {/* ========================================================================= */}
      {selectedAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="bg-gray-900 text-white rounded-3xl max-w-5xl w-full p-6 max-h-[95vh] overflow-y-auto flex flex-col justify-between border border-gray-800 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div>
                <span className="px-3 py-0.5 rounded-full bg-purple-600 text-[10px] font-bold uppercase tracking-wider">
                  {selectedAlbum.category}
                </span>
                <h3 className="text-xl font-bold mt-1 text-white">{selectedAlbum.title}</h3>
                <p className="text-xs text-gray-400">{selectedAlbum.description}</p>
              </div>
              <button
                onClick={() => setSelectedAlbum(null)}
                className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-gray-800 transition text-lg"
              >
                <FaTimes />
              </button>
            </div>

            {/* Active Preview */}
            <div className="my-6 max-h-[55vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black">
              <img
                src={activeLightboxImage}
                alt={selectedAlbum.title}
                className="max-h-[55vh] max-w-full object-contain"
              />
            </div>

            {/* Thumbnails strip */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {(selectedAlbum.mediaUrls || [selectedAlbum.coverImage]).map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => setActiveLightboxImage(url)}
                  className={`w-20 h-20 rounded-xl object-cover cursor-pointer transition ring-2 ${
                    activeLightboxImage === url ? "ring-purple-500 scale-105" : "ring-transparent opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: BOOK STUDIO SHOOT */}
      {/* ========================================================================= */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4 mb-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Book Shoot with {studio.studioName}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selectedService ? `Package: ${selectedService.title}` : "Direct Shoot Inquiry"}
                </p>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition"
              >
                <FaTimes />
              </button>
            </div>

            {!currentUser && (
              <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <FaInfoCircle className="text-amber-600 text-sm mt-0.5 shrink-0" />
                <span>
                  <strong>Note:</strong> You will be asked to sign in/register so this studio can link your album dashboard and event gallery!
                </span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={bookingForm.clientName}
                  onChange={(e) => setBookingForm({ ...bookingForm, clientName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={bookingForm.clientPhone}
                    onChange={(e) => setBookingForm({ ...bookingForm, clientPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={bookingForm.clientEmail}
                    onChange={(e) => setBookingForm({ ...bookingForm, clientEmail: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Event / Shoot Type *
                </label>
                <select
                  value={bookingForm.eventType}
                  onChange={(e) => setBookingForm({ ...bookingForm, eventType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white text-sm"
                >
                  <option value="Wedding Photography">Wedding Photography</option>
                  <option value="Pre-Wedding Shoot">Pre-Wedding Shoot</option>
                  <option value="Engagement & Ring Ceremony">Engagement & Ring Ceremony</option>
                  <option value="Birthday & Celebration">Birthday & Celebration</option>
                  <option value="Cinematic Video & Drone Shoot">Cinematic Video & Drone Shoot</option>
                  <option value="Fashion / Commercial Shoot">Fashion / Commercial Shoot</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Shoot Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingForm.eventDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Event City / Venue
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hotel Grand, Jaipur"
                    value={bookingForm.location}
                    onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Special Requirements or Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Number of functions, 4K Drone requirement..."
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bookingSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md shadow-purple-500/20 transition disabled:opacity-50 flex items-center gap-2"
                >
                  {bookingSubmitting && <FaSpinner className="animate-spin" />}
                  <span>Confirm & Send Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
