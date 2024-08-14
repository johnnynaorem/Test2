import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },  
  designation: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  role: {
    type: Number,
    default: 0
  }
},{timestamps: true})

export default mongoose.model('users', userSchema)