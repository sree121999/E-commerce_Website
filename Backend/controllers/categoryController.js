import { status } from "../constants/httpStatus.js"
import { messages } from "../constants/messages.js"
import { errorResponse, successResponse } from "../constants/response.js"
import Category from "../models/Category.js"



// @route   POST /api/category/createcategory
// @desc create new category
// @access admin
export const CreateCategory = async (req, res) => {

  try {
    const { name, description } = req.body
    if (!name || !description) {
      return errorResponse(res, status.BAD_REQUEST, messages.FIELD_REQUIRED)
    }
    const exists = await Category.findOne({ name })
    if (exists) {
      return errorResponse(res, status.BAD_REQUEST, messages.CATEGORY_EXISTS)
    }

    const category = await Category.create({ name, description })
    return successResponse(res, status.CREATED, messages.CATEGORY_CREATED, category)
  } catch (error) {
    console.log(error)
    errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)

  }

}





// @route   POST /api/category/getcategories
// @desc    Get all categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    return successResponse(res, status.SUCCESS, messages.CATEGORY_FETCHED, categories)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}


// @route   GET /api/category/getcategory/:id
// @desc    Get single category by ID
// @access  Public

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return errorResponse(res, status.NOT_FOUND, messages.CATEGORY_NOT_FOUND)
    }
    return successResponse(res, status.SUCCESS, messages.CATEGORY_DETAILS_FETCHED, category)
  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}


// @route   PUT /api/category/updatecategory/:id
// @desc    Update category by ID
// @access  Admin

export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body

    const category = await Category.findById(req.params.id)
    if (!category) {
      return errorResponse(res, status.NOT_FOUND, messages.CATEGORY_NOT_FOUND)
    }

    category.name = name || category.name
    category.description = description || category.description
    await category.save()

    return successResponse(res, status.SUCCESS, messages.CATEGORY_UPDATED, category)

  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}


// @route   DELETE /api/category/deletecategory/:id
// @desc    Delete category by ID
// @access  Admin

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return errorResponse(res, status.NOT_FOUND, messages.CATEGORY_NOT_FOUND)
    }

    await category.deleteOne()
    return successResponse(res, status.SUCCESS, messages.CATEGORY_DELETED)

  } catch (error) {
    console.log(error)
    return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
  }
}