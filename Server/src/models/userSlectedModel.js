import mongoose from "mongoose";

const userSlectedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

   eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
    },

    selectedMedia: [
      {
        mediaId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Media",

        },
        comment: {
          type: String,
          trim: true,
          maxlength: 500,
        },
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Approved", "Rejected"],
      default: "Pending",
    },

    isLocked: {
      type: Boolean,
      default: false,
    },
    adminNotes: {
      type: String,
      trim: true,
    },

    submittedAt: {
      type: Date,
    },

  },
  {
    timestamps: true,
  },
);

const UserSelected = mongoose.model("UserSelected", userSlectedSchema);

export default UserSelected;
