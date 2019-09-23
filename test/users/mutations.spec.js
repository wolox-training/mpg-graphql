const { mutate } = require('../server.spec'),
  { createUser } = require('./graphql'),
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
  });
});
