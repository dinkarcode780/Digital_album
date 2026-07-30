import express from "express"
import { getAllInviteByFilter, inviteUser, verifyInvite } from "../controllers/inviteController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/inviteUser",isAdmin,inviteUser);

router.get("/users/verifyInvite",verifyInvite);

router.get("/admin/getAllInviteByFilter",getAllInviteByFilter)

export default router;