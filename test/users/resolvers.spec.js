const userFactory = require('../factories/user'),
  { mutations } = require('../../app/graphql/users/mutations'),
  DUPLICATE_EMAIL_ERROR = 409,
  INVALID_PASSWORD_ERROR = 422,
  USER_SIGNIN_ERROR = 401;

describe('users', () => {
  describe('resolvers', () => {
    describe('createUser', () => {
      it('should create an user successfuly', async () => {
        const user = await userFactory.build();
        return mutations.createUser({}, { user: user.dataValues }).then(res => {
          expect(res.dataValues).toHaveProperty('id');
          expect(res.dataValues).toHaveProperty('name');
          expect(res.dataValues).toHaveProperty('lastname');
          expect(res.dataValues).toHaveProperty('email');
          expect(res.dataValues).toHaveProperty('password');
          expect(res.dataValues).toHaveProperty('updatedAt');
          expect(res.dataValues).toHaveProperty('createdAt');
        });
      });

      it('should fail to create an user with malformed parameters', () =>
        mutations.createUser({}, { user: { a: 'b' } }).catch(err => {
          expect(typeof err).toBe('object');
        }));
      it('should fail creating an user that already exist in database', async () => {
        const user = await userFactory.build();
        return mutations
          .createUser({}, { user: user.dataValues })
          .then(() => mutations.createUser({}, { user: user.dataValues }))
          .catch(err => {
            expect(err.extensions.code).toBe(DUPLICATE_EMAIL_ERROR);
          });
      });
      it('should fail signing up an user with no alphanumeric password', async () => {
        const user = await userFactory.build({ password: 'pass' });
        return mutations.createUser({}, { user: user.dataValues }).catch(err => {
          expect(err.extensions.code).toBe(INVALID_PASSWORD_ERROR);
        });
      });
      it('should fail signing up an user with password length < 8', async () => {
        const user = await userFactory.build({ password: 'pass123' });
        return mutations.createUser({}, { user: user.dataValues }).catch(err => {
          expect(err.extensions.code).toBe(INVALID_PASSWORD_ERROR);
        });
      });
    });
    describe('login', () => {
      it('should login an user successfuly', async () => {
        const password = 'pass1234';
        const user = await userFactory.create({ password });
        return mutations.login({}, { credentials: { email: user.email, password } }).then(res => {
          expect(res).toHaveProperty('accessToken');
        });
      });
      it('should not login an user with invalid password', async () => {
        const password = 'pass1234';
        const user = await userFactory.create({ password });
        return mutations
          .login({}, { credentials: { email: user.email, password: 'pass4321' } })
          .catch(err => {
            expect(err.extensions.code).toBe(USER_SIGNIN_ERROR);
          });
      });
    });
  });
});
