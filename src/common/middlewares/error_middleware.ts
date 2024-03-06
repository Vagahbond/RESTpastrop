import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../http_errors";
import { ValidationError } from "joi";
import { InvalidArgumentError, AuthError } from "../service_errors";
import { UnauthorizedError as JWTUnauthorizedError } from "express-jwt";
import { UnauthorizedError } from "../service_errors";

export default function errorHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!err) {
    next();
  }

  if (err instanceof HTTPError) {
    res.status(err.status).json({
      message: err.message,
    });
  } else if (err instanceof ValidationError) {
    res.status(400).json({
      message: err.message,
    });
  } else if (err instanceof InvalidArgumentError) {
    res.status(400).json({
      message: err.message,
    });
  } else if (err instanceof SyntaxError) {
    res.status(400).json({
      message: err.message,
    });
  } else if (err instanceof AuthError) {
    res.status(401).json({
      message: err.message,
    });
  } else if (
    err instanceof UnauthorizedError ||
    err instanceof JWTUnauthorizedError
  ) {
    res.status(403).json({
      message: err.message,
    });
  } else {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });

    console.error(err);
  }
}
