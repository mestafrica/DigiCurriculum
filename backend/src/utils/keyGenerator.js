import {v4 as uuidv4} from 'uuid';
export const generateApiKey=()=>{
    return uuidv4(); // Generates a unique and secure API key
}