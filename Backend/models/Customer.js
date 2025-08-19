const mongoose=require('mongoose')

const CustomerSchema=new mongoose.Schema({
    user_id:{
          type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true,
                unique:true
        
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
         required:true

    }
},{timestamps:true})

module.exports=mongoose.model('Customer',CustomerSchema)