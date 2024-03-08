import { Issuer } from "../auth/model";
import {
  InvalidArgumentError,
  UnauthorizedError,
} from "../common/service_errors";
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

  const newUser = await Repository.createOne(value);

  return { ...newUser, password: "[redacted]" };
}

async function getOne(id: Number, issuer: Issuer): Promise<User | null> {
  if (["customer", "owner"].includes(issuer.role) && issuer.id != id) {
    throw new UnauthorizedError("You can only see your own account.");
  }

  const user = await Repository.getOne(id);
  if (user) {
    return { ...user, password: "[redacted]" };
  } else return user;
}

async function getAll(): Promise<Array<User>> {
  const users = await Repository.getAll();
  return users.map((user) => {
    return { ...user, password: "[redacted]" };
  });
}

async function updateOne(
  id: Number,
  user: PartialUser,
  issuer: Issuer,
): Promise<User | null> {
  if (["customer", "owner"].includes(issuer.role) && issuer.id != id) {
    throw new UnauthorizedError("You can only update your own account.");
  }

  if (["customer", "owner"].includes(issuer.role) && user.role) {
    throw new UnauthorizedError("You cannot change your role.");
  }

  if (issuer.role === "staff" && user.role === "admin") {
    throw new UnauthorizedError("Only admins can create admins.");
  }

  if (
    issuer.role === "staff" &&
    (await Repository.getOne(id))?.role === "admin"
  ) {
    throw new UnauthorizedError("Staff cannot downgrade admins.");
  }

  const { value, error } = updateUserSchema.validate(user);
  if (error) {
    throw error;
  }

  if (await Repository.getOneBy("email", value.email)) {
    throw new InvalidArgumentError("This email is already taken.");
  }
  const newUser = await Repository.updateOne(id, value);

  if (newUser) {
    return { ...newUser, password: "[redacted]" };
  }

  return newUser;
}

async function deleteOne(id: Number, issuer: Issuer): Promise<Number | null> {
  if (["customer", "owner"].includes(issuer.role) && issuer.id != id) {
    throw new UnauthorizedError("You can only delete your own account.");
  }

  if ((await Repository.getOne(id))?.role == "admin") {
    throw new UnauthorizedError("You cannot delete an admin's account.");
  }

  return await Repository.deleteOne(id);
}

export default { createOne, getOne, getAll, updateOne, deleteOne };
