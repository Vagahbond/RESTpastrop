import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import errorHandlingMiddleware from "./common/middlewares/error_middleware";
import locationsController from "./locations/controller";
import usersController from "./users/controller";
import reservationsController from "./reservations/controller";
import idParamGuard from "./common/middlewares/id_param_guard_middleware";
import swaggerUI from "swagger-ui-express";
import { specs } from "./common/swagger_handler";

const app = express();
const port = 80;

app.use("/doc", swaggerUI.serve);
app.get("/doc", swaggerUI.setup(specs, { explorer: true }));

// Parse json body into object
app.use(bodyParser.json());

// Refuse non-numeric ids in params
app.use("/*/[1-9]+$", idParamGuard);

/**
 * @openapi
 * /:
 *   get:
 *     summary: gets a welcoming message
 *     tags: []
 *     responses:
 *       200:
 *         description: Welcoming message and list of available routes
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              required:
 *                - message
 *                - routes
 *              properties:
 *                message:
 *                  type: string
 *                  description: A welcoming message
 *                routes:
 *                  type: array
 *                  description: list of the routes that exist
 *              example:
 *                message: "Welcome to RESTpastrop API!"
 *                routes:
 *                  - /auth
 *                  - /users
 *                  - /locations
 *                  - /reservations
 */
app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to RESTpastrop API!",
    routes: ["/users", "/auth", "/locations", "/reservations"],
  });
});

app.use("/locations", locationsController);
app.use("/users", usersController);
app.use("/reservations", reservationsController);

app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
