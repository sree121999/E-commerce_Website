import express from "express"
const router = express.Router()
import { createCartItem, deleteCartItem, getCartItemById, getCartItems, updateCartItem } from "../controllers/cartItemController.js"


// @route   POST /api/cartitem/createcartitem
// @desc create new cartitem
// @access customer
router.post("/createcartitem", createCartItem)


// @route   GET /api/cartitem/getcartitems
// @desc    Get all cartitems
// @access  Admin,customer
router.get("/getcartitems", getCartItems)

// @route   GET /api/cartitem/getcartitem/:id
// @desc    Get single cartitem by ID
// @access  Admin
router.get("/getcartitem/:id", getCartItemById)

// @route   PUT /api/cartitem/updatecartitem/:id
// @desc    Update cartitem by ID
// @access  customer
router.put("/updatecartitem/:id", updateCartItem)

// @route   DELETE /api/cartitem/deletecartitem/:id
// @desc    Delete cartitem by ID
// @access  Admin,customer
router.delete("/deletecartitem/:id", deleteCartItem)




















export default router