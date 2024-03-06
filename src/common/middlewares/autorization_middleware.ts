import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../users/model";

export default function authorize(roles: Array<UserRole>) {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
}
