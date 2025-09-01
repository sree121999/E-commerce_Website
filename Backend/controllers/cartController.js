import { status } from "../constants/httpStatus.js"
import { messages } from "../constants/messages.js"
import { errorResponse, successResponse } from "../constants/response.js"
import Cart from "../models/Cart.js"


// @route   POST /api/cart/createcart
// @desc create new cart
// @access customer
export const createCart = async (req, res) => {

  try {
    const { user_Id } = req.body
    if (!user_Id) {
      return errorResponse(res, status.BAD_REQUEST, messages.FIELD_REQUIRED)

    }


    const existing = await Cart.findOne({ user_Id })
    if (existing) {
      return errorResponse(res, status.BAD_REQUEST, messages.CART_ALREADY_EXISTS)

    }

    const cart = await Cart.create({ user_Id })
    return successResponse(res, status.CREATED, messages.CART_CREATE_SUCCESS, cart)

  } catch (error) {
    console.log(error)
    errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)

  }
}




//  @route   GET /api/cart/getcarts
// @desc    Get all carts
// @access  Admin
export const getCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("user_Id")
    return successResponse(res, status.SUCCESS, messages.CART_FETCH_SUCCESS, carts)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}

// @route   GET /api/cart/getcart/:id
// @desc    Get single cart by ID
// @access  Admin
export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate("user_Id")
    if (!cart) {
      return errorResponse(res, status.NOT_FOUND, messages.CART_NOT_FOUND)
    }
    return successResponse(res, status.SUCCESS, messages.CART_FETCH_SUCCESS, cart)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}


// @route   PUT /api/cart/updatecart/:id
// @desc    Update cart by ID
// @access  customer
export const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!cart) {
      return errorResponse(res, status.NOT_FOUND, messages.CART_NOT_FOUND)
    }
    return successResponse(res, status.SUCCESS, messages.CART_UPDATE_SUCCESS, cart)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}

// / @route   DELETE /api/cart/deletecart/:id
// @desc    Delete cart by ID
// @access  customer
export const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id)
    if (!cart) {
      return errorResponse(res, status.NOT_FOUND, messages.CART_NOT_FOUND)
    }
    return successResponse(res, status.SUCCESS, messages.CART_DELETE_SUCCESS)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}
