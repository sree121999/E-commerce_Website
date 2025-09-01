import mongoose from "mongoose";

const OrderitemSchema = new mongoose.Schema({

    order_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },

    product_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'

    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Orderitem = mongoose.model("Orderitem", OrderitemSchema)

export default Orderitem
