
import express from "express"
import { registeruser, loginuser, getusers, getuserbyId, updateuser, deleteuser } from "../controllers/usercontroller.js"
const router = express.Router()
import { authmiddleware } from "../middleware/authmiddleware.js"



// @route   POST /api/users/register
// @desc    Register a new user 
// @access  Public
router.post("/register", registeruser)


// @route   POST /api/users/login
// @desc    Authenticate user and return token
// @access  Public
router.post("/login", loginuser)


// @route   GET /api/users
// @desc    Get all users
// @access  Private (Admin only)
router.get("/", authmiddleware, getusers)


// @route   GET /api/users/:id
// @desc    Get user details by ID
// @access  Private(admin,customer)
router.get("/:id", authmiddleware, getuserbyId)


// @route   PUT /api/users/:id
// @desc    Update user details by ID
// @access  Private(admin,customer)
router.put("/:id", authmiddleware, updateuser)


// @route   DELETE /api/users/:id
// @desc    Delete user by ID
// @access  Private (Admin only)
router.delete("/:id", authmiddleware, deleteuser)













export default router
