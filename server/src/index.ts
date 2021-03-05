import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { Seller } from "./entities/Seller";
import { Buyer } from "./entities/Buyer";
import { Item } from "./entities/Item";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ItemResolver } from "./resolvers/item";
import { SellerResolver } from "./resolvers/seller";
import { BuyerResolver } from "./resolvers/buyer";
import session from "express-session";
import { sqlOptions } from "./utils/db";
import { COOKIE_NAME, __prod__ } from "./utils/constants";
const MySQLStore = require("express-mysql-session")(session);

// main function, called at startup
(async (): Promise<void> => {
  // access to env vars from .env and docker-compose.yml
  dotenv.config();

  console.log("test");

  // creates the connection to the MySQL database
  const connection = await createConnection({
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [Buyer, Seller, Item],
    synchronize: true,
    logging: true, // true when working w database queries
  });

  // updates the database
  await connection.runMigrations();

  const app = express();

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  // session connection to database
  app.use(
    session({
      name: COOKIE_NAME, // name of the cookie, check constants.ts
      store: new MySQLStore(sqlOptions),
      secret: "inaowiejhfoawjeofi", // TODO change in prod, random string
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // one year expire time
        httpOnly: true,
        sameSite: "lax", // TODO think this has to be changed for prod
        secure: __prod__, // cookie will only work in https if prod
      },
    })
  );

  // server to communicate with Urql client in react.
  // sends graphql data back and forth
  // as we add more data types, items etc
  // add the corrosponding resolvers to the resolver array
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BuyerResolver, SellerResolver, ItemResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  // base endpoint
  app.get("/", (_, res) => {
    // TODO: add a bit of documentation here to send
    // in the base endpoint
    res.send("Welcome to the Jewler-e API");
  });

  app.listen(process.env.PORT, () =>
    console.log("Server running on port: " + process.env.PORT)
  );
})().catch((err) => console.log(err));
