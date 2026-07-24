import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import path from "path";
import fs from "fs";
import cloudinary from "cloudinary";
import { promises as fsPromises } from "fs";


cloudinary.v2.config({
//  cloud_name:"dew9hrubp",
//     api_key:"137392672297596",
//     api_secret:"FeatRnxWfTnUC9E2h3VlIQRKM3w"
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "video/mp4",
  "video/mkv",
  "video/webm",
  "video/avi",
];


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});


export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    allowedTypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only images or video is allowed"), false);
  },
  // limits: { fileSize: 900 * 1024 * 1024 },
});


export const uploadToCloudinary = async (localFilePath, folder = "uploads") => {
  if (!localFilePath) return null;
  try {
    const result = await cloudinary.v2.uploader.upload(localFilePath, {
      folder,
      resource_type: "auto",
    });
    // Async cleanup – non-blocking
    await fsPromises.unlink(localFilePath).catch(() => {});
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    // Cleanup even on error
    await fsPromises.unlink(localFilePath).catch(() => {});
    return null;
  }
};




// export const uploadToCloudinary = async (localFilePath, folder = "uploads") => {
//   if (!localFilePath) return null;

//   try {
//     const result = await cloudinary.v2.uploader.upload(localFilePath, {
//       folder,
//       resource_type: "auto", 
//     });

//     fs.unlinkSync(localFilePath); 

 
//     return {
//       secure_url: result.secure_url,
//       public_id: result.public_id
//     };
//   } catch (error) {
//     console.error("Cloudinary Upload Error:", error);
//     return null;
//   }
// };


// export const deleteFromCloudinary = async (publicId) => {
//   if (!publicId) return null; // safeguard
//   try {
//     const result = await cloudinary.v2.uploader.destroy(publicId, {
//       resource_type: "image"||"video", // ensure it's correct
//     });
//     console.log(`Deleted from Cloudinary: ${publicId}, Result:`, result);
//     return result;
//   } catch (error) {
//     console.error(`Error deleting ${publicId} from Cloudinary:`, error.message);
//     return null; // don't throw to stop the whole process
//   }
// };

export const deleteFromCloudinary = async (
  publicId,
  resourceType = "image"
) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(
      publicId,
      {
        resource_type: resourceType,
      }
    );

    if (result.result === "ok") {
      console.log(
        `✅ Cloudinary file deleted successfully: ${publicId}`
      );
    } else {
      console.log(
        `⚠️ Cloudinary delete response:`,
        result
      );
    }

    return result;

  } catch (error) {
    console.error(
      `❌ Cloudinary delete failed for ${publicId}:`,
      error.message
    );

    throw error;
  }
};



