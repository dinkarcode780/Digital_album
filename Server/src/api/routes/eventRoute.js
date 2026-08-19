import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventByFilter,
  getEventById,
  updateEvent,
} from "../controllers/eventController.js";
import { isAdmin, isUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/createEvent",isAdmin, createEvent);
router.put("/admin/updateEvent", isAdmin,updateEvent);
router.delete("/admin/deleteEvent", isAdmin,deleteEvent);
router.get("/admin/getEventById", isAdmin,isUser,getEventById);
router.get("/admin/getEventByFilter",isAdmin,isUser, getEventByFilter);

export default router;
