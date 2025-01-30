const { ApolloServer, gql } = require('apollo-server');

const schema = gql`
  type Query {
    products(id: ID, search: String): [Product!]
    customer(id: ID!): [Customer]
  }
  interface Node {
    id: ID!
  }
  type Product implements Node {
    id: ID!
    name: String!
  }
  type Customer implements Node {
    id: ID!
    fullname: String
  }
`;

let productdata = [
  {
    id: '1',
    name: 'Kartoffel',
  },
  {
    id: '2',
    name: 'Pasta',
  },
];

let customerdata = [
  {
    id: '1',
    firstname: 'Stefan',
    lastname: 'Jaroni',
  },
];

const resolvers = {
  Query: {
    products: (parent, { id, search }) => {
      if (id) {
        return productdata.filter((p) => p.id == id);
      }
      if (search) {
        return productdata.filter((p) => p.name.includes(search));
      }
      return productdata;
    },

    customer: (parent, { id }) => {
      return customerdata.find((c) => c.id == id);
    },
  },

  Node: {
    __resolveType(node) {
      if (node.toObject().name) {
        return 'Product';
      }
      if (node.toObject().fullname) {
        return 'Customer';
      }
    },
  },
  Customer: {
    fullname: (customer) => `${customer.firstname} ${customer.lastname}`,
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
