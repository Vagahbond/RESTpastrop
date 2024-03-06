import { Router, Response } from "express";
import Service from "./service";
import { User, PartialUser } from "./model";
import { NotFoundError } from "../common/http_errors";
import authorize from "../common/middlewares/authorize_middleware";
import { Request } from "express-jwt";

const controller = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: a list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
controller.get(
  "/",
  authorize(["staff"]),
  (_req: Request, res: Response, next: Function) => {
    Service.getAll()
      .then((data: Array<User>) => res.json(data))
      .catch((err: Error) => next(err));
  },
);

/**
 * @swagger
 * /users/:id:
 *   get:
 *     description: Get one user
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *       404:
 *         description: Required user does not exist
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/NotFoundError'
 *
 */
controller.get(
  "/:id",
  authorize(["staff", "customer", "owner"]),
  (req: Request, res: Response, next: Function) => {
    Service.getOne(Number(req.params.id), {
      id: req.auth?.uid,
      role: req.auth?.urole,
    })
      .then((data: User | null) => {
        if (data === null) {
          throw new NotFoundError(
            `Could not find user with id ${req.params.id}`,
          );
        }

        res.json(data);
      })
      .catch((err) => next(err));
  },
);

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: A new user's data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/ValidationError'
 */
controller.post(
  "/",
  authorize([]),
  (req: Request, res: Response, next: Function) => {
    Service.createOne(req.body as User)
      .then((data: User) => {
        res.status(201).json(data);
      })
      .catch((err) => next(err));
  },
);

/**
 * @swagger
 * /users/:id:
 *   delete:
 *     description: Delete a user
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *       404:
 *         description: Required user does not exist
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/NotFoundError'
 *
 */
controller.delete(
  "/:id",
  authorize(["owner", "customer", "staff"]),
  (req: Request, res: Response, next: Function) => {
    Service.deleteOne(Number(req.params.id), {
      id: req.auth?.uid,
      role: req.auth?.urole,
    })
      .then((id) => {
        if (id === null) {
          throw new NotFoundError(
            `Could not find user with id ${req.params.id}`,
          );
        }

        res.status(204).json();
      })
      .catch((err) => next(err));
  },
);

/**
 * @swagger
 * /users/:id:
 *   patch:
 *     description: Modify a user
 *     tags: [Users]
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: A new user's data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     parameters:
 *       - name: id
 *         description: User's ID.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User created
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/User'
 *       404:
 *         description: Required user does not exist
 *         content:
 *           application/json:
 *             type: object
 *             $ref: '#/components/schemas/NotFoundError'
 *
 */
controller.patch(
  "/:id",
  authorize(["owner", "customer", "staff"]),
  (req: Request, res: Response, next: Function) => {
    Service.updateOne(Number(req.params.id), req.body as PartialUser, {
      id: req.auth?.uid,
      role: req.auth?.urole,
    })
      .then((data: User | null) => {
        if (data === null) {
          throw new NotFoundError(
            `Could not find user with id ${req.params.id}`,
          );
        }
        res.status(200).json(data);
      })
      .catch((err) => next(err));
  },
);

export default controller;
