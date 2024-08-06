import { resendOtp, verifyOtp } from "../controllers/authControllers.js";
import { allUsers, deleteUser, handleSignup, singleUser, updateUser } from "../controllers/usersControllers.js";
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - country
 *         - school
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         school:
 *           type: string
 *           description: The user's school
 *         userType:
 *           type: string
 *           description: The type of user
 *         country:
 *           type: string
 *           description: The user's country
 *     VerifyOtp:
 *       type: object
 *       required:
 *         - email
 *         - otp
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         otp:
 *           type: string
 *           description: The OTP code
 *     ResendOtp:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Signup successful, OTP sent
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: Verify OTP for a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOtp'
 *     responses:
 *       200:
 *         description: OTP verification successful
 *       400:
 *         description: Invalid OTP or OTP has expired
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /resend-otp:
 *   post:
 *     summary: Resend OTP to an unverified user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResendOtp'
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Invalid user
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /all-users:
 *   get:
 *     summary: Fetch all registered users from the database
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Fetch a single user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /update-user/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /delete-user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.post('/signup', handleSignup);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.get('/all-users', allUsers);
router.get('/user/:id', singleUser);
router.patch('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

export default router;
