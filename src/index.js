const { ApolloServer, gql } = require('apollo-server');

const schema = gql`
  type Query {
    products(search: String): [Product!]
  }
  type Product {
    name: String!
  }
`;

let productdata = [
  {
    name: 'Kartoffel',
  },
  {
    name: 'Pasta',
  },
];

const resolvers = {
  Query: {
    products: (parent, { search }) => {
      if (search) {
        return productdata.filter((p) => p.name.includes(search));
      }
      return productdata;
    },
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
