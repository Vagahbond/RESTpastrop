import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { UserRole } from "../../users/model";
import { UnauthorizedError } from "../service_errors";

export default function authorize(roles: Array<UserRole>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (roles.includes(req.auth?.urole) || req.auth?.urole == "admin") {
      next();
    } else {
      throw new UnauthorizedError();
    }
  };
}
