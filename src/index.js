const { ApolloServer, gql } = require('apollo-server');

// TODO fill with value
// const schema = null;
const schema = gql`
  type Query {
    product: Product
  }
  type Product {
    name: String!
  }`;
  
// TODO fill with value
const resolvers = null;

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
