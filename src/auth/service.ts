import { User } from "../users/model";
import {
  loginObject,
  loginSchema,
  registerObject,
  registerSchema,
} from "./model";
import userRepository from "../users/repository";
import { AuthError, InvalidArgumentError } from "../common/service_errors";

async function login(loginForm: loginObject) {
  const { value, error } = loginSchema.validate(loginForm);

  if (error) {
    throw error;
  }

  const user: User = await userRepository.getOneBy("email", value.email);

  if (!user) {
    throw new AuthError("Could not login: unkown email provided");
  }

  // verify password
}

async function register(user: registerObject): Promise<User> {
  const { value, error } = registerSchema.validate(user);

  if (error) {
    throw error;
  }

  if (await userRepository.getOneBy("email", value.email)) {
    throw new InvalidArgumentError("This email is already taken.");
  }

  return await userRepository.createOne({ ...value, role: "customer" });
}

export default { login, register };
