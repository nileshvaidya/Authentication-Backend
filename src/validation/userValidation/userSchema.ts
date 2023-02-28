import Joi from "joi";

export const userSchema = {
  signupUser: Joi.object({
    
    // root_name: Joi.string().required(),
    role: Joi.string().required(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    
  }),
  signinUser: Joi.object({
    
    // root_name: Joi.string().required(),
    // user_type: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};