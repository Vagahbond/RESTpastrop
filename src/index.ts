import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import db from "./common/db_handler";

import locationsController from "./locations/controller";

const app = express();
const port = 80;

app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response) => {
  res.send({
    message: "Welcome to RESTpastrop API!",
    routes: ["/users", "/auth", "/locations", "/reservations"],
  });
});

app.use("/locations", locationsController);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
