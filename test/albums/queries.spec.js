const moment = require('moment');

const graphqlTestServer = require('../server.spec'),
  { query } = graphqlTestServer(),
  { album, albums } = require('./graphql');

describe('albums', () => {
  describe('queries', () => {
    it('should return null when fetching a non existing album', () =>
      query(album(-10)).then(res => {
        expect(res.data).toBeNull();
      }));
    it('should get an album properly', () =>
      query(album(1)).then(res => {
        const albumData = { ...res.data.album };
        expect(albumData).toHaveProperty('title');
        expect(albumData).toHaveProperty('artist');
        expect(albumData).toHaveProperty('photos');
        expect(albumData).toHaveProperty('id');
      }));
    it('should get a list of albums', () =>
      query(albums()).then(res => {
        expect(res.data.albums).toHaveLength(3);
      }));
    it('should test the caching implementation to get albums list', () => {
      const timeBeforeWithoutCache = moment();
      return query(albums()).then(() => {
        const timeAfterWithoutCache = moment().diff(timeBeforeWithoutCache);
        const timeBeforeWithCache = moment();
        return query(albums()).then(() => {
          const timeAfterWithCache = moment().diff(timeBeforeWithCache);
          const diff = timeAfterWithoutCache - timeAfterWithCache;
          expect(diff).toBeGreaterThan(50);
        });
      });
    });
  });
});
