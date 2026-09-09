import express from "express";
import { createMedia, deleteMedia, getMediaByFilter, getMediaById, iSdownload, toggleMediaActive, updateMedia } from "../controllers/mediaController.js";
import { upload } from "../middleware/multerS3.js";
import { isAdmin, isUser } from "../middleware/authMiddleware.js";
import { isSubscribed } from "../middleware/subscriptionMiddleware.js";
import { checkStorageQuota } from "../middleware/storageQuotaMiddleware.js";

const router = express.Router();

router.post(
  "/admin/createMedia",
  upload.fields([
    { name: "mediaFiles", maxCount: 20 },
    { name: "thumbnail", maxCount: 1 },
  ]),isAdmin,
  checkStorageQuota,
  createMedia,
);

router.put(
  "/admin/updateMedia",
  upload.fields([
    { name: "mediaFile", maxCount: 5 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  isAdmin,
  isSubscribed,
  checkStorageQuota,
  updateMedia
);

router.put("/admin/iSdownload", isUser, iSdownload);
router.put("/admin/toggleMediaActive", isAdmin, toggleMediaActive);

router.get("/admin/getMediaById", isUser, isSubscribed, getMediaById);

router.get("/admin/getMediaByFilter", isUser, isSubscribed, getMediaByFilter);

router.delete("/admin/deleteMedia",isAdmin,deleteMedia);

export default router;
