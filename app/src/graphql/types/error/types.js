const graphql = require('graphql');

const ErrorType = new graphql.GraphQLObjectType({
  name: 'Error',
  description: 'Error Type',
  fields: () => ({
    message: { type: graphql.GraphQLString },
  }),
});

const ErrorsType = new graphql.GraphQLList(ErrorType);

module.exports = {
  ErrorType,
  ErrorsType,
};
