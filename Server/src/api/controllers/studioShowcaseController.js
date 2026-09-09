import asyncHandler from "../../utils/asyncHandler.js";
import StudioProfile from "../../models/studioProfileModel.js";
import Service from "../../models/servicesModel.js";
import Blog from "../../models/blogModel.js";
import Testimonial from "../../models/testimonialModel.js";
import User from "../../models/userModel.js";
import { getOrCreateStudioProfile } from "./publicStudioController.js";

// ==========================================
// ADMIN: STUDIO SHOWCASE & PROFILE MANAGEMENT
// ==========================================

export const getMyStudioProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateStudioProfile(req.user);

  const [services, blogs, testimonials] = await Promise.all([
    Service.find({ $or: [{ createdBy: req.user._id }, { adminId: req.user._id }] }).sort({
      createdAt: -1,
    }),
    Blog.find({ createdBy: req.user._id }).sort({ createdAt: -1 }),
    Testimonial.find({ adminId: req.user._id }).sort({ createdAt: -1 }),
  ]);

  res.status(200).json({
    success: true,
    data: {
      profile,
      services,
      blogs,
      testimonials,
    },
  });
});

export const updateMyStudioProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateStudioProfile(req.user);

  const allowedFields = [
    "studioName",
    "tagline",
    "aboutBio",
    "logo",
    "coverBanner",
    "phoneNumber",
    "whatsappNumber",
    "email",
    "address",
    "city",
    "state",
    "experienceYears",
    "eventsCompleted",
    "specialties",
    "pricingStartingFrom",
    "googleMapLink",
    "instagram",
    "facebook",
    "youtube",
    "websiteUrl",
    "isPublic",
    "showcaseAlbums",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      profile[field] = req.body[field];
    }
  });

  await profile.save();

  res.status(200).json({
    success: true,
    message: "Studio profile updated successfully",
    data: profile,
  });
});

export const addShowcaseAlbum = asyncHandler(async (req, res) => {
  const { title, category = "Wedding", coverImage, description = "", mediaUrls = [] } = req.body;

  if (!title || !coverImage) {
    return res.status(400).json({
      success: false,
      message: "Album title and cover image are required",
    });
  }

  const profile = await getOrCreateStudioProfile(req.user);

  const newAlbum = {
    title: title.trim(),
    category: category.trim(),
    coverImage,
    description: description.trim(),
    mediaUrls: Array.isArray(mediaUrls) ? mediaUrls : [coverImage],
  };

  profile.showcaseAlbums.unshift(newAlbum);
  await profile.save();

  res.status(201).json({
    success: true,
    message: "Showcase demo album added successfully",
    data: profile.showcaseAlbums,
  });
});

export const deleteShowcaseAlbum = asyncHandler(async (req, res) => {
  const { albumId } = req.params;
  const profile = await getOrCreateStudioProfile(req.user);

  profile.showcaseAlbums = profile.showcaseAlbums.filter(
    (album) => String(album._id) !== albumId
  );
  await profile.save();

  res.status(200).json({
    success: true,
    message: "Showcase album removed",
    data: profile.showcaseAlbums,
  });
});

// ==========================================
// ADMIN: SERVICES CRUD
// ==========================================

export const createStudioService = asyncHandler(async (req, res) => {
  const { title, description, price = 0, features = [], icon = "FaCamera", mediaUrl = "" } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: "Service title is required" });
  }

  const service = await Service.create({
    title: title.trim(),
    description: description ? description.trim() : "",
    price: Number(price) || 0,
    features: Array.isArray(features) ? features : [],
    icon,
    mediaUrl,
    createdBy: req.user._id,
    adminId: req.user._id,
    isActive: true,
  });

  res.status(201).json({
    success: true,
    message: "Service package created successfully",
    data: service,
  });
});

export const updateStudioService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findOneAndUpdate(
    { _id: id, $or: [{ createdBy: req.user._id }, { adminId: req.user._id }] },
    req.body,
    { new: true }
  );

  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }

  res.status(200).json({ success: true, message: "Service updated successfully", data: service });
});

export const deleteStudioService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findOneAndDelete({
    _id: id,
    $or: [{ createdBy: req.user._id }, { adminId: req.user._id }],
  });

  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found" });
  }

  res.status(200).json({ success: true, message: "Service deleted successfully" });
});

// ==========================================
// ADMIN: TESTIMONIALS CRUD
// ==========================================

export const createStudioTestimonial = asyncHandler(async (req, res) => {
  const { clientName, clientRole = "Wedding Client", rating = 5, feedback, eventName = "Event Shoot" } = req.body;

  if (!clientName || !feedback) {
    return res.status(400).json({ success: false, message: "Client name and feedback are required" });
  }

  const testimonial = await Testimonial.create({
    adminId: req.user._id,
    clientName: clientName.trim(),
    clientRole: clientRole.trim(),
    rating: Number(rating) || 5,
    feedback: feedback.trim(),
    eventName: eventName.trim(),
    isActive: true,
  });

  res.status(201).json({
    success: true,
    message: "Testimonial added successfully",
    data: testimonial,
  });
});

export const deleteStudioTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const testimonial = await Testimonial.findOneAndDelete({ _id: id, adminId: req.user._id });

  if (!testimonial) {
    return res.status(404).json({ success: false, message: "Testimonial not found" });
  }

  res.status(200).json({ success: true, message: "Testimonial deleted successfully" });
});

// ==========================================
// SUPER ADMIN: SHOWCASE OVERSIGHT & MODERATION
// ==========================================

export const getAllStudioShowcases = asyncHandler(async (req, res) => {
  const admins = await User.find({ userType: "Admin" }).select(
    "name email phoneNumber address profileImage isActive createdAt"
  );

  const showcases = await Promise.all(
    admins.map(async (adm) => {
      const profile = await getOrCreateStudioProfile(adm);
      const servicesCount = await Service.countDocuments({
        $or: [{ createdBy: adm._id }, { adminId: adm._id }],
      });
      const blogsCount = await Blog.countDocuments({ createdBy: adm._id });
      const testimonialsCount = await Testimonial.countDocuments({ adminId: adm._id });

      return {
        admin: adm,
        profile,
        servicesCount,
        blogsCount,
        testimonialsCount,
        demoAlbumsCount: (profile.showcaseAlbums || []).length,
      };
    })
  );

  res.status(200).json({ success: true, data: showcases });
});

export const toggleStudioFeatured = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const profile = await StudioProfile.findOne({ adminId });

  if (!profile) {
    return res.status(404).json({ success: false, message: "Studio profile not found" });
  }

  profile.isFeatured = !profile.isFeatured;
  await profile.save();

  res.status(200).json({
    success: true,
    message: profile.isFeatured ? "Studio marked as Featured on Homepage" : "Studio unfeatured",
    data: profile,
  });
});

export const toggleStudioPublicStatus = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  const profile = await StudioProfile.findOne({ adminId });

  if (!profile) {
    return res.status(404).json({ success: false, message: "Studio profile not found" });
  }

  profile.isPublic = !profile.isPublic;
  await profile.save();

  res.status(200).json({
    success: true,
    message: profile.isPublic ? "Studio is now visible on Public Directory" : "Studio hidden from Public Directory",
    data: profile,
  });
});
