import { Router, Response, Request } from "express";
import userService from "../users/service";

const controller = new Router();

controller.post("/login", (req: Request, res: Response) => {
  res.json({
    token: "aaaaaaa",
  });
});
