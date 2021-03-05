import { LoginInput } from "../resolvers/shared/types/inputs";

// TODO add more validation if necessary
export const validateLogin = (inputs: LoginInput) => {
  if (!inputs.usernameOrEmail) {
    return {
      errors: [
        {
          field: "username or email",
          message: "enter a username or email",
        },
      ],
    };
  }
  if (!inputs.password) {
    return {
      errors: [
        {
          field: "password",
          message: "enter a password",
        },
      ],
    };
  }
  return null;
};
