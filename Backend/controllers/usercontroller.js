import { status } from "../constants/httpStatus.js";
import { messages } from "../constants/messages.js";
import { errorResponse, successResponse } from "../constants/response.js";
import User from "../models/User.js"
import bcrypt from "bcrypt"
import generatetoken from "../utils/generatetoken.js";



// @route   POST /api/users/register
// @desc    Register a new user 
// @access  Public
export const registeruser = async (req, res) => {

    try {
        console.log(req.body);

        const { name, email, password, role } = req.body
        if (!name || !email || !password || !role) {
            return errorResponse(res, status.BAD_REQUEST, messages.FIELD_REQUIRED)
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            return errorResponse(res, status.CONFLICT, messages.USER_EXISTS)
        }

        const hashespassword = await bcrypt.hash(password, 10)

        const newuser = await User.create({ name, email, password: hashespassword, role })
        return successResponse(res, status.SUCCESS, messages.REGISTER_SUCCESS, {
            name: newuser.name,
            email: newuser.email,
            role: newuser.role
        })



    } catch (error) {
        console.log(error)
        errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)

    }

}


// @route   POST /api/users/login
// @desc    Authenticate user and return token
// @access  Public
export const loginuser = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return errorResponse(res, status.BAD_REQUEST, messages.FIELD_REQUIRED)
        }

        const userExist = await User.findOne({ email })
        if (!userExist) {
            return errorResponse(res, status.CONFLICT, messages.USER_EXISTS)
        }

        const ismatch = await bcrypt.compare(password, userExist.password)
        if (!ismatch) {
            return errorResponse(res, status.UNAUTHORIZED, messages.INVALID_CREDENTIALS)
        }

        const token = generatetoken(userExist._id, userExist.role)

        return successResponse(res, status.SUCCESS, messages.LOGIN_SUCCESS, {
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            role: userExist.role, token
        })


    } catch (error) {
        console.log(error)
        errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
    }

}


// @route   GET /api/users
// @desc    Get all users
// @access  Private (Admin only)
export const getusers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        return successResponse(res, status.SUCCESS, messages.FETCH_SUCCESS, users)
    } catch (error) {
        console.log(error)
        return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
    }

}

// @route   GET /api/users/:id
// @desc    Get user details by ID
// @access  Private (admin,customer)
export const getuserbyId = async (req, res) => {


    try {
        const { id } = req.params
        const user = await User.findById(id).select("-password")

        if (!user) {
            return errorResponse(res, status.NOT_FOUND, messages.USER_NOT_FOUND)
        }

        return successResponse(res, status.SUCCESS, messages.FETCH_SUCCESS, user)
    } catch (error) {
        console.log(error)
        return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
    }

}


// @route   PUT /api/users/:id
// @desc    Update user details by ID
// @access  Private(admin,customer)
export const updateuser = async (req, res) => {

    try {
        const { id } = req.params
        const { name, email, password, role } = req.body

        const user = await User.findById(id)
        if (!user) {
            return errorResponse(res, status.NOT_FOUND, messages.USER_NOT_FOUND)
        }

        if (name) user.name = name
        if (email) user.email = email
        if (role) user.role = role
        if (password) user.password = await bcrypt.hash(password, 10)

        await user.save()

        return successResponse(res, status.SUCCESS, messages.USER_UPDATED, {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        console.log(error)
        return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
    }
}








// @route   DELETE /api/users/:id
// @desc    Delete user by ID
// @access  Private (Admin only)

export const deleteuser = async (req, res) => {

    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return errorResponse(res, status.NOT_FOUND, messages.USER_NOT_FOUND)
        }

        return successResponse(res, status.SUCCESS, messages.USER_DELETED)
    } catch (error) {
        console.log(error)
        return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
    }

}

