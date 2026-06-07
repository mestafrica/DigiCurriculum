import { resendOtp, resetPassword, verifyOtp, verifyPasswordReset } from "../controllers/authControllers.js";
import { signIn } from "../controllers/loginControllers.js";
import { allUsers, deleteUser, handleSignup, singleUser, updateUser } from "../controllers/usersControllers.js";
import { Router } from 'express';
import { signupLimiter, loginLimiter, otpLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post('/signup', signupLimiter, handleSignup);
router.post('/login', loginLimiter, signIn);
router.post('/reset-password', loginLimiter, resetPassword);
router.post('/verify-token/:token', otpLimiter, verifyPasswordReset);
router.post('/verify-otp', otpLimiter, verifyOtp);
router.post('/resend-otp', otpLimiter, resendOtp);
router.get('/all-users', allUsers);
router.get('/user/:id', singleUser);
router.patch('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

export default router;