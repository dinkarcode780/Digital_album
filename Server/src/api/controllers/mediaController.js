import asyncHandler from "../../utils/asyncHandler.js";
import mediaModel from "../../models/mediaModel.js";
import eventModel from "../../models/eventModel.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../middleware/multerS3.js";

// export const createMedia = asyncHandler(async (req, res) => {
//   const { eventId } = req.body;

//   if (!eventId) {
//     return res.status(400).json({
//       success: false,
//       message: "eventId is required",
//     });
//   }

//   if (!req.files?.mediaFiles?.length) {
//     return res.status(400).json({
//       success: false,
//       message: "Please upload at least one media file",
//     });
//   }

//   const thumbnailFile = req.files.thumbnail?.[0];
//   const thumbnailUpload = thumbnailFile
//     ? await uploadToCloudinary(thumbnailFile.path, "eventThumbnail")
//     : null;

//   const mediaDocs = [];

//   for (const file of req.files.mediaFiles) {
//     const uploadResult = await uploadToCloudinary(file.path, "eventMedia");
//     if (!uploadResult) continue;

//     mediaDocs.push({
//       eventId,
//       thumbnail: thumbnailUpload?.secure_url || "",
//       videosOrImageUrl: uploadResult.secure_url,
//       videosOrImageUrlType: file.mimetype.startsWith("video/")
//         ? "Video"
//         : "Image",
//       publicId: uploadResult.public_id,
//     });
//   }

//   const savedMedia = await mediaModel.insertMany(mediaDocs);

//   res.status(201).json({
//     success: true,
//     message: "Media uploaded successfully",
//     data: savedMedia,
//   });
// });

export const createMedia = asyncHandler(async (req, res) => {
  const { eventId } = req.body;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "eventId is required",
    });
  }

  if (!req.files?.mediaFiles?.length) {
    return res.status(400).json({
      success: false,
      message: "Please upload at least one media file",
    });
  }

  // 1. Upload thumbnail (if present) in parallel with media files
  const thumbnailFile = req.files.thumbnail?.[0];
  const thumbnailPromise = thumbnailFile
    ? uploadToCloudinary(thumbnailFile, "eventThumbnail")
    : Promise.resolve(null);

  // 2. Upload all media files concurrently
  const mediaUploadPromises = req.files.mediaFiles.map((file) =>
    uploadToCloudinary(file, "eventMedia"),
  );

  // 3. Wait for all uploads (including thumbnail) to finish
  const [thumbnailResult, ...mediaResults] = await Promise.allSettled([
    thumbnailPromise,
    ...mediaUploadPromises,
  ]);

  // 4. Extract successful uploads
  const successfulThumbnail =
    thumbnailResult.status === "fulfilled" ? thumbnailResult.value : null;

  const successfulMedia = mediaResults
    .filter((r) => r.status === "fulfilled" && r.value !== null)
    .map((r) => r.value);

  if (successfulMedia.length === 0) {
    return res.status(500).json({
      success: false,
      message: "All media uploads failed",
    });
  }

  // 5. Prepare documents for DB insertion
  const mediaDocs = successfulMedia.map((upload, index) => {
    const originalFile = req.files.mediaFiles[index];
    return {
      eventId,
      thumbnail: successfulThumbnail?.secure_url || "",
      videosOrImageUrl: upload.secure_url,
      videosOrImageUrlType: originalFile.mimetype.startsWith("video/")
        ? "Video"
        : "Image",
      thumbnailPublicId: successfulThumbnail?.public_id || "",
      // If you still want to store publicId per media, uncomment:
      publicId: upload.public_id,
    };
  });

  // 6. Bulk insert into DB
  const savedMedia = await mediaModel.insertMany(mediaDocs);

  res.status(201).json({
    success: true,
    message: "Media uploaded successfully",
    data: savedMedia,
  });
});

export const updateMedia = asyncHandler(async (req, res) => {
  const { mediaId, isDownloadable, isActive } = req.body;

  if (!mediaId) {
    return res.status(400).json({
      success: false,
      message: "mediaId is required",
    });
  }

  const media = await mediaModel.findById(mediaId);

  if (!media) {
    return res.status(404).json({
      success: false,
      message: "Media not found",
    });
  }

  // Update Thumbnail
  if (req.files?.thumbnail?.length) {
    if (media.thumbnailPublicId) {
      await deleteFromCloudinary(media.thumbnailPublicId, "image");
    }

    const thumbnailUpload = await uploadToCloudinary(
      req.files.thumbnail[0].path,
      "eventThumbnail",
    );

    if (thumbnailUpload) {
      media.thumbnail = thumbnailUpload.secure_url;
      media.thumbnailPublicId = thumbnailUpload.public_id;
    }
  }

  // Update Media File
  if (req.files?.mediaFile?.length) {
    await deleteFromCloudinary(
      media.publicId,
      media.videosOrImageUrlType === "Video" ? "video" : "image",
    );

    const uploadResult = await uploadToCloudinary(
      req.files.mediaFile[0].path,
      "eventMedia",
    );

    if (uploadResult) {
      media.videosOrImageUrl = uploadResult.secure_url;
      media.publicId = uploadResult.public_id;
      media.videosOrImageUrlType = req.files.mediaFile[0].mimetype.startsWith(
        "video/",
      )
        ? "Video"
        : "Image";
    }
  }

  if (isDownloadable !== undefined) {
    media.isDownloadable = isDownloadable === "true" || isDownloadable === true;
  }

  if (isActive !== undefined) {
    media.isActive = isActive === "true" || isActive === true;
  }

  await media.save();

  res.status(200).json({
    success: true,
    message: "Media updated successfully",
    data: media,
  });
});

export const iSdownload = asyncHandler(async (req, res) => {
  const { mediaId } = req.body;

  if (!mediaId) {
    return res.status(400).json({
      success: false,
      message: "mediaId is required",
    });
  }

  const media = await mediaModel.findById(mediaId);

  if (!media) {
    return res.status(404).json({
      success: false,
      message: "Media not found",
    });
  }

  media.isDownloadable = !media.isDownloadable;

  await media.save();

  res.status(200).json({
    success: true,
    message: `Media ${
      media.isDownloadable ? "download enabled" : "download disabled"
    } successfully`,
    data: media,
  });
});

export const toggleMediaActive = asyncHandler(async (req, res) => {
  const { mediaId } = req.body;

  if (!mediaId) {
    return res.status(400).json({
      success: false,
      message: "mediaId is required",
    });
  }

  const media = await mediaModel.findById(mediaId);

  if (!media) {
    return res.status(404).json({
      success: false,
      message: "Media not found",
    });
  }

  media.isActive = !media.isActive;
  await media.save();

  res.status(200).json({
    success: true,
    message: `Media ${media.isActive ? "activated" : "deactivated"} successfully`,
    data: media,
  });
});

export const getMediaById = asyncHandler(async (req, res) => {
  const { mediaId } = req.query;

  if (!mediaId) {
    return res.status(400).json({
      success: false,
      message: "mediaId is required",
    });
  }

  const media = await mediaModel.findById(mediaId).populate({
    path: "eventId",
    populate: [
      {
        path: "userId",
        select: "name email phoneNumber",
      },
      {
        path: "eventSubCategoryId",
        select: "name description categoryId",
        populate: {
          path: "categoryId",
          select: "name description",
        },
      },
    ],
  });

  if (!media) {
    return res.status(404).json({
      success: false,
      message: "Media not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Media fetched successfully",
    data: media,
  });
});

export const getMediaByFilter = asyncHandler(async (req, res) => {
  const {
    search,
    eventId,
    eventSubCategoryId,
    categoryId,
    mediaType,
    isDownloadable,
    isActive,
    page = 1,
    limit = 10,
  } = req.query;

  const filter = {};

  // Event Filter
  if (eventId) {
    filter.eventId = eventId;
  }

  if (eventSubCategoryId) {
    const events = await eventModel.find({ eventSubCategoryId }).select("_id");

    filter.eventId = {
      $in: events.map((item) => item._id),
    };
  }

  if (categoryId) {
    const events = await eventModel
      .find()
      .populate({
        path: "eventSubCategoryId",
        match: { categoryId },
        select: "_id",
      })
      .select("_id eventSubCategoryId");

    filter.eventId = {
      $in: events
        .filter((item) => item.eventSubCategoryId)
        .map((item) => item._id),
    };
  }

  // Media Type Filter
  if (mediaType) {
    filter.videosOrImageUrlType = mediaType;
  }

  // Download Permission Filter
  if (isDownloadable !== undefined) {
    filter.isDownloadable = isDownloadable === "true";
  }

  // Active Status Filter
  if (isActive !== undefined) {
    filter.isActive = isActive === "true";
  }

  // Search
  if (search) {
    filter.$or = [
      {
        videosOrImageUrlType: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const media = await mediaModel
    .find(filter)
    .populate({
      path: "eventId",
      select: "brideName groomName location status eventDate",
      populate: [
        {
          path: "userId",
          select: "name email phoneNumber",
        },
        {
          path: "eventSubCategoryId",
          select: "name description categoryId",
          populate: {
            path: "categoryId",
            select: "name",
          },
        },
      ],
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const totalRecords = await mediaModel.countDocuments(filter);

  res.status(200).json({
    success: true,
    message: "Media fetched successfully",
    data: media,
    totalRecords,
    currentPage: Number(page),
    totalPages: Math.ceil(totalRecords / Number(limit)),
  });
});

export const deleteMedia = asyncHandler(async (req, res) => {
  const { mediaId } = req.body;

  if (!mediaId) {
    return res.status(400).json({
      success: false,
      message: "mediaId is required",
    });
  }

  const media = await mediaModel.findById(mediaId);

  if (!media) {
    return res.status(404).json({
      success: false,
      message: "Media not found",
    });
  }

  // Delete Media File from Cloudinary
  if (media.publicId) {
    await deleteFromCloudinary(
      media.publicId,
      media.videosOrImageUrlType === "Video" ? "video" : "image",
    );
  }

  // Check if thumbnail is used by another media
  if (media.thumbnailPublicId) {
    const thumbnailUsed = await mediaModel.countDocuments({
      thumbnailPublicId: media.thumbnailPublicId,
      _id: { $ne: media._id },
    });

    if (thumbnailUsed === 0) {
      await deleteFromCloudinary(media.thumbnailPublicId, "image");
    }
  }

  await media.deleteOne();

  res.status(200).json({
    success: true,
    message: "Media deleted successfully",
  });
});

// export const createMedia = asyncHandler(async (req, res) => {
//   const { eventId } = req.body;

//   if (!eventId) {
//     return res.status(400).json({
//       success: false,
//       message: "eventId is required",
//     });
//   }

//   if (!req.files?.mediaFiles?.length) {
//     return res.status(400).json({
//       success: false,
//       message: "Please upload at least one media file",
//     });
//   }

//   const thumbnailFile = req.files.thumbnail?.[0];
//   const thumbnailUpload = thumbnailFile
//     ? await uploadToCloudinary(thumbnailFile.path, "eventThumbnail")
//     : null;

//   const mediaDocs = [];

//   for (const file of req.files.mediaFiles) {
//     const uploadResult = await uploadToCloudinary(file.path, "eventMedia");
//     if (!uploadResult) continue;

//     mediaDocs.push({
//       eventId,
//       thumbnail: thumbnailUpload?.secure_url || "",
//       videosOrImageUrl: uploadResult.secure_url,
//       videosOrImageUrlType: file.mimetype.startsWith("video/")
//         ? "Video"
//         : "Image",
//       publicId: uploadResult.public_id,
//     });
//   }

//   const savedMedia = await mediaModel.insertMany(mediaDocs);

//   res.status(201).json({
//     success: true,
//     message: "Media uploaded successfully",
//     data: savedMedia,
//   });
// });

// export const createMedia = asyncHandler(async (req, res) => {
//   const { eventId } = req.body;

//   // Validation
//   if (!eventId) {
//     return res.status(400).json({
//       success: false,
//       message: "eventId is required",
//     });
//   }

//   if (!req.files?.mediaFiles?.length) {
//     return res.status(400).json({
//       success: false,
//       message: "Please upload at least one media file",
//     });
//   }

//   try {
//     // Upload thumbnail (if provided)
//     let thumbnailUrl = "";
//     const thumbnailFile = req.files.thumbnail?.[0];

//     if (thumbnailFile) {
//       const thumbnailUpload = await uploadToCloudinary(
//         thumbnailFile.path,
//         "eventThumbnail"
//       );
//       if (thumbnailUpload?.secure_url) {
//         thumbnailUrl = thumbnailUpload.secure_url;
//       }
//     }

//     // Parallel uploads for better performance
//     const uploadPromises = req.files.mediaFiles.map(async (file) => {
//       const uploadResult = await uploadToCloudinary(file.path, "eventMedia");

//       if (!uploadResult?.secure_url) {
//         console.warn(`Failed to upload file: ${file.originalname}`);
//         return null; // Skip failed uploads
//       }

//       return {
//         eventId,
//         thumbnail: thumbnailUrl,
//         videosOrImageUrl: uploadResult.secure_url,
//         videosOrImageUrlType: file.mimetype.startsWith("video/") ? "Video" : "Image",
//         publicId: uploadResult.public_id,
//       };
//     });

//     const mediaDocs = (await Promise.all(uploadPromises)).filter(Boolean);

//     if (mediaDocs.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Failed to upload any media files",
//       });
//     }

//     // Bulk insert
//     const savedMedia = await mediaModel.insertMany(mediaDocs);

//     res.status(201).json({
//       success: true,
//       message: `Successfully uploaded ${savedMedia.length} media file(s)`,
//       data: savedMedia,
//     });
//   } catch (error) {
//     console.error("Media upload error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to upload media",
//       error: process.env.NODE_ENV === "development" ? error.message : undefined,
//     });
//   }
// });
