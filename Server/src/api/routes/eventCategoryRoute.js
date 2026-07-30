import express from "express";
import {
  createEventCategory,
  deleteEventCategory,
  getEventCategoryByFilter,
  getEventCategoryById,
  updateEventCategory,
} from "../controllers/eventCategoryController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/createEventCategory",isAdmin, createEventCategory);
router.put("/admin/updateEventCategory", isAdmin,updateEventCategory);
router.get("/admin/getEventCategoryById", isAdmin,getEventCategoryById);

router.get("/admin/geteventCategoryByFilter", isAdmin,getEventCategoryByFilter);

router.delete("/admin/deleteEventCategory", isAdmin,deleteEventCategory);
export default router;
