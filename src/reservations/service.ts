import {
  Reservation,
  PartialReservation,
  createReservationSchema,
  updateReservationSchema,
} from "./model";
import Repository from "./repository";

async function createOne(reservation: Reservation): Promise<Reservation> {
  const { value, error } = createReservationSchema.validate(reservation);

  if (error) {
    throw error;
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

  return await Repository.updateOne(id, value);
}

async function deleteOne(id: Number): Promise<Number | null> {
  return await Repository.deleteOne(id);
}

export default { createOne, getOne, getAll, updateOne, deleteOne };
