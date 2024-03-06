import Joi from "joi";

export interface loginObject {
  email: string;
  pasword: string;
}

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
