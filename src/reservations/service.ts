import {
  Reservation,
  PartialReservation,
  createReservationSchema,
  updateReservationSchema,
} from "./model";
import Repository from "./repository";

import locationService from "../locations/service";
import { InvalidArgumentError } from "../common/service_errors";

async function createOne(reservation: Reservation): Promise<Reservation> {
  const { value, error } = createReservationSchema.validate(reservation);

  if (error) {
    throw error;
  }

  const location = await locationService.getOne(reservation.location);

  if (!location) {
    throw new InvalidArgumentError(
      "The location you're looking to reserve does not exist.",
    );
  }

  if (!value.location) {
    throw new InvalidArgumentError(
      "The location you're looking to reserve is not available for now.",
    );
  }

  const overlapping = await Repository.getOverlappingReservations(
    value.date_start,
    value.date_end,
    value.location,
  );

  if (overlapping.length) {
    throw new InvalidArgumentError(
      "This interval is not available. Please try another.",
    );
  }
  return await Repository.createOne(value);
}

async function getOne(id: Number): Promise<Reservation | null> {
  return await Repository.getOne(id);
}

async function getAll(): Promise<Array<Reservation>> {
  return await Repository.getAll();
}

async function updateOne(
  id: Number,
  reservation: PartialReservation,
): Promise<Reservation | null> {
  const { value, error } = updateReservationSchema.validate(reservation);

  if (error) {
    throw error;
  }

  const overlapping = await Repository.getOverlappingReservations(
    value.date_start,
    value.date_end,
    value.location,
  );

  if (overlapping.length) {
    throw new InvalidArgumentError(
      "This interval is not available. Please try another.",
    );
  }

  return await Repository.updateOne(id, value);
}

async function deleteOne(id: Number): Promise<Number | null> {
  return await Repository.deleteOne(id);
}

export default { createOne, getOne, getAll, updateOne, deleteOne };
