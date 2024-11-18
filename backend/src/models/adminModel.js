import { Schema, model } from "mongoose";
import validator from "validator";

const adminSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true, validate: [validator.isEmail, "Please enter valid email address"]},
   password: {type: String, required: true}, 
    role: {type: String, default: 'admin', enum: ['admin', 'super admin'] },
    isVerified: {type: Boolean, default: false},
    otp: String,
    otpExpiry: Date,
    createdAt: {type: Date, default: Date.now},
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

adminSchema.index({ email: 1 }, { unique: true });

export const adminModel = model('Admin', adminSchema);