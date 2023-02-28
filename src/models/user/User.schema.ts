import { Schema, model, Document } from "mongoose";


import  roles  from '../../utils/constants';

// const Schema = mongoose.Schema

const UserSchema: Schema = new Schema({
 
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    unique: true,
    maxlength: 50,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true
  },
  role: {
    type: String,
    enum: [roles.admin, roles.moderator, roles.client],
    default: roles.client,
    required:true
  },
  refreshJWT: {
    token: {
      type: String,
      maxlength: 500,
      default: "",
    },
    addedAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  }
  
  
});

export default model<IUser>("User", UserSchema);