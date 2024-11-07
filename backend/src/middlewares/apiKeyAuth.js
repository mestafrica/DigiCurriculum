import bcrypt from "bcryptjs"
import { DeveloperModel } from "../models/developerModel.js";
export const  apiKeyAuth =async(req,res,next)=>{
    const apiKey = req.headers['x-api-key'];
    if(!apiKey){
        return res.status(401).json({error:'API Key is required'})
    }
    const apiKeys =await DeveloperModel.findOne();
    const validKey= apiKeys.some(key =>bcrypt.compareSync(apiKey,key.hashedkey))
    if(!validKey){
        return res.status(403).json({error:'Invalid API key'});
    }
    next()
}