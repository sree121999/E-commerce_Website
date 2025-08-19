const mongoose=require('mongoose')

const OrderSchema=new mongoose.Schema({

    user_id:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
   
    orderdate:{
        type:Date,
         required:true

    },
    status:{
        type:String,
         required:true,
         enum:["pending","confirmed","processing","shipped","deliverd"],
         default:"pending"
    },
    totalamount:{
        type:Number,
         required:true
    }


},{timestamps:true})

module.exports=mongoose.model('Order',OrderSchema)