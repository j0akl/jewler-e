import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isSeller: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (context.req.session.userType != "seller") {
    throw new Error("must register for a seller account to sell items");
  }
  return next();
};
