import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getSubCategoryByFilter,
  getSubCategoryById,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/createSubcategory", isAdmin, createSubCategory);

router.put("/admin/updateSubCategory", isAdmin, updateSubCategory);

router.get("/admin/getSubCategoryById", isAdmin, getSubCategoryById);

router.get("/admin/getSubCategoryByFilter", isAdmin, getSubCategoryByFilter);

router.delete("/admin/deleteSubCategory", isAdmin, deleteSubCategory);

export default router;
