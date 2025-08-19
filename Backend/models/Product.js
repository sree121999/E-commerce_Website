const mongoose=require('mongoose')

const ProductSchema=new mongoose.Schema({

   
   
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true

    },
    price:{
        type:Number,
         required:true
    },
    stock:{
        type:Number,
         required:true
    },
    imageurl:{
         type:String,
        required:true

    },
    category_id:{
            type:mongoose.Schema.Types.ObjectId,
                ref:'Category'
    }


},{timestamps:true})

module.exports=mongoose.model('Product',ProductSchema)