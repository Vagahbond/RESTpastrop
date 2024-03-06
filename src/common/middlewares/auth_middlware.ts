import { expressjwt as jwt } from "express-jwt";
import { Request, Response } from "express";

export default jwt({
  secret: "secret",
  algorithms: ["HS256"],
  credentialsRequired: false,
});
