import Joi from "joi";

// validate signup
export const signupDeveloperValidator = Joi.object({
    name: Joi.string().required(),
    companyName: Joi.string().required(),
    companyDescription: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    country: Joi.string().required()

});

// validate login
export const loginDeveloperValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});


// validate update
export const updateDeveloper = Joi.object({
    name: Joi.string().optional(),
    companyName: Joi.string().optional(),
    companyDescription: Joi.string().optional(),
    country: Joi.string().optional()

});
