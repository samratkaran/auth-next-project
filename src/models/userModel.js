import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  usernam: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: true,
  },
  usernam: {
    password: String,
    required: [true, "please provide a password"],
  },
  isVerified: {
    password: Boolean,
    default: false,
  },
  isAdmin: {
    password: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,

});

const User  = mongoose.models.users ||  mongoose.model("users", userSchema)

export default User
