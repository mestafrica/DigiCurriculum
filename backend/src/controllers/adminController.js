import { adminModel } from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendOTPEmail } from "../utils/otpUtils.js";


// Generate a 6-digit OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 900000).toString();

export const registerAdmin = async (req, res, next) => {
    try {
        const { password, email, firstName, lastName, role } = req.body;

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json("Please enter a valid email");
        }

        // Password validation
        // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        // if (!passwordRegex.test(password)) {
        //     return res.status(400).json("Password must be at least 6 characters long and contain at least one letter and one number");
        // }

        // Check if admin exists
        const admin = await adminModel.findOne({ email });
        if (admin) {
            return res.status(409).json('Admin already exists!');
        }

        // Generate OTP and hash password
        const otp = generateOtp();
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Save new admin
        const newAdmin = new adminModel({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role,
            otp,
        });
        await newAdmin.save();

        // Send OTP email
        await sendOTPEmail(email, otp);

        res.status(201).json('Registered admin, OTP sent');
    } catch (error) {
        next(error);
    }
};

export const logInAdmin = async (req, res, next) => {
    try {
        const { password, email } = req.body;

        // Validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json("Please enter a valid email");
        }

        // find one user with identifier
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json('User does not exist!')
        }
        // Compare their passwords
        const correctPassword = await bcrypt.compare(password, admin.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials!')
        }
        // Sign a token for user
        const token = jwt.sign(
            { id: admin.id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' }
        );
        res.json({
            message: 'User checked in!',
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
}

export const getAdminProfile = async (req, res, next) => {
    try {
        console.log(req.auth);
        const admin = await adminModel
            .findById(req.auth.id)
            .select({ password: false });
        res.status(200).json(admin);
    } catch (error) {
        next(error);
    }
}
export const getAdminAllProfile = async (req, res, next) => {
    try {
        const admins = await adminModel
            .find()
            .select({ password: false });
        res.status(200).json(admins);
    } catch (error) {
        next(error);
    }
}

export const logOutAdmin = (req, res, next) => {
    res.status(200).json('Admin checked-out');
}

export const updateAdminProfile = async (req, res, next) => {
    try {
        const { password, email, firstName, lastName } = req.body;

        // Generate OTP and hash password
        const otp = generateOtp();
    
        let updatedFields = { email, firstName, lastName };
        if (password) {
            const hashedPassword = bcrypt.hashSync(password, 10)
            updatedFields.password =  hashedPassword;
        }
        const updatedAdmin = await adminModel.findByIdAndUpdate(
            req.auth.id,
            updatedFields,
            { new: true, runValidators: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json("Admin not found");
        }

        // Send OTP email
        await sendOTPEmail(email, otp); 

        res.status(200).json('Admin profile updated');
    } catch (error) {
        next(error);

    }
}