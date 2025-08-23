const mongoose=require('mongoose')

const CartitemSchema=new mongoose.Schema({
     cart_Id:{
              type:mongoose.Schema.Types.ObjectId,
                    ref:'Cart',
                    required:true,
                      
        },
         product_Id:{
                  type:mongoose.Schema.Types.ObjectId,
                ref:'Product'
        
            },
            quantity:{
                type:Number
            }


   
   
   
},{timestamps:true})

module.exports=mongoose.model('Cartitem',CartitemSchema)