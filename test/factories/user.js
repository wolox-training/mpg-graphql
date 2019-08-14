const { factory } = require('factory-girl'),
  faker = require('faker'),
  models = require('../../app/models'),
  { user: User } = models;

factory.define('user', User, {
  name: () => faker.name.firstName(),
  lastname: () => faker.name.lastName(),
  email: () => faker.internet.email(this.name, this.lastname, 'wolox.co'),
  password: () => faker.internet.password()
});

module.exports = {
  create: params => factory.create('user', params),
  createMany: () => factory.createMany('user', 5),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params)
};
