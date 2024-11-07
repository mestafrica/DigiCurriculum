import { expressjwt } from "express-jwt";
import { DeveloperModel } from "../models/developerModel.js";

// Check if the developer is authenticated
export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256']
  });
  

// permission for developer
export const developerPermission = (action) => {
    return async (req, res, next) => {
        try{
            // find developer from database
            const developer = await DeveloperModel.findById(req.auth.id);
            const permission = permissions.find((value )=> value.role === developer.role);
            if (!permission) {
                return res.status(403).json('No permission found!');
            }
            // check if permission actions include action
            if (permission.actions.includes(action)) {
                next();
            } else {
                res.status(403).json('Action not allowed!');
            }
        } catch (error) {
            next(error);
        }
    }
}
