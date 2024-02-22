import Joi from "joi";

export const createLocationSchema = Joi.object({
  owner: Joi.number().integer().positive().required(),
  area: Joi.number().integer().positive().required(),
  address: Joi.string().required(),
  capacity: Joi.number().integer().positive().required(),
  price: Joi.number().positive().required(),
  available: Joi.bool().required(),
});

export const updateLocationSchema = Joi.object({
  owner: Joi.number().integer().positive().optional(),
  area: Joi.number().integer().positive().optional(),
  address: Joi.string().optional(),
  capacity: Joi.number().integer().positive().optional(),
  price: Joi.number().positive().optional(),
  available: Joi.bool().optional(),
}).min(1);

export interface Location {
  id?: Number;
  created_at?: Date;
  owner: Number;
  area: Number;
  address: string;
  capacity: Number;
  price: Number;
  available: boolean;
}

export interface PartialLocation {
  owner?: Number;
  area?: Number;
  address?: string;
  capacity?: Number;
  price?: Number;
  available?: boolean;
}
