import bcrypt from "bcryptjs";
import { DeveloperModel } from "../models/developerModel.js";

export const apiKeyAuth = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({ error: 'API Key is required' });
    }
    // Find developer with a matching API key (compare with hash)
    const developers = await DeveloperModel.find({ apiKey: { $exists: true, $ne: null } });
    const validDeveloper = developers.find(dev => bcrypt.compareSync(apiKey, dev.apiKey));
    if (!validDeveloper) {
        return res.status(403).json({ error: 'Invalid API key' });
    }
    req.developer = validDeveloper;
    next();
};

