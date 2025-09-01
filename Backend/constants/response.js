export const successResponse = (res, statuscode, message, data) => {
  return res.status(statuscode).json({
    success: true,
    message,
    data

  })
}

export const errorResponse = (res, statuscode, message) => {
  return res.status(statuscode).json({
    success: false,
    message
  })
}
