import {v4 as uuidv4} from 'uuid';
import { DeveloperModel } from '../models/developerModel.js';
export const generateApiKey=async ()=>{
    let apiKey;
    let isUnique = false;

    while (!isUnique) {
    apiKey = uuidv4()
     const existingdeveloper = await DeveloperModel.findOne({apiKey})  
     if (!existingdeveloper) {
       isUnique = true 
     } 
    }
    return apiKey; // Generates a unique and secure API key
}