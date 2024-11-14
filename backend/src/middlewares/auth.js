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

import dotenv from "dotenv";
import { permissions } from "../utils/rbac.js";
import { adminModel } from "../models/adminModel.js";

dotenv.config();


export const hasPermissions = (action) => {
    return async (req, res, next) => {
        try {
            const admin = await adminModel.findById(req.auth.id);
           
            const permission = permissions.find((p) => p.role.toLowerCase() === admin.role.toLowerCase());

            if (!permission) {
                return res.status(404).json('You do not have permission to perform this action!');
            }

            if (!permission.actions.includes(action)) {
                return res.status(403).json('You do not have permission to perform this action!');
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}
