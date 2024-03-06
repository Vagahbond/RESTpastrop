/**
 * @openapi
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - owner
 *         - area
 *         - address
 *         - capacity
 *         - price
 *         - available
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a location
 *         created_at:
 *           type: date
 *           description: date of creation of the location
 *         owner:
 *           type: integer
 *           description: ID of the owner of the place
 *         area:
 *           type: integer
 *           description: area of the place in square meters
 *         address:
 *           type: string
 *           description: address where it's located
 *         capacity:
 *           type: integer
 *           description: nb of people that can live there
 *         price:
 *           type: float
 *           description: price for a night in the location
 *         available:
 *           type: boolean
 *           description: whether the place is available to rent or not
 *
 *       example:
 *         id: 1
 *         created_at: 2024-02-24T01:34:12.891Z
 *         owner: 1
 *         area: 16
 *         address: 15 rue des coquelicots
 *         capacity: 2
 *         price: $120.50
 *         available: true
 *
 */

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
  id: Number;
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
