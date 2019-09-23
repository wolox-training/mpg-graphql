const { factory } = require('factory-girl'),
  faker = require('faker'),
  models = require('../../app/models'),
  { album } = models;

factory.define('album', album, {
  albumId: () => faker.andom.number(),
  title: () => faker.name.title(),
  userId: () => faker.andom.number()
});

module.exports = {
  create: params => factory.create('album', params),
  createMany: () => factory.createMany('album', 5),
  build: params => factory.build('album', params),
  attributes: params => factory.attrs('album', params)
};
