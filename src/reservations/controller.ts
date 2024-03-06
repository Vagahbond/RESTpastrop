import { Router, Response, Request } from "express";
import Service from "./service";
import { Reservation, PartialReservation } from "./model";
import { NotFoundError } from "../common/http_errors";
import authorize from "../common/middlewares/authorize_middleware";

const controller = Router();

controller.get(
  "/",
  authorize(["staff", "customer", "owner"]),
  (_req: Request, res: Response, next: Function) => {
    Service.getAll()
      .then((data: Array<Reservation>) => res.json(data))
      .catch((err: Error) => next(err));
  },
);

controller.get(
  "/:id",
  authorize(["staff", "customer", "owner"]),
  (req: Request, res: Response, next: Function) => {
    Service.getOne(Number(req.params.id))
      .then((data: Reservation | null) => {
        if (data === null) {
          throw new NotFoundError(
            `Could not find reservation with id ${req.params.id}`,
          );
        }

        res.json(data);
      })
      .catch((err) => next(err));
  },
);

controller.post("/", (req: Request, res: Response, next: Function) => {
  Service.createOne(req.body as Reservation)
    .then((data: Reservation) => {
      res.status(201).json(data);
    })
    .catch((err) => next(err));
});

controller.delete(
  "/:id",
  authorize(["staff", "owner", "customer"]),
  (req: Request, res: Response, next: Function) => {
    Service.deleteOne(Number(req.params.id))
      .then((id) => {
        if (id === null) {
          throw new NotFoundError(
            `Could not find reservation with id ${req.params.id}`,
          );
        }

        res.status(204).json();
      })
      .catch((err) => next(err));
  },
);

controller.patch(
  "/:id",
  authorize(["staff", "owner", "customer"]),
  (req: Request, res: Response, next: Function) => {
    Service.updateOne(Number(req.params.id), req.body as PartialReservation)
      .then((data: Reservation | null) => {
        if (data === null) {
          throw new NotFoundError(
            `Could not find reservation with id ${req.params.id}`,
          );
        }
        res.status(200).json(data);
      })
      .catch((err) => next(err));
  },
);

export default controller;
