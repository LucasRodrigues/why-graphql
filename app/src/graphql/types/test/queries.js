const graphql = require('graphql');
const types = require('./types');

const Test = require('../../../domain/test');

const tests = {
  type: new graphql.GraphQLList(types.TestType),
  resolve: async () => Test.get(),
};

const test = {
  type: new graphql.GraphQLList(types.TestType),
  args: {
    _id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
  resolve: async (root, { _id }) => Test.getById(_id),
};

module.exports = { tests, test };
