import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import errorHandlingMiddleware from "./common/middlewares/error_middleware";
import locationsController from "./locations/controller";
import idParamGuard from "./common/middlewares/id_param_guard_middleware";

const app = express();
const port = 80;

app.use(bodyParser.json());

app.use("/*/:id", idParamGuard);

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to RESTpastrop API!",
    routes: ["/users", "/auth", "/locations", "/reservations"],
  });
});

app.use("/locations", locationsController);

app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
