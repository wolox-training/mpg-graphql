const { mutate } = require('../server.spec'),
  { createUser, login } = require('./graphql'),
  userFactory = require('../factories/user');

describe('users', () => {
  describe('mutations', () => {
    it('should create an user successfuly', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(res => {
          const { name, lastname, email, password, id } = res.data.createUser;
          expect(name).toEqual(`${user.name} ${user.lastname}`);
          expect(lastname).toEqual(user.lastname);
          expect(email).toEqual(user.email);
          expect(password).toBeDefined();
          expect(id).toBeDefined();
        })
      ));
    it('should login an user successfuly', () => {
      const password = 'pass1234';
      return userFactory.create({ password }).then(user => {
        const { email } = user;
        return mutate(login({ email, password })).then(res => {
          const { accessToken } = res.data.login;
          expect(accessToken).toBeDefined();
        });
      });
    });
  });
});
