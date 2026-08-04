import express from "express";
import {
  createEventCategory,
  deleteEventCategory,
  getEventCategoryByFilter,
  getEventCategoryById,
  updateEventCategory,
} from "../controllers/eventCategoryController.js";
import { isAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerS3.js";

const router = express.Router();

router.post("/admin/createEventCategory",isAdmin,upload.single("categoryImage"), createEventCategory);
router.put("/admin/updateEventCategory", isAdmin,upload.single("categoryImage"),updateEventCategory);
router.get("/admin/getEventCategoryById", isAdmin,getEventCategoryById);

router.get("/admin/geteventCategoryByFilter", isAdmin,getEventCategoryByFilter);

router.delete("/admin/deleteEventCategory", isAdmin,deleteEventCategory);
export default router;
