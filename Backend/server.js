const express=require('express')
const { connectDB } = require('./config/db')
const app=express()
require('dotenv').config()

const PORT=process.env.PORT


connectDB()



app.listen(PORT,()=>{
    console.log(`server running successfully ${PORT}`)
})