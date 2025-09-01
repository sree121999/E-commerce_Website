import { status } from "../constants/httpStatus.js"
import { messages } from "../constants/messages.js"
import { errorResponse, successResponse } from "../constants/response.js"
import Product from "../models/Product.js"




// @route   POST /api/product/createproduct
// @desc create new product
// @access admin

export const createProduct = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.file)

    const { name, description, price, stock, category_Id } = req.body

    const image = req.file ? req.file.path : undefined

    if (!name || !description || !price || !stock || !image || !category_Id) {
      return errorResponse(res, status.BAD_REQUEST, messages.FIELD_REQUIRED)
    }

    const exists = await Product.findOne({ name })
    if (exists) {
      return errorResponse(res, status.BAD_REQUEST, messages.PRODUCT_EXIST)
    }

    const product = await Product.create({ name, description, price, stock, image, category_Id })
    return successResponse(res, status.CREATED, messages.PRODUCT_CREATE_SUCCESS, product)

  } catch (error) {
    console.log(error)
    errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)

  }

}


// / @route   GET /api/product/getallproducts
// @desc    Get all products
// @access  Public

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category_Id", "name")
    return successResponse(res, status.SUCCESS, messages.PRODUCT_FETCH_SUCCESS, products)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}




// @route   GET /api/product/getproduct/:id
// @desc    Get single product by id
// @access  Public

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category_Id", "name")
    if (!product) {
      return errorResponse(res, status.NOT_FOUND, messages.PRODUCT_NOT_FOUND)
    }
    return successResponse(res, status.SUCCESS, messages.PRODUCT_GET_SUCCESS, product)
  } catch (error) {
    console.log(error);
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}


// @route   PUT /api/product/updateproduct/:id
// @desc    Update product
// @access  Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_Id } = req.body
    const image = req.file ? req.file.path : undefined

    const updatedata = { name, description, price, stock, category_Id }

    if (image) {
      updatedata.image = image
    }


    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedata,
      { new: true }
    )

    if (!product) {
      return errorResponse(res, status.NOT_FOUND, messages.PRODUCT_NOT_FOUND)
    }

    return successResponse(res, status.SUCCESS, messages.PRODUCT_UPDATE_SUCCESS, product)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}




// @route   DELETE /api/product/deleteproduct/:id
// @desc    Delete product
// // @access  Admin

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return errorResponse(res, status.NOT_FOUND, messages.PRODUCT_NOT_FOUND)
    }

    return successResponse(res, status.SUCCESS, messages.PRODUCT_DELETE_SUCCESS)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
};