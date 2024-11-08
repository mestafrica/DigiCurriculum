import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
import { permissions } from "../utils/rbac.js";
import { adminModel } from "../models/adminModel.js";

dotenv.config();

export const isAuthenticated = expressjwt({
    secret:process.env.JWT_PRIVATE_KEY,
    algorithms: ["HS256"],
})

export const hasPermissions = (action) => {
    return async (req, res, next) => {
        try {
            const admin = await adminModel.findById(req.auth.id);

            const permission = permissions.find(p => p.role === admin.role);

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