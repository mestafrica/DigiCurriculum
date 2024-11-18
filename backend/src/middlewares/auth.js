import { expressjwt } from "express-jwt";
import { DeveloperModel } from "../models/developerModel.js";
import dotenv from "dotenv";
import { permissions } from "../utils/rbac.js";
import { adminModel } from "../models/adminModel.js";

dotenv.config();

// Check if the developer is authenticated
export const isAuthenticated = expressjwt({
    secret: process.env.JWT_PRIVATE_KEY,
    algorithms: ['HS256']
  });
  

// permission for developer
export const developerPermission = (action) => {
    return async (req, res, next) => {
        try {
            if (!req.auth || !req.auth.id) {
                return res.status(401).json({ message: 'Unauthorized: No token provided' });
            }

            const developer = await DeveloperModel.findById(req.auth.id);
            if (!developer) {
                console.error("Developer not found.");
                return res.status(404).json({ message: 'Developer not found' });
            }

            if (!developer.role) {
                console.error("Developer role is undefined.");
                return res.status(400).json({ message: 'Developer role is missing.' });
            }

            const normalizedRole = developer.role.toLowerCase().trim();
            const permission = permissions.find((value) => 
                value.role.toLowerCase().trim() === normalizedRole
            );

            if (!permission) {
                console.error(`Permission not found for role: ${developer.role}`);
                return res.status(403).json({ message: `No permissions found for role: ${developer.role}` });
            }

            if (!permission.actions.includes(action)) {
                console.error(`Action "${action}" not allowed for role: ${developer.role}`);
                console.error("Allowed Actions:", permission.actions);
                return res.status(403).json({ message: "Action not allowed!" });
            }

            next();
        } catch (error) {
            console.error("Permission Middleware Error:", error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    };
};





export const hasPermissions = (action) => {
    return async (req, res, next) => {
        try {
            if (!req.auth || !req.auth.id) {
                return res.status(401).json({ message: "Unauthorized: No valid authentication data provided." });
            }

            const admin = await adminModel.findById(req.auth.id);

            if (!admin) {
                return res.status(404).json({ message: "Admin not found. Please check your credentials." });
            }

            console.log("Admin Role:", admin.role);

            const permission = permissions.find((p) => 
                p.role.toLowerCase().trim() === admin.role.toLowerCase().trim()
            );

            if (!permission) {
                console.error(`Permission not found for role: ${admin.role}`);
                return res.status(403).json({ message: "No permission found!" });
            }

            if (!permission.actions.includes(action)) {
                console.error(`Action "${action}" not allowed for role: ${admin.role}`);
                return res.status(403).json({ message: "Action not allowed!" });
            }

            next();
        } catch (error) {
            console.error("Error in hasPermissions middleware:", error);
            next(error);
        }
    };
};

