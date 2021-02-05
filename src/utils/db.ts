import { createConnection } from "mysql";

export const sqlOptions = {
  host: "localhost",
  user: "root",
  password: "goober123",
  database: "jewlere",
};

export const sql = createConnection(sqlOptions);
