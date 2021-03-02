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
  Ctx,
} from "type-graphql";
import { COOKIE_NAME } from "../utils/constants";
import { validateRegister } from "../utils/validateRegister";
import { validateLogin } from "../utils/validateLogin";
import { MyContext } from "src/types";
import FieldError from "./FieldError"

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
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // used to get the current user if they are logged in
    const id = req.session.userId;
    if (!id) {
      // user is not logged in, don't send any data
      return null;
    }
    return await User.findOne(id, { relations: ["items"] });
  }

  @Query(() => UserResponse)
  async user(@Arg("id", () => Int) id: number): Promise<UserResponse> {
    // used to find a user by their id
    const user = await User.findOne(id, { relations: ["items"] });
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

  @Query(() => UserResponse)
  async userByUsername(
    @Arg("username", () => String) username: string
  ): Promise<UserResponse> {
    const user = await User.findOne({ username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "A user with that username was not found",
          },
        ],
      };
    }
    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("inputs") inputs: RegisterInput, // add req context when creating a session
    @Ctx() { req }: MyContext
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
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("inputs") inputs: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
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
    if (inputs.rememberMe) {
      req.session.userId = user.id;
    }
    return { user };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve) => {
      req.session.destroy(err => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
        }
        resolve(true);
      })
    })
  }
}
