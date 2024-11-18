import { Schema, model } from "mongoose";

const developerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true },
    companyDescription: { type: String, required: true },
    companyName: { type: String, required: true, unique: true },
    country: { type: String, required: true },  
    apiKey: { type: String, },
    role: { type: String, required: true, default: "developer" },
}, {
    timestamps: true
});

export const DeveloperModel = model("Developer", developerSchema);