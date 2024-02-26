import { Router, Response, Request } from "express";
import Service from "./service";
import { User, PartialUser } from "./model";
import { NotFoundError } from "../common/http_errors";

const controller = Router();

controller.get("/", (_req: Request, res: Response, next: Function) => {
  Service.getAll()
    .then((data: Array<User>) => res.json(data))
    .catch((err: Error) => next(err));
});

controller.get("/:id", (req: Request, res: Response, next: Function) => {
  Service.getOne(Number(req.params.id))
    .then((data: User | null) => {
      if (data === null) {
        throw new NotFoundError(`Could not find user with id ${req.params.id}`);
      }

      res.json(data);
    })
    .catch((err) => next(err));
});

controller.post("/", (req: Request, res: Response, next: Function) => {
  Service.createOne(req.body as User)
    .then((data: User) => {
      res.status(201).json(data);
    })
    .catch((err) => next(err));
});

controller.delete("/:id", (req: Request, res: Response, next: Function) => {
  Service.deleteOne(Number(req.params.id))
    .then((id) => {
      if (id === null) {
        throw new NotFoundError(`Could not find user with id ${req.params.id}`);
      }

      res.status(204).json();
    })
    .catch((err) => next(err));
});

controller.patch("/:id", (req: Request, res: Response, next: Function) => {
  Service.updateOne(Number(req.params.id), req.body as PartialUser)
    .then((data: User | null) => {
      if (data === null) {
        throw new NotFoundError(`Could not find user with id ${req.params.id}`);
      }
      res.status(200).json(data);
    })
    .catch((err) => next(err));
});

export default controller;
