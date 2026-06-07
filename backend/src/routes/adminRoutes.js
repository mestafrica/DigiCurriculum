import { resendAdminOtp, resetAdminPassword, verifyAdminOtp, verifyAdminPasswordReset } from "../controllers/adminAuthController.js";
import { getAdminAllProfile, getAdminProfile, logInAdmin, logOutAdmin, registerAdmin, updateAdminProfile } from "../controllers/adminController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { signupLimiter, loginLimiter, otpLimiter } from "../middlewares/rateLimiter.js";
import { Router } from "express";

const adminRouter = Router();

adminRouter.post('/admin/auth/register', signupLimiter, registerAdmin);
adminRouter.post('/admin/auth/login', loginLimiter, logInAdmin);
adminRouter.post('/admin/reset-password', loginLimiter, resetAdminPassword);
adminRouter.post('/admin/verify-token/:token', otpLimiter, verifyAdminPasswordReset);
adminRouter.post('/admin/verify-otp', otpLimiter, verifyAdminOtp);
adminRouter.post('/admin/resend-otp', otpLimiter, resendAdminOtp);
adminRouter.get('/admin/auth/me/:id', isAuthenticated, getAdminProfile);
adminRouter.get('/admin/auth/me', isAuthenticated, getAdminAllProfile);
adminRouter.post('/admin/auth/logout', isAuthenticated, logOutAdmin);
adminRouter.patch('/admin/auth/me', isAuthenticated, updateAdminProfile);

export default adminRouter;