import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Item } from "./entities/Item";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";

// CONSTANTS
const PORT: number = 8000;

// main function, called at startup
(async (): Promise<void> => {
  // creates the connection to the MySQL database
  const connection = await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "goober123", // TODO fix in prod
    database: "jewlere",
    entities: [User, Item],
    synchronize: true,
    logging: true,
  });

  // updates the database
  await connection.runMigrations();

  const app = express();

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  // server to communicate with Urql client in react.
  // sends graphql data back and forth
  // as we add more data types, items etc
  // add the corrosponding resolvers to the resolver array
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
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

  app.listen(PORT, () => console.log("Server running on port: " + PORT));
})().catch((err) => console.log(err));
