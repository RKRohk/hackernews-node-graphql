const { GraphQLServer,PubSub } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require("./resolvers/Subscription")
const Vote = require('./resolvers/Vote')
const prisma = new PrismaClient();
const pubsub = new PubSub()
const express = require('express')
const path = require('path')

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      pubsub,
      prisma,
    };
  },
});

server.express.use(express.static(path.join(__dirname,'../build')))
server.express.get("/*",(req,res,next) => {
  console.log("HI")
  res.sendFile(path.join(__dirname,"../","build/index.html"))
})
const options = {
  endpoint:'/graphql',
  subscriptions:'/subscriptions',
  playground:'/playground'
}

server.start(options,options => console.log("Server is running on http://localhost:4000"));
