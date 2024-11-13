import mongoose from "mongoose";
const apiKeySchema = new  mongoose.Schema({
    key:{type:String, required:true,unique:true},
    createdAt:{type:Date, default:Date.now}
    ///Add more fields if needed //
})
const ApiKey = mongoose.model('ApiKey',apiKeySchema);
export default ApiKey;








// // import mongoose to interact with MongoDB
// import mongoose from 'mongoose'
// import apiKeySchema from mongoose.Schema({
//     key: { type: String, required: true, unique: true },
//     role: { type: String, enum: ['student', 'teacher', 'admin'], required: true},
//     createdAt: { type: Date, default: Date.now },
//     expiresAt: { type: Date }, // Optional: set an expiration date for the key if needed
//     isActive: { type: Boolean, default: true }
// });

// export const apiKeyModel = model('apiKey', apiKeySchema);