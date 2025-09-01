import { status } from "../constants/httpStatus.js"
import { messages } from "../constants/messages.js"
import { errorResponse, successResponse } from "../constants/response.js"
import Orderitem from "../models/Order_item.js"




// @route   POST /api/orderitem/createorderitem
// @desc create new orderitem
// @access admin,customer
export const createOrderItem = async (req, res) => {

  try {
    const { order_Id, product_Id, quantity, price } = req.body
    if (!order_Id || !product_Id || !quantity || !price) {
      return errorResponse(res, status.BAD_REQUEST, messages.FIELD_REQUIRED)

    }




    const orderitem = await Orderitem.create({ order_Id, product_Id, quantity, price })
    return successResponse(res, status.CREATED, messages.ORDER_ITEM_CREATED, orderitem)

  } catch (error) {
    console.log(error)
    errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)

  }
}




// @route   GET /api/orderitem/orderitems
// @desc    Get all order items (admin can see all, customer only their own)
// @access  admin, customer

export const getOrderItems = async (req, res) => {
  try {
    const items = await Orderitem.find().populate("order_Id product_Id")
    return successResponse(res, status.SUCCESS, messages.ORDER_ITEM_FETCH_SUCCESS, items)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}


// @route   GET /api/orderitem/orderitems/:id
// @desc    Get single order item by ID
// @access  admin, customer (but customer only own)
export const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params
    const item = await Orderitem.findById(id).populate("order_Id product_Id")

    if (!item) {
      return errorResponse(res, status.NOT_FOUND, messages.ORDER_ITEM_NOT_FOUND)
    }

    return successResponse(res, status.SUCCESS, messages.ORDER_ITEM_FETCH_SUCCESS, item)
  } catch (error) {
    console.log(error);
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}

// @route   PUT /api/orderitem/updateorderitem/:id
// @desc    Update order item
// @access  admin, customer (but customer only own + before confirmation)

export const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params
    const { quantity, price } = req.body;

    const item = await Orderitem.findByIdAndUpdate(
      id,
      { quantity, price },
      { new: true }
    )

    if (!item) {
      return errorResponse(res, status.NOT_FOUND, messages.ORDER_ITEM_NOT_FOUND)
    }

    return successResponse(res, status.SUCCESS, messages.ORDER_ITEM_UPDATED, item)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}

// @route   DELETE /api//orderitem/deleteorderitem/:id
// @desc    Delete order item
// @access  admin, customer (but customer only own + before confirmation)

export const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params
    const item = await Orderitem.findByIdAndDelete(id)

    if (!item) {
      return errorResponse(res, status.NOT_FOUND, messages.ORDER_ITEM_NOT_FOUND)
    }

    return successResponse(res, status.SUCCESS, messages.ORDER_ITEM_DELETED, item)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}