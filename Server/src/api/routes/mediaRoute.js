import express from "express";
import { createMedia, deleteMedia, getMediaByFilter, getMediaById, iSdownload, updateMedia } from "../controllers/mediaController.js";
import { upload } from "../middleware/multerS3.js";

const router = express.Router();

router.post(
  "/admin/createMedia",
  upload.fields([
    { name: "mediaFiles", maxCount: 20 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  createMedia,
);

router.put(
  "/admin/updateMedia",
  upload.fields([
    { name: "mediaFile", maxCount: 5 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  updateMedia
);

router.put("/admin/iSdownload",iSdownload);

router.get("/admin/getMediaById",getMediaById);

router.get("/admin/getMediaByFilter",getMediaByFilter);

router.delete("/admin/deleteMedia",deleteMedia);

export default router;
