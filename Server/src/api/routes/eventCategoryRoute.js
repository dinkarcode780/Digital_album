import express from "express";
import {
  createEventCategory,
  deleteEventCategory,
  getEventCategoryByFilter,
  getEventCategoryById,
  updateEventCategory,
} from "../controllers/eventCategoryController.js";

const router = express.Router();

router.post("/admin/createEventCategory", createEventCategory);
router.put("/admin/updateEventCategory", updateEventCategory);
router.get("/admin/getEventCategoryById", getEventCategoryById);

router.get("/admin/geteventCategoryByFilter", getEventCategoryByFilter);

router.delete("/admin/deleteEventCategory", deleteEventCategory);
export default router;
