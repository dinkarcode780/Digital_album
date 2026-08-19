import crypto from "crypto";
import asyncHandler from "../../utils/asyncHandler.js";
import inviteModel from "../../models/inviteModel.js";
import { sendInviteEmail } from "../../utils/sendInviteEmail.js";
import { sendSmsInvite } from "../../utils/sendSmsInvite.js";

export const inviteUser = asyncHandler(async (req, res) => {
  const { eventId, name, email, phoneNumber } = req.body;

  if (!eventId || !name || (!email && !phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: "Event, Name and Email or Phone Number are required",
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  const invite = await inviteModel.create({
    eventId,
    name,
    email,
    phoneNumber,
    inviteToken: token,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  const baseUrl = (process.env.CLIENT_URL || "https://digital-album-ten.vercel.app").replace(/\/+$/, "");
  const inviteLink = `${baseUrl}/invite/${token}`;

  let emailSent = false;
  let smsSent = false;
  let emailError = null;

  if (email) {
    try {
      await sendInviteEmail(email, inviteLink, name);
      emailSent = true;
    } catch (err) {
      console.error("Invite email failed:", err.message);
      emailError = err.message;
    }
  }

  if (phoneNumber) {
    try {
      smsSent = await sendSmsInvite(phoneNumber, inviteLink);
    } catch (err) {
      console.error("Invite SMS failed:", err.message);
    }
  }

  // If email was provided but failed, and SMS also didn't send:
  if (email && !emailSent && !smsSent) {
    return res.status(500).json({
      success: false,
      message: `Failed to send email invite: ${emailError || "Email service error. Please check EMAIL_USER and EMAIL_PASSWORD in Render environment settings."}`,
    });
  }

  const message = emailSent && smsSent
    ? "Invite sent successfully via Email and SMS."
    : emailSent
    ? "Invite sent successfully via Email."
    : smsSent
    ? "Invite sent successfully via SMS."
    : "Invite created successfully.";

  res.status(201).json({
    success: true,
    message,
    data: invite,
  });
});


export const verifyInvite = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Invite token is required.",
    });
  }

  const invite = await inviteModel
    .findOne({
      inviteToken: token,
    })
    .populate("eventId");

  if (!invite) {
    return res.status(404).json({
      success: false,
      message: "Invalid invitation link.",
    });
  }

  if (!invite.isActive) {
    return res.status(400).json({
      success: false,
      message: "This invitation has been disabled.",
    });
  }

  if (invite.isUsed) {
    return res.status(400).json({
      success: false,
      message: "This invitation has already been used.",
    });
  }

  if (invite.expiresAt < new Date()) {
    return res.status(400).json({
      success: false,
      message: "Invitation link has expired.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Invitation verified successfully.",
    data: {
      inviteId: invite._id,
      token: invite.inviteToken,
      eventId: invite.eventId?._id,
      event: invite.eventId,
      name: invite.name,
      email: invite.email,
      phoneNumber: invite.phoneNumber,
      status: invite.status,
    },
  });
});

export const getAllInviteByFilter = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    eventId,
    isActive,
  } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      // { phoneNumber: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  if (eventId) {
    query.eventId = eventId;
  }

  if (isActive !== undefined) {
    query.isActive = isActive === "true";
  }

  const totalRecords = await inviteModel.countDocuments(query);

  const invites = await inviteModel
    .find(query)
    .populate("eventId")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return res.status(200).json({
    success: true,
    message: "Invites fetched successfully.",
    data: invites,
    pagination: {
      totalRecords,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRecords / limit),
      limit: Number(limit),
      hasNextPage: Number(page) < Math.ceil(totalRecords / limit),
      hasPrevPage: Number(page) > 1,
    },
  });
});