import { Router, Response, Request, NextFunction } from "express";
import authService from "./service.ts";
import { User } from "../users/model.ts";

const controller = Router();

controller.post("/login", (req: Request, res: Response, next: NextFunction) => {
  authService
    .login(req.body)
    .then((token: string) => {
      res.send({
        token,
      });
    })
    .catch((err) => {
      next(err);
    });
});

controller.post(
  "/register",
  (req: Request, res: Response, next: NextFunction) => {
    authService
      .register(req.body as User)
      .then((data: User) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  },
);

export default controller;
