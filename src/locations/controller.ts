import { Router, Response, Request } from "express";
import Service from "./service";
import { Location, PartialLocation } from "./model";
import { NotFoundError } from "../common/http_errors";
import authorize from "../common/middlewares/authorize_middleware";

const controller = Router();

controller.get("/", (_req: Request, res: Response, next: Function) => {
  Service.getAll()
    .then((data: Array<Location>) => res.json(data))
    .catch((err: Error) => next(err));
});

controller.get("/:id", (req: Request, res: Response, next: Function) => {
  Service.getOne(Number(req.params.id))
    .then((data: Location | null) => {
      if (data === null) {
        throw new NotFoundError(
          `Could not find location with id ${req.params.id}`,
        );
      }

      res.json(data);
    })
    .catch((err) => next(err));
});

controller.post(
  "/",
  authorize(["staff"]),
  (req: Request, res: Response, next: Function) => {
    Service.createOne(req.body as Location)
      .then((data: Location) => {
        res.status(201).json(data);
      })
      .catch((err) => next(err));
  },
);

controller.delete(
  "/:id",
  authorize(["staff", "owner"]),
  (req: Request, res: Response, next: Function) => {
    Service.deleteOne(Number(req.params.id))
      .then((id) => {
        if (id === null) {
          throw new NotFoundError(
            `Could not find location with id ${req.params.id}`,
          );
        }

        res.status(204).json();
      })
      .catch((err) => next(err));
  },
);

controller.patch(
  "/:id",
  authorize(["staff", "owner"]),
  (req: Request, res: Response, next: Function) => {
    Service.updateOne(Number(req.params.id), req.body as PartialLocation)
      .then((data: Location | null) => {
        if (data === null) {
          throw new NotFoundError(
            `Could not find location with id ${req.params.id}`,
          );
        }
        res.status(200).json(data);
      })
      .catch((err) => next(err));
  },
);

export default controller;
