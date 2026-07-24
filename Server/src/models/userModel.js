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
      enum: ["Admin", "User"],
      default: "User",
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

  const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

  if (!existingAdmin) {
    const hashedPassword = await hashValue(password);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      userType: "Admin",
    });

    console.log("Default admin created successfully");
  } else {
    console.log("Default admin already exists");
  }
};

export { createDefaultAdmin };
