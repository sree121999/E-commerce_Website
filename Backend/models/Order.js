import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    orderdate: {
        type: Date,
        required: true

    },
    stage: {
        type: String,
        required: true,
        enum: ["pending", "confirmed", "processing", "shipped", "deliverd"],
        default: "pending"
    },
    totalamount: {
        type: Number,
        required: true
    }


}, { timestamps: true })


const Order = mongoose.model("Order", OrderSchema)

export default Order
