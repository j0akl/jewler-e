import express from "express";

// CONSTANTS
const PORT: number = 8000;

// main function, called at startup
(async (): Promise<void> => {
  const app = express();

  // base endpoint
  app.get("/", (_, res) => {
    // TODO: add a bit of documentation here to send
    // in the base endpoint
    res.send("Welcome to the Jewler-e API");
  });

  app.listen(PORT, () => console.log("Server running on port: " + PORT));
})().catch((err) => console.log(err));
