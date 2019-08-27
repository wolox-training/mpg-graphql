const { SchemaDirectiveVisitor } = require('graphql-tools'),
  { defaultFieldResolver } = require('graphql'),
  validateSchema = require('../../utils/schemaValidator'),
  logger = require('../../logger');

class ValidateSchemaDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { schema } = this.args;

    field.resolve = (...args) => {
      const data =
        typeof args[1][field.args[0].name] === 'object' ? { ...args[1][field.args[0].name] } : { ...args[1] };
      return validateSchema(data, schema).then(() => {
        logger.info(`Schema ${schema} was validated succesfully`);
        return resolve.apply(this, args);
      });
    };
  }
}

module.exports = ValidateSchemaDirective;
