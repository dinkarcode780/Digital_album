import express from "express";
import { createSubCategory, deleteSubCategory, getSubCategoryByFilter, getSubCategoryById, updateSubCategory } from "../controllers/subCategoryController.js";

const router = express.Router();

router.post("/admin/createSubcategory",createSubCategory);

router.put("/admin/updateSubCategory",updateSubCategory);

router.get("/admin/getSubCategoryById",getSubCategoryById);

router.get("/admin/getSubCategoryByFilter",getSubCategoryByFilter);

router.delete("/admin/deleteSubCategory",deleteSubCategory);

export default router;