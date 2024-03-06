import Joi from "joi";

export interface loginObject {
  email: string;
  pasword: string;
}

export interface registerObject {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
});
