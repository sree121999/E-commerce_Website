const mongoose=require('mongoose')

const PaymentSchema=new mongoose.Schema({

    order_id:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    },
   
    paymentdate:{
        type:Date,
         required:true
    },
    amount:{
        type:Number,
         required:true
    },
    paymentmethod:{
        type:String,
        enum:["cod","debit_card","credit_card","net_banking","upi"],
        default:"cod",
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["pending","processing","paid","failed"],
        default:"processing"
    }


},{timestamps:true})

module.exports=mongoose.model('Payment',PaymentSchema)