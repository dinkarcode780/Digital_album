import express from "express";
import { adminLogin, adminLogout, adminUpdateProfile, getAdminById, userIsActive } from "../controllers/adminController.js";
import { upload } from "../middleware/multerS3.js";
import { isAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/admin/adminLogin",adminLogin);

router.put("/admin/adminUpdateProfile",isAdmin, upload.single("profileImage"), adminUpdateProfile);

router.get("/admin/getAdminById",isAdmin,getAdminById);

router.put("/admin/userIsActive",isAdmin,userIsActive);

router.get("/admin/adminLogout",adminLogout);



export default router;