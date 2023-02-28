import { deleteUserById, getUserById, updatePasswordById, updateRoleById } from './../models/user/User_model';
import { RequestHandler } from "express";
import User from '../models/user/User.schema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import roles from '../utils/constants';
const { JWT_KEY, ADMIN_EMAIL } = require("../config/index");
import mongoose from "mongoose";
import { getAllUsers } from "../models/user/User_model";
import { getJWT } from '../helper/redis.helper';
import { verifyAccessJWT } from '../helper/jwt.helper';
import createHttpError from 'http-errors';
import { hashPassword } from '../helper/bcrypt.helper';

interface CustomRequest extends Request {
  userId: string;
}

export const getUsers = async (req:any, res:any, next:any) => {
  console.log("reached getUser...");
  try {
    const users = await getAllUsers();
    console.log(users);
    if (!users) {
      return res.status(404).json({ message: 'No User Found' });
    }
    return res.status(200).json({users})
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
  
}
export const getUser = async (req:any, res:any, next:any) => {
 
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID");
      return res.status(404).json({ message: 'Invalid ID' });
      
    }
    const user = await getUserById(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'No User Found' });
    }
    return res.status(200).json({user})
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
  
}
export const updateRole = async (req:any, res:any, next:any) => {
 
  try {
    console.log(req.body);
    
    const { id, role } = req.params;
    //
    console.log("ID...: ", id, "  Role...: ", role);
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID");
      return res.status(404).json({ message: 'Invalid ID' });
      
    }
    console.log("ID Validated....");
    
    if (!role) {
      console.log("Invalid role");
      return res.status(404).json({ message: 'Invalid Role' });
      
    }

    console.log("Role validated...");
    
    // Check for valid Roles
    const rolesArray = Object.values(roles);
    if (!rolesArray.includes(role)) {
      console.log("Invalid role");
      return res.status(404).json({ message: 'Invalid Role' });
    }
    console.log("Role option validated...");
    const { authorization } = req.headers;
    console.log(authorization);
    
    // const decoded = await verifyAccessJWT(authorization);
    const userId = await getJWT(authorization);
    console.log(userId , id );
    
    // // Admin cannot remove himself/herself as an admin
    // console.log("req.user.id : ", userId, " id :", id);
    
    if (userId === id) {
      console.log("Invalid role");
      return res.status(404).json({ message: 'Admins cannot remove themselves from Admin, ask another admin.' });
    }

    //Finally update the user



console.log("Vali done...");

    const user =  updateRoleById(id, role);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'No User Found' });
    }
    return res.status(200).json({ message: 'Role updated successfully!!!' })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
  
}
export const deleteUser = async (req:any, res:any, next:any) => {
 
  try {
    const { id } = req.params;
    //
    console.log("ID...: ", id);
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID");
      return res.status(404).json({ message: 'Invalid ID' });
      
    }
    console.log("ID Validated....");
    
    const { authorization } = req.headers;
    console.log(authorization);
    
    //Finally Delete the user
    const result =  deleteUserById(id);
    
    if (!result) {
      return res.status(404).json({ message: 'User could not be deleted' });
    }
    return res.status(200).json({ message: 'User deleted successfully!!!' })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
  
}


export const changePassword: RequestHandler = async (req, res, next) => {
 

  try {
    console.log(req.body);
    
    const { id, password } = req.body;
    //
    console.log("ID...: ", id, "  Password...: ", password);
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID");
      return res.status(404).json({ message: 'Invalid ID' });
      
    }
    console.log("ID Validated....");
    
    if (!password) {
      console.log("Invalid Password");
      return res.status(404).json({ message: 'Invalid Password' });
      
    }
    
    const { authorization } = req.headers;
    console.log(authorization);
    
    // const decoded = await verifyAccessJWT(authorization);
    const userId = await getJWT(authorization!);
    console.log(userId , id );
    


    //Finally update the user



console.log("Vali done...");

    const user =  updatePasswordById(id, password);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'No User Found' });
    }
    return res.status(200).json({ message: 'Password updated successfully!!!' })
  } catch (error) {
    if (error instanceof Error) {
      next(error)
    }
  }
};