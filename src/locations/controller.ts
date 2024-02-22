import { Router, Response, Request } from "express";
import service from "./service";
import location from "./location";

const controller = Router();

controller.get("/", (req: Request, res: Response) => {
  res.send("getting all of the appartments");
});

controller.get("/:id", (req: Request, res: Response) => {
  res.send(`Getting the appartment with ID ${req.params.id}`);
});

controller.post("/", async (req: Request, res: Response) => {
  res.send(await service.createOne(req.body as location));
});

export default controller;
