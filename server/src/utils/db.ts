import { createConnection } from "mysql";
import * as dotenv from "dotenv";

dotenv.config();

export const sqlOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
};

export const sql = createConnection(sqlOptions);
