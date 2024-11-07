import { expressjwt } from "express-jwt";
import dotenv from "dotenv";
import curriculumModel from "../models/curriculumModel.js";
import { permissions } from "../utils/rbac.js";

dotenv.config();

export const isAuthenticated = expressjwt({
    secret:process.env.JWT_SECRET,
    algorithms: ["HS256"],
})

export const hasPermissions = (action) => {
    return async (req, res, next) => {
        try {
            const curriculum = await curriculumModel.findById(req.auth.id);

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