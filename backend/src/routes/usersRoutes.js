import { resendOtp, resetPassword, verifyOtp, verifyPasswordReset } from "../controllers/authControllers.js";
import { signIn } from "../controllers/loginControllers.js";
import { allUsers, deleteUser, handleSignup, logoutUser, singleUser, updateUser } from "../controllers/usersControllers.js";
import { Router } from 'express';

const router = Router();


router.post('/signup', handleSignup);
router.post('/login', signIn)
router.post('/reset-password', resetPassword)
router.post('/verify-token/:token',verifyPasswordReset)
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.get('/all-users', allUsers);
router.get('/user/:id', singleUser);
router.patch('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);
router.post('/logout', logoutUser);

export default router;
