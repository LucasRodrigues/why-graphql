const graphql = require('graphql');
const types = require('./types');
const Client = require('../../../domain/client');

const insert = {
  type: types.ClientInsertOutputType,
  args: {
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    birthday: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    cpf: { type: graphql.GraphQLString },
  },
  resolve: async (root, args) => {
    try {
      const client = await Client.insert(args);
      return {
        data: client,
      };
    } catch (e) {
      return {
        errors: [{
          message: e,
        }],
      };
    }
  },
};

module.exports = {
  clientInsert: insert,
};
