import { User } from "../users/model";
import { loginObject, loginSchema } from "./model";
import userService from "../users/service";
import { authError } from "../common/service_errors";

async function login(loginForm: loginObject) {
  const { value, error } = loginSchema.validate(loginForm);

  if (error) {
    throw error;
  }

  if (!(await userService.getOne(userId))) {
    throw new authError("Could not login: unkown email provided");
  }
}

async function register(user: User): Promise<User> {
  user.role = "customer";

  return await userService.createOne(user);
}

export default { login, register };
