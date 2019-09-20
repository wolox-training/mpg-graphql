const logger = require('../logger'),
  errors = require('../errors');

module.exports = (data, schemaName) => {
  const schema = require(`../schemas/${schemaName}`);
  logger.info(`Schema ${schemaName} will be validated`);
  return schema.validate(data, { abortEarly: false }).catch(err => {
    logger.error(`Invalid inputs: ${err.errors}`);
    throw errors.inputError(`Invalid inputs for schema ${schemaName}`, err.errors);
  });
};
