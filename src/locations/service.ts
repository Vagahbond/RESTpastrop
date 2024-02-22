import {
  Location,
  PartialLocation,
  createLocationSchema,
  updateLocationSchema,
} from "./model";
import Repository from "./repository";

async function createOne(location: Location): Promise<Location> {
  const { value, error } = createLocationSchema.validate(location);

  if (error) {
    throw error;
  }

  return await Repository.createOne(value);
}

async function getOne(id: Number): Promise<Location | null> {
  return await Repository.getOne(id);
}

async function getAll(): Promise<Array<Location>> {
  return await Repository.getAll();
}

async function updateOne(
  id: Number,
  location: PartialLocation,
): Promise<Location | null> {
  const { value, error } = updateLocationSchema.validate(location);
  if (error) {
    throw error;
  }

  return await Repository.updateOne(id, value);
}

async function deleteOne(id: Number): Promise<Number | null> {
  return await Repository.deleteOne(id);
}

export default { createOne, getOne, getAll, updateOne, deleteOne };
