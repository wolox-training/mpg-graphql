const { albums_api_url } = require('../../config').common.external_apis,
  request = require('request-promise'),
  errors = require('../errors'),
  logger = require('../logger'),
  { album } = require('../models'),
  { init } = require('../utils/cache');

const getter = options =>
  request(options).catch(err => {
    logger.error(err.message);
    throw errors.externalApiError('Error consuming external API');
  });

const cache = init(getter);

const findAlbumById = id => {
  const options = {
    method: 'GET',
    uri: `${albums_api_url.albums}/${id}`,
    json: true
  };
  logger.info(`Consuming an external api with url: ${options.uri}`);
  return cache.load(options);
};

exports.findAlbums = () => {
  const options = {
    method: 'GET',
    uri: albums_api_url.albums,
    json: true
  };
  logger.info(`Consuming an external api with url: ${options.uri}`);
  return cache.load(options);
};

exports.findPhotosByAlbumId = albumId => {
  const options = {
    method: 'GET',
    uri: albums_api_url.photos,
    qs: { albumId },
    json: true
  };
  logger.info(`Consuming an external api with url: ${options.uri}?albumId=${albumId}`);
  return cache.load(options);
};

exports.findAlbumById = findAlbumById;

exports.buyAlbum = (userId, albumId) =>
  findAlbumById(albumId)
    .then(albumFound => album.findOrCreateAlbum({ ...albumFound, userId }))
    .then(([albumToFindOrCreate, created]) => {
      if (!created) {
        logger.error(`The album ${albumToFindOrCreate.title} was already purchased by the user: ${userId}`);
        throw errors.albumBuyError('The album was already purchased by the user');
      }
      return albumToFindOrCreate;
    });
