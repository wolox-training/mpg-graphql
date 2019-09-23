const { queries, fieldsQueries, schema: queriesSchema } = require('./queries'),
  { mutations, schema: mutationSchema } = require('./mutations'),
  { subscriptions, schema: subscriptionsSchema } = require('./subscriptions');

module.exports = {
  queries,
  fieldsQueries,
  mutations,
  subscriptions,
  schemas: [queriesSchema, mutationSchema, subscriptionsSchema]
};
