import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategoryByFilter,
  getSubCategoryById,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import { isAdmin, isUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/createSubcategory", isAdmin, createSubCategory);

router.put("/admin/updateSubCategory", isAdmin, updateSubCategory);

router.get("/admin/getSubCategoryById", isAdmin,isUser, getSubCategoryById);

router.get("/admin/getSubCategoryByFilter", isAdmin,isUser, getSubCategoryByFilter);

router.delete("/admin/deleteSubCategory", isAdmin, deleteSubCategory);

export default router;
