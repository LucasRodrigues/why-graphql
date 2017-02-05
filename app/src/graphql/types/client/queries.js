const graphql = require('graphql');
const types = require('./types');
const Client = require('../../../domain/client');

const clients = {
  type: new graphql.GraphQLList(types.ClientType),
  resolve: async () => Client.get(),
};

const client = {
  type: types.ClientType,
  args: {
    _id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
  resolve: async (root, { _id }) => Client.getById(_id),
};

module.exports = { clients, client };
