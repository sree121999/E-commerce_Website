import express from "express"
const router = express.Router()
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController.js"
import upload from "../middleware/upload.js"


// @route   POST /api/product/createproduct
// @desc create new product
// @access admin
router.post("/createproduct", upload.single("image"), createProduct)



// / @route   GET /api/product/getallproducts
// @desc    Get all products
// @access  Public
router.get("/getallproducts", getAllProducts)


// @route   GET /api/product/getproduct/:id
// @desc    Get single product by id
// @access  Public
router.get("/getproduct/:id", getProductById)


// @route   PUT /api/product/updateproduct/:id
// @desc    Update product
// @access  Admin
router.put("/updateproduct/:id", upload.single("image"), updateProduct)


// @route   DELETE /api/product/deleteproduct/:id
// @desc    Delete product
// // @access  Admin
router.delete("/deleteproduct/:id", deleteProduct)







export default router