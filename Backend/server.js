//  server.js

import connectDB from "./config/db.js"
import dotenv from "dotenv"
import app from "./app.js"

const PORT = process.env.PORT
dotenv.config()
connectDB()



app.listen(PORT, () => {
    console.log(`server running successfully ${PORT}`)
})