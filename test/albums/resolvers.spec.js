const { mutations } = require('../../app/graphql/albums/mutations'),
  {
    mutations: { login }
  } = require('../../app/graphql/users/mutations'),
  userFactory = require('../factories/user'),
  INVALID_ALBUM_ID = 500;

describe('albums', () => {
  describe('resolvers', () => {
    describe('buyAlbum', () => {
      it('Should buy an album successfuly', async () => {
        const password = 'pass1234';
        const user = await userFactory.create({ password });
        return login({}, { credentials: { email: user.email, password } })
          .then(res =>
            mutations.buyAlbum(
              {},
              { albumId: 1 },
              {
                token: res.accessToken,
                session: {
                  id: user.id
                }
              }
            )
          )
          .then(res => {
            expect(res).toHaveProperty('id');
            expect(res).toHaveProperty('title');
            expect(res).toHaveProperty('userId');
            expect(res).toHaveProperty('albumId');
          });
      });
      it('Should not buy an album successfuly with invalid albumId', async () => {
        const password = 'pass1234';
        const user = await userFactory.create({ password });
        return login({}, { credentials: { email: user.email, password } })
          .then(res =>
            mutations.buyAlbum(
              {},
              { albumId: -1 },
              {
                token: res.accessToken,
                session: {
                  id: user.id
                }
              }
            )
          )
          .catch(err => {
            expect(err.extensions.code).toBe(INVALID_ALBUM_ID);
          });
      });
    });
  });
});
