import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

      icon: {
      type: String,
      default: "FaCamera",
      trim: true,
    },

    mediaUrl: {
      type: String,
    },

    mediaType: {
      type: String,
      enum: ["Image", "Video"],
    },

    publicId: {
      type: String,
    },

     isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;