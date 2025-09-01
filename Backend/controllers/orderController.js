import { status } from "../constants/httpStatus.js"
import { messages } from "../constants/messages.js"
import { errorResponse, successResponse } from "../constants/response.js"
import Order from "../models/Order.js"

// @route   POST /api/order/createorder
// @desc create new order
// @access customer
export const createOrder = async (req, res) => {

  try {
    const { user_Id, orderdate, stage, totalamount } = req.body
    if (!user_Id || !orderdate || !stage || !totalamount) {
      return errorResponse(res, status.BAD_REQUEST, messages.FIELD_REQUIRED)

    }




    const order = await Order.create({ user_Id, orderdate, stage, totalamount })
    return successResponse(res, status.CREATED, messages.ORDER_CREATED, order)

  } catch (error) {
    console.log(error)
    errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)

  }
}

// @route   GET /api/order/getallorders
// @desc    get all orders
// @access  admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user_Id")
    return successResponse(res, status.SUCCESS, messages.ORDER_FETCH_SUCCESS, orders)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}

// @route   GET /api/order/getorder/:id
// @desc    get single order by id
// @access  customer (own order) / admin (any order)
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params
    const order = await Order.findById(id).populate("user_Id")

    if (!order) {
      return errorResponse(res, status.NOT_FOUND, messages.ORDER_NOT_FOUND)
    }

    return successResponse(res, status.SUCCESS, messages.ORDER_FETCH_SUCCESS, order)
  } catch (error) {
    console.log(error);
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}

// @route   PUT /api/order/updateorder/:id
// @desc    update order status
// @access  admin
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderdate, stage, totalamount } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { orderdate, stage, totalamount },
      { new: true }
    );

    if (!order) {
      return errorResponse(res, status.NOT_FOUND, messages.ORDER_NOT_FOUND)
    }

    return successResponse(res, status.SUCCESS, messages.ORDER_UPDATE_SUCCESS, order)
  } catch (error) {
    console.log(error);
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}


// @route   DELETE /api/order/deleteorder/:id
// @desc    delete order
// @access  admin

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id)

    if (!order) {
      return errorResponse(res, status.NOT_FOUND, messages.ORDER_NOT_FOUND)
    }

    return successResponse(res, status.SUCCESS, messages.ORDER_DELETE_SUCCESS, order)
  } catch (error) {
    console.log(error);
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}
