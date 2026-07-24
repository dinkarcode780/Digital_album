import express from "express";
import {
  createEvent,
  deleteEvent,
  getEventByFilter,
  getEventById,
  updateEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/admin/createEvent", createEvent);
router.put("/admin/updateEvent", updateEvent);
router.delete("/admin/deleteEvent", deleteEvent);
router.get("/admin/getEventById", getEventById);
router.get("/admin/getEventByFilter", getEventByFilter);

export default router;
