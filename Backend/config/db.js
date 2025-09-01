import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("db connected successfully")
  } catch (err) {
    console.error("Database connection failed:", err.message)

  }
}

export default connectDB
