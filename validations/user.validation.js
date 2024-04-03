import Joi from "joi";

const validateCreateUserSchema = Joi.object({
   name: Joi.string().required().min(3),
   email: Joi.string().email().required(),
   password: Joi.string().min(6).max(30).required(), 
});


export const validateCreateUser = (userData) => {
    return validateCreateUserSchema.validate(userData);
};