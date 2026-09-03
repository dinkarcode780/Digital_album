import mongoose from "mongoose";
import { hashValue } from "../utils/hashValue.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: Number,
    },
    password: {
      type: String,
    },
    resetOTP: {
      type: String,
      trim: true,
    },
    resetOTPExpires: {
      type: Date,
    },

    userType: {
      type: String,
      enum: ["SuperAdmin","Admin", "User",],
      default: "User",
    },

    ownerAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    profileImage: {
      type: String,
    },

    publicId: {
      type: String,
    },

    address: {
      type: String,
      trim: true,
    },

    resetOtp:{
      type:String
    },

    resetOtpExpiry:{
      type:Date
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;

const createDefaultAdmin = async () => {
  const password = "admin123";

  const existingSuperAdmin = await User.findOne({ email: "superadmin@gmail.com" });

  if (!existingSuperAdmin) {
    const hashedPassword = await hashValue(password);

    await User.create({
      name: "Super Admin",
      email: "superadmin@gmail.com",
      password: hashedPassword,
      userType: "SuperAdmin",
    });

    console.log("Default super admin created successfully");
  } else {
    console.log("Default super admin already exists");
  }
};

export { createDefaultAdmin };
