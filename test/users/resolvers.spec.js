const userFactory = require('../factories/user'),
  { mutations } = require('../../app/graphql/users/mutations'),
  DUPLICATE_EMAIL_ERROR = 409,
  INVALID_PASSWORD_ERROR = 422;

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
          expect(res.dataValues).toHaveProperty('updated_at');
          expect(res.dataValues).toHaveProperty('created_at');
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
  });
});
