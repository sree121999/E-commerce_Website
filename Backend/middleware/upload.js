import multer from "multer";
import path from "path"



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})



const filefilter = (req, file, cb) => {
  const allowedtypes = /jpeg|jpg|png/
  const extname = allowedtypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const nimetype = allowedtypes.test(file.nimetype)
  if (extname && nimetype) {
    cb(null, true)
  } else {
    cb(new Error("only .jpeg, .jpg, .png images are allowed"))
  }

}


const upload = multer({ storage, filefilter })

export default upload