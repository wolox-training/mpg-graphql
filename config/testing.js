exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.DB_NAME_TEST
    },

    session: {
      secret: 'some-super-secret'
    },
    external_apis: {
      albums_api_url: {
        base_url: 'fake-url.com',
        albums: 'fake-url.com/albums',
        photos: 'fake-url.com/photos'
      }
    }
  }
};
