const express = require("express");
const cors = require("cors");

const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const flights = require("./data.js");
const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');


dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
const server = new ApolloServer({
  typeDefs,
  resolvers
});
async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
  const PORT = 5050;
  app.listen(PORT, () => {
    console.log(`GraphQL API running at
http://localhost:${PORT}${server.graphqlPath}`);
  });
}
startServer();
