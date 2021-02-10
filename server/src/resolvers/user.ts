import argon2 from "argon2";
import { User } from "../entities/User";
import {
  Resolver,
  Field,
  ObjectType,
  Mutation,
  Arg,
  InputType,
  Query,
  Int,
} from "type-graphql";
import { validateRegister } from "../utils/validateRegister";
import { validateLogin } from "src/utils/validateLogin";

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class RegisterInput {
  @Field(() => String)
  username!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  usernameOrEmail!: string;
  @Field(() => String)
  password!: string;
  @Field(() => Boolean)
  rememberMe!: boolean;
}

@Resolver(User)
export class UserResolver {
  @Query(() => UserResponse)
  async user(@Arg("id", () => Int) id: number): Promise<UserResponse> {
    const user = await User.findOne(id);
    if (!user) {
      return {
        errors: [
          {
            field: "id",
            message: "user not found",
          },
        ],
      };
    } else {
      return { user };
    }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("inputs") inputs: RegisterInput // add req context when creating a session
  ): Promise<UserResponse> {
    const errors = validateRegister(inputs); // TODO add field validation
    if (errors) {
      return { errors };
    }

    const userIfUsernameExists = await User.findOne({
      username: inputs.username,
    });
    const userIfEmailExists = await User.findOne({ email: inputs.email });

    if (userIfUsernameExists) {
      return {
        errors: [
          {
            field: "username",
            message: "a user with that username already exists",
          },
        ],
      };
    }
    if (userIfEmailExists) {
      return {
        errors: [
          {
            field: "email",
            message: "a user with that email already exists",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(inputs.password);
    const userCreationInputs = {
      username: inputs.username,
      password: hashedPassword,
      email: inputs.email,
    };

    const user = await User.create(userCreationInputs).save();
    if (!user) {
      return {
        errors: [
          {
            field: "unknown",
            message: "an error occured in creation",
          },
        ],
      };
    }
    // create session at this point ie. log the user in
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(@Arg("inputs") inputs: LoginInput): Promise<UserResponse> {
    const errors = validateLogin(inputs);
    if (errors) {
      return errors;
    }

    let user;

    if (inputs.usernameOrEmail.includes("@")) {
      user = await User.findOne({ email: inputs.usernameOrEmail });
    } else {
      user = await User.findOne({ username: inputs.usernameOrEmail });
    }

    if (!user) {
      return {
        errors: [
          {
            field: "username or email",
            message: "user with the given credentials does not exist",
          },
        ],
      };
    }
    const passwordCorrect = await argon2.verify(user.password, inputs.password);
    // should send back some sort of counter that checks the number of failed attempts
    // might be better to track this on frontend
    if (!passwordCorrect) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    // create session here
    // check if rememberMe, create session, else dont sent cookie and save session
    return { user };
  }
}
