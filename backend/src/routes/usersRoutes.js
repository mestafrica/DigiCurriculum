import { resendOtp, verifyOtp } from "../controllers/authControllers.js";
import {  allUsers, deleteUser, handleSignup, singleUser, updateUser } from "../controllers/usersControllers.js";
import Router from "express"


const router = Router()


router.post('/signup', handleSignup)
router.post('/verify-otp',verifyOtp)
router.post('/resend-otp', resendOtp)
router.get('/all-users', allUsers)
router.get('/user/:id', singleUser);
router.patch('/update-user/:id',updateUser)
router.delete('/delete-user/:id',deleteUser)



export default router;