const jwt = require ("jsonwebtoken");
import { setJWT, getJWT } from "./redis.helper";
// import { storeUserRefreshJWT } from "../models/user/User_model"
import { storeUserRefreshJWT } from "../models/user/User_model";
import User from "../models/user/User.schema";
const  {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require("../config/index")

export const createAccessJWT = async (email: string, _id: string) => {
  try {
    const accessJWT = await jwt.sign({ email }, JWT_ACCESS_SECRET, {
      expiresIn: "1d", //change this to 15m
    });
   
    
    await setJWT(accessJWT, _id);
    
    return Promise.resolve(accessJWT);
  } catch (error) {
    return Promise.reject(error);
  
  }
};


export const createRefreshJWT = async (email: string, _id: string) => {
  try {
    const refreshJWT = jwt.sign({ email }, JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    
    await storeUserRefreshJWT(_id, refreshJWT);
  
    return Promise.resolve(refreshJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};


export const verifyAccessJWT = (userJWT: string) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, JWT_ACCESS_SECRET));
  } catch (error) {
    return Promise.reject(error);
    
  };


}
export const verifyRefreshJWT = (userJWT: string) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, JWT_REFRESH_SECRET));
  } catch (error) {
    return Promise.reject(error);
    
  };


}