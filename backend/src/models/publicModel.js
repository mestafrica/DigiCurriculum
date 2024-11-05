// Import mongoose for MongoDB interactions
import mongoose from 'mongoose';

// Define the schema for the public data
import publicSchema from new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    classLevel: { type: String, required: true },
    strand: { type: String, required: true },
    substrand: { type: String, },
    resources: [{ type: String }],
    updatedAt: { type: Date, default: Date.now },
});

// Update the 'updateAt' field automatically on save
publicSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


// Export the model so it can be used in otherparts of the application
export const publicModel = model('Public', publicSchema);