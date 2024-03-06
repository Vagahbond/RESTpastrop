import jwt from "jsonwebtoken";
import { UserRole } from "../users/model";

export default function generateJWT(userId: Number, role: UserRole) {
  return jwt.sign(
    {
      uid: userId,
      urole: role,
    },
    "secret",
  );
}
