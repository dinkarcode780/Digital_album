import asyncHandler from "../../utils/asyncHandler.js";
import eventModel from "../../models/eventModel.js";
import subcategoryModel from "../../models/subCategoryModel.js";

export const createEvent = asyncHandler(async (req, res) => {
  const {
    userId,
    eventSubCategoryId,
    eventDate,
    location,
    status,
    brideName,
    groomName,
  } = req.body;
  if (!userId || !eventSubCategoryId || !eventDate || !location) {
    return res.status(400).json({
      success: false,
      message:
        "userId, eventSubCategoryId, eventDate and location are required",
    });
  }

  const event = await eventModel.create({
    userId,
    eventSubCategoryId,
    eventDate,
    location,
    status,
    brideName,
    groomName,
  });

  return res.status(201).json({
    success: true,
    message: "Event created successfully",
    data: event,
  });
});

export const updateEvent = asyncHandler(async (req, res) => {
  // const { eventId } = req.params;
  const {
    eventId,
    userId,
    eventSubCategoryId,
    eventDate,
    eventEndDate,
    location,
    status,
    brideName,
    groomName,
  } = req.body;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "eventId is required",
    });
  }

  const event = await eventModel.findById(eventId);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  if (userId) {
    event.userId = userId;
  }

  if (eventSubCategoryId) {
    event.eventSubCategoryId = eventSubCategoryId;
  }

  if (eventDate) {
    event.eventDate = eventDate;
  }

  if (eventEndDate) {
    event.eventEndDate = eventEndDate;
  }

  if (location) {
    event.location = location;
  }

  if (status) {
    event.status = status;
  }

  if (brideName !== undefined) {
    event.brideName = brideName;
  }

  if (groomName !== undefined) {
    event.groomName = groomName;
  }

  await event.save();

  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    data: event,
  });
});

export const getEventById = asyncHandler(async (req, res) => {
  const { eventId } = req.query;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "eventId is required",
    });
  }

  const event = await eventModel
    .findById(eventId)
    .populate("userId", "name email phoneNumber")
    // .populate("eventSubCategoryId", "name",);

    // .populate({
    //   path: "eventSubCategoryId",
    //   select: "name description categoryId",
    //   populate: {
    //     path: "categoryId",
    //     select: "name"
    //   }
    // });

    .populate({
      path: "eventSubCategoryId",
      select: "name categoryId",
      populate: {
        path: "categoryId",
        select: "name",
      },
    })

    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Feched event successfully",
    data: event,
  });
});

export const getEventByFilter = asyncHandler(async (req, res) => {
  const {
    search,
    userId,
    categoryId,
    eventSubCategoryId,
    status,
    page = 1,
    limit = 10,
  } = req.query;

  let filter = {};
  if (userId) {
    filter.userId = userId;
  }

  if (categoryId) {
    const subCats = await subcategoryModel.find({ categoryId }).select("_id");
    filter.eventSubCategoryId = { $in: subCats.map((s) => s._id) };
  }

  if (eventSubCategoryId) {
    filter.eventSubCategoryId = eventSubCategoryId;
  }

  if (status) {
    filter.status = status;
  }

  if (search) {
    filter.$or = [
      {
        brideName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        groomName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        location: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const events = await eventModel
    .find(filter)
    .populate("userId", "name email phoneNumber")
    .populate({
      path: "eventSubCategoryId",
      select: "name categoryId",
      populate: {
        path: "categoryId",
        select: "name",
      },
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const totalRecords = await eventModel.countDocuments(filter);

  res.status(200).json({
    success: true,
    message: "All event fetched successfully",
    data: events,
    totalRecords,
    currentPage: Number(page),
    totalPages: Math.ceil(totalRecords / Number(limit)),
  });
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.query;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "eventId is required",
    });
  }

  const event = await eventModel.findByIdAndDelete(eventId);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
    data: event,
  });
});
