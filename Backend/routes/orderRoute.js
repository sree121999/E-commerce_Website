import express from "express"
const router = express.Router()
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "../controllers/orderController.js"



// @route   POST /api/order/createorder
// @desc create new order
// @access customer
router.post("/createorder", createOrder)


// @route   GET /api/order/getallorders
// @desc    get all orders
// @access  admin
router.get("/getallorders", getAllOrders)

// @route   GET /api/order/getorder/:id
// @desc    get single order by id
// @access  customer (own order) / admin (any order)
router.get("/getorder/:id", getOrderById)



// @route   PUT /api/order/updateorder/:id
// @desc    update order status
// @access  admin
router.put("/updateorder/:id", updateOrder)

// @route   DELETE /api/order/deleteorder/:id
// @desc    delete order
// @access  admin
router.delete("/deleteorder/:id", deleteOrder)












export default router