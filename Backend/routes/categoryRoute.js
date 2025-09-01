import express from "express"
const router = express.Router()
import { CreateCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categoryController.js"

// @route   POST /api/category/createcategory
// @desc create new category
// @access admin
router.post("/createcategory", CreateCategory)

// @route   POST /api/category/getcategories
// @desc    Get all categories
// @access  Public
router.get("/getcategories", getCategories)

// @route   GET /api/category/getcategory/:id
// @desc    Get single category by ID
// @access  Public
router.get("/getcategory/:id", getCategoryById)


// @route   PUT /api/category/updatecategory/:id
// @desc    Update category by ID
// @access  Admin
router.put("/updatecategory/:id", updateCategory)


// @route   DELETE /api/category/deletecategory/:id
// @desc    Delete category by ID
// @access  Admin
router.delete("/deletecategory/:id", deleteCategory)





export default router