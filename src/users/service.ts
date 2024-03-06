import { InvalidArgumentError } from "../common/service_errors";
import { User, PartialUser, createUserSchema, updateUserSchema } from "./model";
import Repository from "./repository";

async function createOne(user: User): Promise<User> {
  const { value, error } = createUserSchema.validate(user);

  if (error) {
    throw error;
  }

  if (await Repository.getOneBy("email", value.email)) {
    throw new InvalidArgumentError("This email is already taken.");
  }

  return await Repository.createOne(value);
}

async function getOne(id: Number): Promise<User | null> {
  return await Repository.getOne(id);
}

async function getAll(): Promise<Array<User>> {
  return await Repository.getAll();
}

async function updateOne(id: Number, user: PartialUser): Promise<User | null> {
  const { value, error } = updateUserSchema.validate(user);
  if (error) {
    throw error;
  }

  if (await Repository.getOneBy("email", value.email)) {
    throw new InvalidArgumentError("This email is already taken.");
  }

  return await Repository.updateOne(id, value);
}

async function deleteOne(id: Number): Promise<Number | null> {
  return await Repository.deleteOne(id);
}

export default { createOne, getOne, getAll, updateOne, deleteOne };
