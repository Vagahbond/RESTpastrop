import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../http_errors";
import { ValidationError } from "joi";

export default function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!err) {
    next();
  }

  console.error(err);

  if (err instanceof HTTPError) {
    res.status(err.status).json({
      message: err.message,
    });
  } else if (err instanceof ValidationError) {
    res.status(400).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
}
