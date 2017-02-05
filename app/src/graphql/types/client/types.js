const graphql = require('graphql');
const errorTypes = require('../error/types');


const ClientType = new graphql.GraphQLObjectType({
  name: 'ClientType',
  description: 'Client Type',
  fields: () => ({
    _id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    name: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    birthday: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    cpf: {
      type: graphql.GraphQLString,
    },
  }),
});

const ClientInsertOutputType = new graphql.GraphQLObjectType({
  name: 'ClientInsertOutputType',
  description: 'Client Insert Output Type',
  fields: () => ({
    data: {
      type: ClientType,
    },
    errors: {
      type: errorTypes.ErrorsType,
    },
  }),
});

module.exports = {
  ClientType,
  ClientInsertOutputType,
};
