import { RegisterInput } from "src/resolvers/shared/types/inputs";

export const validateRegister = (inputs: RegisterInput) => {
  if (!inputs.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email address",
      },
    ];
  }
  if (inputs.username.length < 3) {
    return [
      {
        field: "username",
        message: "username must be longer than 3 characters",
      },
    ];
  }
  if (inputs.username.includes("@")) {
    // TODO: update this condition to include all special chars
    return [
      {
        field: "username",
        message: "username cannot contain @",
      },
    ];
  }

  return null;
};
