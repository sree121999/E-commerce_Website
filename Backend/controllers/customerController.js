import { status } from "../constants/httpStatus.js"
import { messages } from "../constants/messages.js"
import { errorResponse, successResponse } from "../constants/response.js"
import Customer from "../models/Customer.js"

export const updateCustomerprofile = async (req, res) => {
    try {
        const { id } = req.params
        const { user_Id, address, phone, dateOfBirth } = req.body
        const profilePicture = req.file ? req.file.path : undefined

        const updatedata = { user_Id, address, phone, dateOfBirth }

        if (profilePicture) {
            updatedata.profilePicture = profilePicture
        }

        const profile = await Customer.findOneAndUpdate(
            { user_Id: id },
            updatedata,
            { new: true, upsert: true }
        )

        return successResponse(res, status.SUCCESS, messages.PROFILE_UPDATE_SUCCESS, profile)

    } catch (error) {
        console.log(error)
        return errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)
    }
}
