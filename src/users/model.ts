/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - role
 *         - email
 *         - password
 *         - first_name
 *         - last_name
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a user
 *         created_at:
 *           type: date
 *           description: date of creation of the user
 *         role:
 *           type: enum("admin", "customer", "staff", "owner")
 *           description: Role provided to the user, defining their rights
 *         email:
 *           type: string
 *           description: EMail for the user
 *         password:
 *           type: string
 *           description: user's password
 *         first_name:
 *           type: string
 *           description: first name of the user
 *         second_name:
 *           type: string
 *           description: second name for the user
 *
 *       example:
 *         id: 1
 *         created_at: 2024-02-24T01:34:12.891Z
 *         role: "admin"
 *         email: "admin@mail.me"
 *         password: "7O563V45N8WPER498RNYVQOGWOFHOCU8W3"
 *         first_name: "George"
 *         last_name: "Abitbol"
 *
 */

import Joi from "joi";

export type UserRole = "admin" | "customer" | "owner" | "staff";

export const createUserSchema = Joi.object({
  role: Joi.string()
    .valid("admin", "customer", "owner", "staff")
    .default("customer"),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  role: Joi.string().valid("admin", "customer", "owner", "staff").optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
}).min(1);

export interface User {
  id: Number;
  created_at?: Date;
  role: UserRole;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface PartialUser {
  role: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
