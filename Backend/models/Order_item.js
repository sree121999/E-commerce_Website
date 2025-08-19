const mongoose=require('mongoose')

const OrderitemSchema=new mongoose.Schema({

    oder_Id:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
   
    product_Id:{
          type:mongoose.Schema.Types.ObjectId,
        ref:'Product'

    },
    quantity:{
        type:Number,
         required:true
    },
    price:{
        type:Number,
         required:true
    }
},{timestamps:true})

module.exports=mongoose.model('Order_item',OrderitemSchema)