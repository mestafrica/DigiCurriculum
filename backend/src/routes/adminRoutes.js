import { resendAdminOtp, resetAdminPassword, verifyAdminOtp, verifyAdminPasswordReset } from "../controllers/adminAuthController.js";
import { getAdminAllProfile, getAdminProfile, logInAdmin, logOutAdmin, registerAdmin, updateAdminProfile } from "../controllers/adminController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { Router } from "express";

const adminRouter = Router();

adminRouter.post('/admin/auth/register', registerAdmin);

adminRouter.post('/admin/auth/login', logInAdmin);

adminRouter.post('/admin/reset-password', resetAdminPassword);

adminRouter.post('/admin/verify-token/:token', verifyAdminPasswordReset);

adminRouter.post('/admin/verify-otp', verifyAdminOtp);

adminRouter.post('/admin/resend-otp', resendAdminOtp);

adminRouter.get('/admin/auth/me/:id', isAuthenticated, getAdminProfile);

adminRouter.get('/admin/auth/me', isAuthenticated, getAdminAllProfile);

adminRouter.post('/admin/auth/logout', isAuthenticated, logOutAdmin);

adminRouter.patch('/admin/auth/me', isAuthenticated, updateAdminProfile);

export default adminRouter;