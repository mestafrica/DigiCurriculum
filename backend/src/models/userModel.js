import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: function() { return this.isVerified; },
        maxLength: [30, 'Name cannot exceed 30 characters']
    },
    lastName: {
        type: String,
        required: function() { return this.isVerified; },
        maxLength: [30, 'Name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
       validate: [validator.isEmail, "Please enter valid email address"]
        },
  
    password: {
        type: String,
        required: function() { return this.isVerified; },
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
        },
    
    country: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['Teacher', 'Student'],
        required: true 
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: String,
    otpExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

export const userModel = mongoose.model('User', userSchema);
