const functions = require("firebase-functions");
const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const {GraphQLSchema} = require("graphql");
const {GraphQLObjectType} = require("graphql");
const cors = require("cors");
const GetProductLists = require("./Query/ProductLists");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    ProductLists: GetProductLists,
  },
});

// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({
  query: Query,
});


const app = express();
app.use(cors({origin: "*"}));
app.use("/", graphqlHTTP({
  schema,
  graphiql: true,
}));

exports.graphql = functions.region("asia-southeast2").https.onRequest(app);
