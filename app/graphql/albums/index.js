const { queries, fieldsQueries, schema: queriesSchema } = require('./queries'),
  { mutations, schema: mutationSchema } = require('./mutations');

module.exports = {
  queries,
  mutations,
  fieldsQueries,
  schemas: [queriesSchema, mutationSchema]
};
