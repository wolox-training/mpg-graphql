const { gql } = require('apollo-server');

const getUser = id => gql`
    query {
        user(id: ${id}) {
          name,
          lastname,
          email
        }
      }`;

const getUsers = () => gql`
  query {
    users {
      name
      lastname
      email
    }
  }
`;

const createUser = userInput => ({
  mutation: gql`
    mutation createUser($userInput: UserInput!) {
      createUser(user: $userInput) {
        name
        lastname
        password
        email
        id
      }
    }
  `,
  variables: { userInput }
});

const login = credentials => ({
  mutation: gql`
    mutation login($credentials: LoginInput!) {
      login(credentials: $credentials) {
        accessToken
      }
    }
  `,
  variables: { credentials }
});

module.exports = { getUser, getUsers, createUser, login };
