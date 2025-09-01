import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true

  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  phone: {
    type: String,
    required: true

  },
  dateOfBirth: {
    type: Date
  },
  profilePicture: {
    type: String
  },
}, { timestamps: true })

const Customer = mongoose.model("Customer", CustomerSchema)

export default Customer
