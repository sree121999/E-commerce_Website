import { status } from "../constants/httpStatus.js"
import { messages } from "../constants/messages.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { errorResponse } from "../constants/response.js"
dotenv.config()




export const authmiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return errorResponse(res, status.UNAUTHORIZED, messages.UNAUTHORIZED)

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode.user
    next()




  } catch (err) {

    console.log(err)
    errorResponse(res, status.SERVER_ERROR, messages.SERVER_ERROR)

  }
}






