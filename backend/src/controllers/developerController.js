// import required modules
import bcrypt from "bcryptjs"
import { DeveloperModel } from "../models/developerModel.js";
import { signupDeveloperValidator, loginDeveloperValidator } from "../../validator/developerValidator.js";
import jwt from "jsonwebtoken"
import { generateApiKey } from "../utils/keyGenerator.js";

// Developers signup
export const signupDeveloper = async(req, res, next) => {
    try{
        // Developer input validation
        const { error, value } = signupDeveloperValidator.validate(req.body);
        if (error) { return res.status(422).json(error);
        } 
        // check if developer does not exist
        const developer = await DeveloperModel.findOne({ email: value.email });
        if (developer) {
            return res.status(409).json("Developer already exist!");
        }
        // hash password
        const hashedPassword= bcrypt.hashSync(value.password, 10);

        const apiKey = await generateApiKey()
        // save developer into database
        await DeveloperModel.create({
            ...value,
            password: hashedPassword, apiKey
        });
        // respond to request
        res.status(200).json({ message: "Developer signed up", apiKey})
    } catch (error) {
        next(error);
    }
}


// developer login
export const loginDeveloper = async (req, res, next) => {
    try {
        // validate developer input
        const { error, value } = loginDeveloperValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // find one user identifier
        const user = await DeveloperModel.findOne({ email: value.email });
        if (!user) {
            return res.status(404).json('User does not exit')
        }
        // password comparism
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json("Invalid credentials");
        }
        // sign a token for developer
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_PRIVATE_KEY, { expiresIn: "24h" }
        );
        res.json({ message:"Developer logged in!", accessToken: token 
        })
    } catch (error) {
        next(error);
    }
}
