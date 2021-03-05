import argon2 from "argon2";
import { Buyer } from "../entities/Buyer";
import {
  Resolver,
  Field,
  ObjectType,
  Mutation,
  Arg,
  Query,
  Ctx,
} from "type-graphql";
import { COOKIE_NAME } from "../utils/constants";
import { validateRegister } from "../utils/validateRegister";
import { validateLogin } from "../utils/validateLogin";
import { MyContext } from "src/types";
import { RegisterInput, LoginInput } from "./shared/types/inputs";
import FieldError from "./shared/types/FieldError";

@ObjectType()
class BuyerResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Buyer, { nullable: true })
  buyer?: Buyer;
}

@Resolver(Buyer)
export class BuyerResolver {
  @Query(() => Buyer, { nullable: true })
  async meBuyer(@Ctx() { req }: MyContext) {
    // used to get the current user if they are logged in
    const id = req.session.userId;
    if (!id) {
      // user is not logged in, don't send any data
      return null;
    }
    return await Buyer.findOne(id);
  }

  @Query(() => BuyerResponse)
  async buyer(@Arg("id", () => String) id: string): Promise<BuyerResponse> {
    // used to find a user by their id
    const buyer = await Buyer.findOne(id);
    if (!buyer) {
      return {
        errors: [
          {
            field: "id",
            message: "user not found",
          },
        ],
      };
    } else {
      return { buyer };
    }
  }

  @Query(() => BuyerResponse)
  async buyerByUsername(
    @Arg("username", () => String) username: string
  ): Promise<BuyerResponse> {
    const buyer = await Buyer.findOne({ username });
    if (!buyer) {
      return {
        errors: [
          {
            field: "username",
            message: "A user with that username was not found",
          },
        ],
      };
    }
    return { buyer };
  }

  @Mutation(() => BuyerResponse)
  async registerBuyer(
    @Arg("inputs") inputs: RegisterInput, // add req context when creating a session
    @Ctx() { req }: MyContext
  ): Promise<BuyerResponse> {
    const errors = validateRegister(inputs); // TODO add field validation
    if (errors) {
      return { errors };
    }

    const userIfUsernameExists = await Buyer.findOne({
      username: inputs.username,
    });
    const userIfEmailExists = await Buyer.findOne({ email: inputs.email });

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

    const buyer = await Buyer.create(userCreationInputs).save();
    if (!buyer) {
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
    req.session.userId = buyer.id;
    req.session.userType = "buyer";
    return { buyer };
  }

  @Mutation(() => BuyerResponse)
  async loginBuyer(
    @Arg("inputs") inputs: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<BuyerResponse> {
    const errors = validateLogin(inputs);
    if (errors) {
      return errors;
    }

    let buyer;

    if (inputs.usernameOrEmail.includes("@")) {
      buyer = await Buyer.findOne({ email: inputs.usernameOrEmail });
    } else {
      buyer = await Buyer.findOne({ username: inputs.usernameOrEmail });
    }

    if (!buyer) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "user with the given credentials does not exist",
          },
        ],
      };
    }

    const passwordCorrect = await argon2.verify(
      buyer.password,
      inputs.password
    );
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
      req.session.userId = buyer.id;
    }
    req.session.userType = "buyer";
    return { buyer };
  }

  @Mutation(() => Boolean)
  async logoutBuyer(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
        }
        resolve(true);
      });
    });
  }
}
