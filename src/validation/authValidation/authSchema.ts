import Joi from "joi";

export const authSchema = {
  signupUser: Joi.object({
    
    // root_name: Joi.string().required(),
    user_type: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().required().min(2),
    role: Joi.string().required(),
    //created_by: Joi.string().required(),
  }),
  signinUser: Joi.object({
    
    // root_name: Joi.string().required(),
    user_type: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};