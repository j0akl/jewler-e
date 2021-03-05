import argon2 from "argon2";
import { Seller } from "../entities/Seller";
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
import { MyContext } from "../types";
import { RegisterInput, LoginInput } from "./shared/types/inputs";
import FieldError from "./shared/types/FieldError";

@ObjectType()
class SellerResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Seller, { nullable: true })
  seller?: Seller;
}

@Resolver(Seller)
export class SellerResolver {
  @Query(() => Seller, { nullable: true })
  async meSeller(@Ctx() { req }: MyContext) {
    const id = req.session.userId;
    if (!id) {
      return null;
    }
    return await Seller.findOne(id);
  }

  @Query(() => SellerResponse)
  async seller(@Arg("id", () => String) id: string): Promise<SellerResponse> {
    // used to find a user by their id
    const seller = await Seller.findOne(id);
    if (!seller) {
      return {
        errors: [
          {
            field: "id",
            message: "user not found",
          },
        ],
      };
    } else {
      return { seller };
    }
  }

  @Mutation(() => SellerResponse)
  async registerSeller(
    @Arg("inputs") inputs: RegisterInput, // add req context when creating a session
    @Ctx() { req }: MyContext
  ): Promise<SellerResponse> {
    const errors = validateRegister(inputs); // TODO add field validation
    if (errors) {
      return { errors };
    }

    const userIfUsernameExists = await Seller.findOne({
      username: inputs.username,
    });
    const userIfEmailExists = await Seller.findOne({ email: inputs.email });

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

    const seller = await Seller.create(userCreationInputs).save();
    if (!seller) {
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
    req.session.userId = seller.id;
    req.session.userType = "seller";
    return { seller };
  }

  @Mutation(() => SellerResponse)
  async loginSeller(
    @Arg("inputs") inputs: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<SellerResponse> {
    const errors = validateLogin(inputs);
    if (errors) {
      return errors;
    }

    let seller;

    if (inputs.usernameOrEmail.includes("@")) {
      seller = await Seller.findOne({ email: inputs.usernameOrEmail });
    } else {
      seller = await Seller.findOne({ username: inputs.usernameOrEmail });
    }

    if (!seller) {
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
      seller.password,
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
      req.session.userId = seller.id;
    }
    req.session.userType = "seller";
    return { seller };
  }

  @Mutation(() => Boolean)
  async logoutSeller(@Ctx() { req, res }: MyContext): Promise<Boolean> {
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
