import mongoose from "mongoose";

const eventCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const EventCategory = mongoose.model("EventCategory", eventCategorySchema);

export default EventCategory;