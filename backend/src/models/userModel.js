import mongoose from "mongoose"


const schema=mongoose.Schema


const userSchema= new schema({
    name:{type: String, required:true, unique: true},
    email:{type: String, required:true, unique: true},
    password:{type: String, required:true},
    userType:{type: String, enum:['Teacher','Student'],required:true},
    school:{type: String, required: true},
    country:{type: String, required:true},
    otp:{type: String},
    otpExpires:{type: Date},
    isVeried:{Boolean, default:false},
    timestamps:true
})


export const userModel = mongoose.model("user", userSchema);
