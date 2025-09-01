import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
      user_Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,


      },



}, { timestamps: true })

const Cart = mongoose.model("Cart", CartSchema)

export default Cart
