import { Request, Response } from "express";
import { Session } from "express-session";
export type MyContext = {
  req: Request & {
    session: Session & { userId?: string; userType?: "seller" | "buyer" };
  }; // add session later
  res: Response;
};
