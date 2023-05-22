import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { NextFunction, Response } from "express";
import { IUser, IUserJwtPayload, IUserRequest } from "../interfaces";



export const protect = asyncHandler(
  async (req: IUserRequest<IUser>, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded: IUserJwtPayload = <IUserJwtPayload>(
          jwt.verify(token, process.env.JWT_SECRET)
        );
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
