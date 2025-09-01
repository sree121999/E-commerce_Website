import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({



    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true

    },
    category_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }


}, { timestamps: true })


const Product = mongoose.model("Product", ProductSchema)

export default Product

