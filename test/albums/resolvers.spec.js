const { queries } = require('../../app/graphql/albums/queries'),
  INVALID_ALBUM_ID = 500;

describe('Albums', () => {
  describe('Resolvers', () => {
    describe('album', () => {
      it('Should get an album successfuly', () =>
        queries.album({}, { id: 1 }).then(res => {
          expect(res).toHaveProperty('id');
          expect(res).toHaveProperty('title');
          expect(res).toHaveProperty('userId');
        }));
      it('Should not get an album with invalid id', () =>
        queries.album({}, { id: -1 }).catch(err => {
          expect(err.extensions.code).toBe(INVALID_ALBUM_ID);
        }));
    });
    describe('albums', () => {
      it('Should get a list of albums successfuly', () =>
        queries.albums({}, { limit: 5, offset: 0, orderBy: 'id' }).then(res => {
          expect.arrayContaining(res);
          expect(res).toHaveLength(5);
        }));
    });
  });
});
