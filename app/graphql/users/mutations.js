const { gql } = require('apollo-server'),
  { createNewUser, signIn } = require('./resolvers');

module.exports = {
  mutations: {
    createUser: createNewUser,
    login: signIn
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User! @validateSchema(schema: "signUp")
      login(credentials: LoginInput!): AccessToken! @validateSchema(schema: "signIn")
    }
  `
};
