require("dotenv").config();

import express from "express";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import schema from "./schema";

const PORT = 4000;
const app = express();

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP(async req => ({
    schema,
    graphiql: true,
    context: req
  }))
);

app.listen(PORT, _ => {
  console.log(`GraphQL server running on port :: ${PORT}`);
});
