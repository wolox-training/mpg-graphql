const { query } = require('../server.spec'),
  { album, albums } = require('./graphql');

describe('Albums', () => {
  describe('queries', () => {
    it('should return null when fetching a non existing album', () =>
      query(album(-10)).then(res => {
        expect(res.data).toBeNull();
      }));
    it('should get an album properly', () =>
      query(album(1)).then(res => {
        expect(res.data.album).toHaveProperty('title');
        expect(res.data.album).toHaveProperty('artist');
        expect(res.data.album).toHaveProperty('photos');
        expect(res.data.album).toHaveProperty('id');
      }));
    it('should get a list of albums', () =>
      query(albums()).then(res => {
        expect(res.data.albums).toHaveLength(3);
      }));
  });
});
