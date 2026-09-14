import crypto from "crypto";
import Razorpay from "razorpay";
import Booking from "../../models/bookingModel.js";
import Event from "../../models/eventModel.js";
import userModel from "../../models/userModel.js";
import asyncHandler from "../../utils/asyncHandler.js";

// Razorpay SDK Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==========================================
// 1. GET RAZORPAY PUBLIC CONFIG
// ==========================================
export const getBookingRazorpayConfig = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
});

// ==========================================
// 2. CREATE RAZORPAY ORDER FOR BOOKING
// ==========================================
export const createBookingRazorpayOrder = asyncHandler(async (req, res) => {
  const { amount, bookingId, clientName } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "A valid advance payment amount is required",
    });
  }

  const options = {
    amount: Math.round(Number(amount) * 100), // in paise
    currency: "INR",
    receipt: `bk_${Date.now().toString(36)}_${Math.floor(100 + Math.random() * 900)}`,
    notes: {
      clientName: clientName || "Client",
      bookingId: bookingId || "",
      purpose: "Photoshoot Advance Booking",
    },
  };

  try {
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to initiate Razorpay order",
    });
  }
});

// ==========================================
// 3. VERIFY RAZORPAY PAYMENT & CONFIRM BOOKING
// ==========================================
export const verifyBookingRazorpayPayment = asyncHandler(async (req, res) => {
  const {
    bookingId,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Missing required Razorpay payment credentials for verification",
    });
  }

  // Verify HMAC signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Invalid Razorpay payment signature. Payment verification failed.",
    });
  }

  // Update Booking in DB if bookingId provided
  let booking = null;
  if (bookingId) {
    booking = await Booking.findById(bookingId);
    if (booking) {
      booking.paymentStatus = "Advance Paid";
      booking.status = "Confirmed";
      booking.paymentMethod = "Razorpay Online";
      booking.razorpayOrderId = razorpay_order_id;
      booking.razorpayPaymentId = razorpay_payment_id;
      booking.razorpaySignature = razorpay_signature;
      booking.transactionId = razorpay_payment_id;
      await booking.save();
    }
  }

  // Also update Event table if synchronized
  try {
    if (booking) {
      await Event.updateMany(
        { userId: booking.userId, adminId: booking.adminId, eventDate: booking.shootDate },
        {
          paymentStatus: "Advance Paid",
          status: "Upcoming",
          paymentMethod: "Razorpay Online",
          transactionId: razorpay_payment_id,
        }
      );
    }
  } catch (err) {
    console.warn("Event payment sync note:", err.message);
  }

  res.status(200).json({
    success: true,
    message: "🎉 Razorpay payment verified and booking confirmed successfully!",
    data: {
      bookingId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentStatus: "Advance Paid",
      status: "Confirmed",
    },
  });
});

// ==========================================
// 4. CREATE NEW BOOKING (User must be logged in)
// ==========================================
export const createBooking = asyncHandler(async (req, res) => {
  const {
    adminId,
    serviceId,
    clientName,
    clientPhone,
    clientEmail,
    eventType,
    shootDate,
    shootEndDate,
    location,
    notes,
    paymentOption,
    paymentStatus,
    advanceAmount,
    totalAmount,
    paymentMethod,
    transactionId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  } = req.body;

  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please log in before booking a photoshoot.",
    });
  }

  if (!adminId || !clientName || !clientPhone || !shootDate || !eventType) {
    return res.status(400).json({
      success: false,
      message: "Studio, Client Name, Contact Phone, Shoot Date, and Event Type are required.",
    });
  }

  const finalPaymentOption = paymentOption === "pay_now" ? "pay_now" : "pay_later";
  const finalPaymentStatus =
    paymentStatus || (finalPaymentOption === "pay_now" ? "Advance Paid" : "Pending");
  const finalPaymentMethod =
    paymentMethod || (finalPaymentOption === "pay_now" ? "Razorpay Online" : "Pay Later at Shoot");
  const finalAdvance = finalPaymentOption === "pay_now" ? Number(advanceAmount) || 1000 : 0;
  const initialStatus = finalPaymentStatus === "Advance Paid" ? "Confirmed" : "Pending";

  // 1. Create Booking record
  const booking = await Booking.create({
    userId,
    adminId,
    serviceId: serviceId || null,
    clientName,
    clientPhone,
    clientEmail: clientEmail || req.user.email || "",
    eventType,
    shootDate: new Date(shootDate),
    shootEndDate: shootEndDate ? new Date(shootEndDate) : null,
    location: location || "Studio Client Location",
    notes: notes || "",
    paymentOption: finalPaymentOption,
    paymentStatus: finalPaymentStatus,
    advanceAmount: finalAdvance,
    totalAmount: Number(totalAmount) || 0,
    paymentMethod: finalPaymentMethod,
    transactionId: transactionId || razorpayPaymentId || "",
    razorpayOrderId: razorpayOrderId || "",
    razorpayPaymentId: razorpayPaymentId || "",
    razorpaySignature: razorpaySignature || "",
    status: initialStatus,
    isActive: true,
  });

  // 2. Also register in Event model for studio calendar synchronization
  try {
    await Event.create({
      userId,
      adminId,
      brideName: clientName,
      groomName: eventType,
      clientPhone,
      clientEmail: clientEmail || req.user.email || "",
      location: location || "Studio Client Location",
      eventDate: new Date(shootDate),
      eventEndDate: shootEndDate ? new Date(shootEndDate) : null,
      notes: notes || "",
      paymentOption: finalPaymentOption,
      paymentStatus: finalPaymentStatus,
      advanceAmount: finalAdvance,
      totalAmount: Number(totalAmount) || 0,
      paymentMethod: finalPaymentMethod,
      transactionId: transactionId || razorpayPaymentId || "",
      status: "Upcoming",
      isActive: true,
    });
  } catch (syncErr) {
    console.warn("Event sync notice:", syncErr.message);
  }

  const populatedBooking = await Booking.findById(booking._id)
    .populate("adminId", "name email phoneNumber address profileImage")
    .populate("serviceId", "title price description features");

  res.status(201).json({
    success: true,
    message:
      finalPaymentOption === "pay_now"
        ? `Booking confirmed with ₹${finalAdvance} advance payment! Studio will contact you soon.`
        : "Booking request submitted successfully! Pay on shoot date.",
    data: populatedBooking,
  });
});

// ==========================================
// 5. GET USER'S BOOKINGS (Client Profile)
// ==========================================
export const getUserBookings = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const bookings = await Booking.find({ userId, isActive: true })
    .populate("adminId", "name email phoneNumber address profileImage")
    .populate("serviceId", "title price description features")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

// ==========================================
// 6. GET STUDIO'S BOOKINGS (Admin Dashboard)
// ==========================================
export const getStudioBookings = asyncHandler(async (req, res) => {
  const adminId = req.user._id;

  const bookings = await Booking.find({ adminId, isActive: true })
    .populate("userId", "name email phoneNumber profileImage")
    .populate("serviceId", "title price description features")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

// ==========================================
// 7. GET SINGLE BOOKING BY ID
// ==========================================
export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findById(id)
    .populate("adminId", "name email phoneNumber address profileImage")
    .populate("userId", "name email phoneNumber profileImage")
    .populate("serviceId", "title price description features");

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking record not found",
    });
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

// ==========================================
// 8. UPDATE BOOKING STATUS (Admin or User)
// ==========================================
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus, notes } = req.body;

  const booking = await Booking.findById(id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }

  if (status) booking.status = status;
  if (paymentStatus) booking.paymentStatus = paymentStatus;
  if (notes) booking.notes = notes;

  await booking.save();

  res.status(200).json({
    success: true,
    message: "Booking status updated successfully",
    data: booking,
  });
});

// ==========================================
// 9. CANCEL BOOKING
// ==========================================
export const cancelBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await Booking.findById(id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }

  booking.status = "Cancelled";
  await booking.save();

  res.status(200).json({
    success: true,
    message: "Booking cancelled successfully",
    data: booking,
  });
});
