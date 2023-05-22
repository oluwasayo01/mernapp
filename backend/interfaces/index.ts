import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  matchPassword?: (password: string) => boolean;
}

export interface IUserRequest<T> extends Request {
  user?: T;
}

export interface IUserJwtPayload extends JwtPayload {
  userId?: string;
}
