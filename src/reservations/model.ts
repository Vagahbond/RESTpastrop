/**
 * @openapi
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - location
 *         - customer
 *         - date_start
 *         - date_end
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a reservation
 *         created_at:
 *           type: date
 *           description: date of creation of the reservation
 *         location:
 *           type: integer
 *           description: ID of the rented location
 *         customer:
 *           type: integer
 *           description: ID of the customer that took this reservation
 *         date_start:
 *           type: date
 *           description: Date at which the reservation starts
 *         date_end:
 *           type: date
 *           description: Date at which the reservation ends
 *         price:
 *           type: float
 *           description: price for a night in the reservation (defaults to location's price)
 *
 *       example:
 *         id: 1
 *         created_at: 2024-02-24T01:34:12.891Z
 *         location: 1
 *         customer: 1
 *         date_start: 2024-02-24T01:34:12.891Z
 *         date_end: 2024-05-24T01:34:12.891Z
 *         price: $120.50
 *
 */

import Joi from "joi";

export const createReservationSchema = Joi.object({
  location: Joi.number().integer().positive().required(),
  date_start: Joi.date().greater("now").required(),
  date_end: Joi.date().greater(Joi.ref("date_start")).required(),
  price: Joi.number().positive().optional(),
});

export const updateReservationSchema = Joi.object({
  date_start: Joi.date().greater("now").optional(),
  date_end: Joi.date().greater(Joi.ref("date_start")).optional(),
  price: Joi.number().positive().optional(),
}).min(1);

export interface Reservation {
  id?: Number;
  created_at?: Date;
  location: Number;
  customer: Number;
  date_start: Date;
  date_end: Date;
  price: Number;
}

export interface PartialReservation {
  location?: Number;
  customer?: Number;
  date_start?: Date;
  date_end?: Date;
  price?: Number;
}
