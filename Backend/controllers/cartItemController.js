import { status } from "../constants/httpStatus.js"
import { messages } from "../constants/messages.js"
import { errorResponse, successResponse } from "../constants/response.js"
import Cartitem from "../models/Cartitem.js"

// @route   POST /api/cartitem/createcartitem
// @desc create new cartitem
// @access customer
export const createCartItem = async (req, res) => {

  try {
    const { cart_Id, product_Id, quantity } = req.body
    if (!cart_Id || !product_Id, !quantity) {
      return errorResponse(res, status.BAD_REQUEST, messages.FIELD_REQUIRED)

    }


    const existing = await Cartitem.findOne({ cart_Id, product_Id, quantity })
    if (existing) {
      return errorResponse(res, status.BAD_REQUEST, messages.CART_ITEM_ALREADY_EXISTS)

    }

    const cartitem = await Cartitem.create({ cart_Id, product_Id, quantity })
    return successResponse(res, status.CREATED, messages.CART_ITEM_ADD_SUCCESS, cartitem)

  } catch (error) {
    console.log(error)
    errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)

  }
}




// @route   GET /api/cartitem/getcartitems
// @desc    Get all cartitems
// @access  customer,admin

export const getCartItems = async (req, res) => {
  try {
    const items = await Cartitem.find().populate("cart_Id").populate("product_Id")
    return successResponse(res, status.SUCCESS, messages.CART_ITEM_FETCH_SUCCESS, items)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}

// @route   GET /api/cartitem/getcartitem/:id
// @desc    Get single cartitem by ID
// @access  Admin
export const getCartItemById = async (req, res) => {
  try {
    const { id } = req.params
    const item = await Cartitem.findById(id).populate("cart_Id").populate("product_Id")

    if (!item) {
      return errorResponse(res, status.NOT_FOUND, messages.CART_ITEM_NOT_FOUND)
    }

    return successResponse(res, status.SUCCESS, messages.CART_ITEM_FETCH_SUCCESS, item)
  } catch (error) {
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}


// @route   PUT /api/cartitem/updatecartitem/:id
// @desc    Update cartitem by ID
// @access  customer
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const item = await Cartitem.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    )

    if (!item) {
      return errorResponse(res, status.NOT_FOUND, messages.CART_ITEM_NOT_FOUND)
    }

    return successResponse(res, status.SUCCESS, messages.CART_ITEM_UPDATE_SUCCESS, item)
  } catch (error) {
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}



// @route   DELETE /api/cartitem/deletecartitem/:id
// @desc    Delete cartitem by ID
// @access  Admin,customer

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params
    const item = await Cartitem.findByIdAndDelete(id)

    if (!item) {
      return errorResponse(res, status.NOT_FOUND, messages.CART_ITEM_NOT_FOUND)
    }

    return successResponse(res, status.SUCCESS, messages.CART_ITEM_DELETE_SUCCESS)
  } catch (error) {
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}