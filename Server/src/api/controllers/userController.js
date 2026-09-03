import asyncHandler from "../../utils/asyncHandler.js";
import userModel from "../../models/userModel.js";
import { compareValue, hashValue } from "../../utils/hashValue.js";
import jwt from "jsonwebtoken";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../middleware/multerS3.js";
import { sendResetPasswordEmail } from "../middleware/nodemailer.js";
import { sendOtp } from "../../utils/sendOtp.js";

export const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  if (!name || !password || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existingUser = await userModel.findOne({ phoneNumber });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const hashPassword = await hashValue(password);

  const user = await userModel.create({
    name,
    email,
    password: hashPassword,
    phoneNumber,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const userLogin = asyncHandler(async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({
      success: false,
      message: "email or password is missing",
    });
  }

  const user = await userModel.findOne({ phoneNumber });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isMatch = await compareValue(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  user._doc.token = token;

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: user,
  });
});

export const userUpdateProfile = asyncHandler(async (req, res) => {
  const { userId, name, email, phoneNumber, address} = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId is required",
    });
  }

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (req.file) {
    if (user.publicId) {
      await deleteFromCloudinary(user.publicId);
    }
    const cloudeResult = await uploadToCloudinary(
      req.file,
      "profileImages",
    );
    user.profileImage = cloudeResult.secure_url;
    user.publicId = cloudeResult.public_id;
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (address) user.address = address;

  await user.save();

  res.status(200).json({
    success: true,
    message: "User profile updated successfully",
    data: user,
  });
});

export const userChangePassword = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Current password and new password are required",
    });
  }

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const isMatch = await compareValue(currentPassword, user.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  const hashPassword = await hashValue(newPassword);
  user.password = hashPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId is required",
    });
  }

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: user,
  });
});

// export const userForgetPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({
//       success: false,
//       message: "Email is required",
//     });
//   }

//   const user = await userModel.findOne({ email });

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User not found",
//     });
//   }

//   const otp = Math.floor(1000 + Math.random() * 9000).toString();
//   user.resetOTP = otp;
//   user.resetOTPExpires = Date.now() + 1 * 60 * 1000;
//   await user.save();

//   await sendResetPasswordEmail(email, otp);

//   res.status(200).json({
//     success: true,
//     message: "Password reset OTP sent to your email",
//   });
// });

export const userForgetPassword = asyncHandler(async (req, res) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Email or Phone Number is required",
    });
  }

  let user;

  if (email) {
    user = await userModel.findOne({ email: email.trim() });
  } else {
    user = await userModel.findOne({ phoneNumber });
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Generate OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  user.resetOTP = otp;
  user.resetOTPExpires = Date.now() + 1 * 60 * 1000; // 1 Minute

  await user.save();

  // Send OTP
  if (email) {
    try {
      await sendResetPasswordEmail(user.email, otp);

      return res.status(200).json({
        success: true,
        message: "Password reset OTP sent to your email",
      });
    } catch (emailErr) {
      return res.status(500).json({
        success: false,
        message: emailErr?.message || "Failed to send reset email.",
      });
    }
  }

  if (phoneNumber) {
    try {
      const isSent = await sendOtp(user.phoneNumber, otp);

      if (!isSent) {
        return res.status(429).json({
          success: false,
          message: "OTP limit exceeded. Please try again later.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Password reset OTP sent to your phone number",
      });
    } catch (smsErr) {
      console.error("MSG91 Error:", smsErr);
      return res.status(500).json({
        success: false,
        message: smsErr?.message || "Failed to send SMS OTP.",
      });
    }
  }
});

export const userResetPassword = asyncHandler(async (req, res) => {
  const { email, phoneNumber, otp, newPassword } = req.body;

  if ((!email && !phoneNumber) || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email or Phone Number, OTP and New Password are required",
    });
  }

  let user;

  if (email) {
    user = await userModel.findOne({ email });
  } else {
    user = await userModel.findOne({ phoneNumber });
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (
    !user.resetOTP ||
    user.resetOTP !== otp ||
    !user.resetOTPExpires ||
    user.resetOTPExpires < Date.now()
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired OTP",
    });
  }

  const hashPassword = await hashValue(newPassword);

  user.password = hashPassword;
  user.resetOTP = undefined;
  user.resetOTPExpires = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});

// export const userResetPassword = asyncHandler(async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   if (!email || !otp || !newPassword) {
//     return res.status(400).json({
//       success: false,
//       message: "Email, OTP and new password are required",
//     });
//   }

//   const user = await userModel.findOne({ email });

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User not found",
//     });
//   }

//   if (
//     !user.resetOTP ||
//     user.resetOTP !== otp ||
//     !user.resetOTPExpires ||
//     user.resetOTPExpires < Date.now()
//   ) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid or expired OTP",
//     });
//   }

//   const hashPassword = await hashValue(newPassword);
//   user.password = hashPassword;
//   user.resetOTP = undefined;
//   user.resetOTPExpires = undefined;
//   await user.save();

//   res.status(200).json({
//     success: true,
//     message: "Password reset successfully",
//   });
// });

// export const getUserByFilter = asyncHandler(async (req, res) => {
//   const {
//     search,
//     userType,
//     isActive,
//     page = 1,
//     limit = 10,
//   } = req.query;

//   const filter = {};

//  if (search) {
//   const orConditions = [
//     {
//       name: {
//         $regex: search,
//         $options: "i",
//       },
//     },
//     {
//       email: {
//         $regex: search,
//         $options: "i",
//       },
//     },
//   ];

//   // Agar search numeric hai tabhi phoneNumber search karo
//   if (!isNaN(search)) {
//     orConditions.push({
//       phoneNumber: Number(search),
//     });
//   }

//   filter.$or = orConditions;
// }

//   if (userType && userType !== "All") {
//     filter.userType = userType;
//   }

//   if (
//     isActive !== undefined &&
//     isActive !== "" &&
//     isActive !== "All"
//   ) {
//     filter.isActive = isActive === "true";
//   }

//   const pageNumber = Number(page);
//   const limitNumber = Number(limit);

//   const skip = (pageNumber - 1) * limitNumber;

//   const users = await userModel
//     .find(filter)
//     .select("-password")
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limitNumber);

//   const totalUsers = await userModel.countDocuments(filter);

//   res.status(200).json({
//     success: true,
//     message: "All users fetched successfully",
//     data: users,
//     totalUsers,
//     currentPage: pageNumber,
//     totalPages: Math.ceil(totalUsers / limitNumber),
//   });
// });


export const getUserByFilter = asyncHandler(async (req, res) => {
  let {
    search = "",
    userType,
    isActive,
    ownerAdminId,
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};

  if (req.user) {
    if (req.user.userType === "Admin") {
      filter.ownerAdminId = req.user._id;
      filter.userType = "User";
    } else if (req.user.userType === "User") {
      filter._id = req.user._id;
      filter.userType = "User";
    } else if (req.user.userType === "SuperAdmin") {
      // SuperAdmin can filter by specific studio admin or unassigned
      if (ownerAdminId === "unassigned") {
        filter.ownerAdminId = null;
      } else if (ownerAdminId && ownerAdminId !== "All") {
        filter.ownerAdminId = ownerAdminId;
      }
    }
  }

  if (userType && userType !== "All") {
    filter.userType = userType;
  }

  if (
    isActive !== undefined &&
    isActive !== "" &&
    isActive !== "All"
  ) {
    filter.isActive = isActive === "true";
  }

  if (search.trim()) {
    const orConditions = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];

    if (!isNaN(search)) {
      orConditions.push({ phoneNumber: Number(search) });
    }

    filter.$or = orConditions;
  }

  page = Number(page);

  const totalUsers = await userModel.countDocuments(filter);

  let limitNumber = limit === "All" ? totalUsers || 1 : Number(limit);

  if (!limitNumber || limitNumber <= 0) limitNumber = 10;

  const skip = (page - 1) * limitNumber;

  const users = await userModel
    .find(filter)
    .select("-password")
    .populate("ownerAdminId", "name email phoneNumber")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);

  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
    totalUsers,
    currentPage: page,
    totalPages: limit === "All" ? 1 : Math.ceil(totalUsers / limitNumber),
  });
});

export const userDeleteById = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId is required",
    });
  }

  const user = await userModel.findByIdAndDelete(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: user,
  });
});

export const userLogout = asyncHandler(async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

export const toggleUserStatus = asyncHandler(async (req, res) => {
  const userId = req.query?.userId || req.body?.userId;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId is required",
    });
  }

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.isActive = !user.isActive;

  await user.save();

  res.status(200).json({
    success: true,
    message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
    data: user,
  });
});
