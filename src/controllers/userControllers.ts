import  createHttpError, {InternalServerError} from 'http-errors';
import { RequestHandler } from "express";
// import User from "../models/user/User.schema";
import {hashPassword,comparePassword} from '../helper/bcrypt.helper'
import jwt from 'jsonwebtoken';

const {JWT_KEY} = require("../config/index")
import {
  insertUser,
  getUserByEmail,
  getUserById,
  storeUserRefreshJWT,
} from '../models/user/User_model'
import { create } from 'domain';
import { createAccessJWT, createRefreshJWT } from '../helper/jwt.helper';
import { deleteJWT } from '../helper/redis.helper';
import  User  from "../models/user/User.schema";
export const getUserProfile = async (req: {
  [userId: string]: {}; headers: { authorization: any; }; 
}, res: any, next: any) => {
 
  const _id = JSON.stringify(req.userId);
  const userProf: IUser = await getUserById(_id) as IUser;
  const { name, email } = userProf;
  res.json({
    user: {
      _id,
      name,
      email,
    },
  });
};


export const signupUser: RequestHandler = async (req, res, next) => {
  const { role, name, email, password } = req.body;

  try {
    console.log(email);
    
    const existingUser = await getUserByEmail(email);
    console.log("existing User : ", existingUser);
    
    if (existingUser) return next(createHttpError(422, "Email Already Exists!"));
    const root_id = "SB005HG"; // Get Client ID from Client Table --- TODO

    const hashedPassword:string = await hashPassword(password) as string;
    // const user = new User({ root_id, user_type, name, email, password: hashedPassword, created_by });
    // const newUserObj:IUser = {  user_type, name, email, password: hashedPassword };
   
    
    const result = await insertUser({  role, name, email, password: hashedPassword });

    res.json({ status: 200 ,  message: "User Created" });
  } catch (error) {
    return next(InternalServerError)
  }
};

export const signinUser: RequestHandler = async (req, res, next) => {
 
  
  const { email, password } = req.body as { email: string, password: string };
  
  
  // try {

    if (!email || !password) {
      return res.json({ status: "error", message: "Invalid form submition!" });
    }
  
  // Get Client ID from Client Name and Check Client ID and Email -- TODO
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "User not Found!"));
    
    const passFromDb = user && user.email ? user.password : null;
    if (!passFromDb)
		return res.json({ status: "error", message: "Invalid email or password!" });

    const isValidPassword = await comparePassword(password, passFromDb);
    
    if (!isValidPassword) return next(createHttpError(401, "InValid Email or Password"));
    
    const accessJWT = await createAccessJWT(user.email, `${user._id}`);
    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);

    res.json({
      status: "success",
      message: "Login Successfull!",
      accessJWT,
      refreshJWT,
    });

    
  // } catch (error) {
  //   return next(InternalServerError);
  // }
};

export const logoutUser = async (req: {
  [userId: string]: {}; headers: { authorization: any; }; 
}, res: any, next: any) => {
  const { authorization } = req.headers;

  const _id =  (req.userId);

  //2. delete accessJWT from redis database
  deleteJWT(authorization);

  
  //3. delete refreshJWT from mongoDB
  const result:IUser = await storeUserRefreshJWT(`${_id}`, "") as IUser;

  if (result.email) {
    return res.json({ status: "success", message: "Loged out successfully" });
  }
  res.json({
    status: "error",
    message: "Unable to log you out, lease try again later",
  });

}
