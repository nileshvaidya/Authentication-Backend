import { RequestHandler } from 'express';
import { authSchema } from './authSchema';
import validator from '../utils/validator';

export const signupUserValidation: RequestHandler = (req, res, next) => validator(authSchema.signupUser
  , req.body, next);
export const signinUserValidation: RequestHandler = (req, res, next) => validator(authSchema.signinUser
  , req.body, next);