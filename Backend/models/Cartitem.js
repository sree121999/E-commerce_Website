import mongoose from "mongoose";

const CartitemSchema = new mongoose.Schema({
    cart_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,

    },
    product_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true

    },
    quantity: {
        type: Number,
        required: true
    }





}, { timestamps: true })

const Cartitem = mongoose.model("Cartitem", CartitemSchema)

export default Cartitem
