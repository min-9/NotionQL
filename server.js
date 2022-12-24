import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './schema/index.js';

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const { url } = await server.listen();

console.log(`Running server on ${url}`);
