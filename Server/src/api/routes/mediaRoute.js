import express from "express";
import { createMedia, deleteMedia, getMediaByFilter, getMediaById, iSdownload, toggleMediaActive, updateMedia } from "../controllers/mediaController.js";
import { upload } from "../middleware/multerS3.js";
import { isAdmin, isUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/admin/createMedia",
  upload.fields([
    { name: "mediaFiles", maxCount: 20 },
    { name: "thumbnail", maxCount: 1 },
  ]),isAdmin,
  createMedia,
);

router.put(
  "/admin/updateMedia",
  upload.fields([
    { name: "mediaFile", maxCount: 5 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  isAdmin,
  updateMedia
);

router.put("/admin/iSdownload",isAdmin,isUser,iSdownload);
router.put("/admin/toggleMediaActive", isAdmin, toggleMediaActive);

router.get("/admin/getMediaById",isAdmin,isUser,getMediaById);

router.get("/admin/getMediaByFilter",isAdmin,isUser,getMediaByFilter);

router.delete("/admin/deleteMedia",isAdmin,deleteMedia);

export default router;
