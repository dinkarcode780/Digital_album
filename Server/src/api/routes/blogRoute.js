import {
  createBlog,
  deleteBlog,
  getBlogByFilter,
  getBlogById,
  updateBlog,
} from "../controllers/blogController.js";
import express from "express";
import { upload } from "../middleware/multerS3.js";
import { isAdmin, isUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/createBlog", isAdmin, upload.single("image"), createBlog);

router.put("/admin/updateBlog", isAdmin, upload.single("image"), updateBlog);
router.delete("/admin/deleteBlog", isAdmin, deleteBlog);

router.get("/users/getBlogById", isUser, getBlogById);

router.get("/users/getBlogByFilter", isUser, getBlogByFilter);

export default router;