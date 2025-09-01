import express from "express"
import { createOrderItem, deleteOrderItem, getOrderItemById, getOrderItems, updateOrderItem } from "../controllers/orderitemController.js"
const router = express.Router()



// @route   POST /api/orderitem/createorderitem
// @desc create new orderitem
// @access admin,customer
router.post("/createorderitem", createOrderItem)


// @route   GET /api/orderitem/orderitems
// @desc    Get all order items (admin can see all, customer only their own)
// @access  admin, customer
router.get("/orderitems", getOrderItems)


// @route   GET /api/orderitem/orderitems/:id
// @desc    Get single order item by ID
// @access  admin, customer (but customer only own)
router.get("/orderitems/:id", getOrderItemById)

// @route   PUT /api/orderitem/updateorderitem/:id
// @desc    Update order item
// @access  admin, customer (but customer only own + before confirmation)
router.put("/updateorderitem/:id", updateOrderItem)


// @route   DELETE /api//orderitem/deleteorderitem/:id
// @desc    Delete order item
// @access  admin, customer (but customer only own + before confirmation)
router.delete("/deleteorderitem/:id", deleteOrderItem)









export default router