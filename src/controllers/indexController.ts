import  createHttpError, {InternalServerError} from 'http-errors';
import { RequestHandler } from "express";

export const index: RequestHandler = async (req, res, next) => {
  res.send('Hello World!!!');
}