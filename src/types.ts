import { Request, Response } from "express";
export type MyContext = {
  req: Request; // & {session: Express.session} // add session later
  res: Response;
};
