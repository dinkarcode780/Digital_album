import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventByFilter,
  getEventById,
  updateEvent,
} from "../controllers/eventController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/createEvent",isAdmin, createEvent);
router.put("/admin/updateEvent", isAdmin,updateEvent);
router.delete("/admin/deleteEvent", isAdmin,deleteEvent);
router.get("/admin/getEventById", isAdmin,getEventById);
router.get("/admin/getEventByFilter",isAdmin, getEventByFilter);

export default router;
