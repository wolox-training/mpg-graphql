const { queries, fieldsQueries, schema: queriesSchema } = require('./queries');

module.exports = {
  queries,
  fieldsQueries,
  schemas: [queriesSchema]
};
