
import express from "express"
import userRoute from "./routes/userRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
import cartRoute from "./routes/cartRoute.js"
import cartitemRoute from "./routes/cartitemRoute.js"
import orderRoute from "./routes/orderRoute.js"
import orderitemRoute from "./routes/orderitemRoute.js"
import { authmiddleware } from "./middleware/authmiddleware.js"
import customerRoute from "./routes/customerRoute.js"

const app = express()
app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/category", authmiddleware, categoryRoute)
app.use("/api/product", authmiddleware, productRoute)
app.use("/api/cart", authmiddleware, cartRoute)
app.use("/api/cartitem", authmiddleware, cartitemRoute)
app.use("/api/order", authmiddleware, orderRoute)
app.use("/api/orderitem", authmiddleware, orderitemRoute)
app.use("/api/customer", authmiddleware, customerRoute)


export default app