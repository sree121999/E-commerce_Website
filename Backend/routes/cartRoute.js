import express from "express"
const router = express.Router()
import { createCart, deleteCart, getCartById, getCarts, updateCart } from "../controllers/cartController.js"




// @route   POST /api/cart/createcart
// @desc create new cart
// @access customer
router.post("/createcart", createCart)



//  @route   GET /api/cart/getcarts
// @desc    Get all carts
// @access  Admin
router.get("/getcarts", getCarts)


// @route   GET /api/cart/getcart/:id
// @desc    Get single cart by ID
// @access  admin
router.get("/getcart/:id", getCartById)


// @route   PUT /api/cart/updatecart/:id
// @desc    Update cart by ID
// @access  customer
router.put("/updatecart/:id", updateCart)


// / @route   DELETE /api/cart/deletecart/:id
// @desc    Delete cart by ID
// @access  Admin,user
router.delete("/deletecart/:id", deleteCart)











export default router