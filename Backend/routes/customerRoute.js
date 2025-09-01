import express from "express"
const router = express.Router()
import upload from "../middleware/upload.js"
import { updateCustomerprofile } from "../controllers/customerController.js"


router.post("/:id", upload.single("profilePicture"), updateCustomerprofile)




export default router