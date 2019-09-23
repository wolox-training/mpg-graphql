const { gql } = require('apollo-server');

module.exports = gql`
  input UserInput {
    name: String!
    lastname: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
`;
