const { ApolloServer, gql } = require('apollo-server');

const schema = gql`
  type Query {
    products(search: String): [Product!]
    customer: [Customer]
  }
  type Product {
    name: String!
  }
  type Customer {    
    fullname: String
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

let customerdata = [
  {
    firstname: 'Luke',
    lastname: 'Skywalker',
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

    customer: () => {
      return customerdata;
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
