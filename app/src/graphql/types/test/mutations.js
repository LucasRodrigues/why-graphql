const graphql = require('graphql');
const types = require('./types');
const Test = require('../../../domain/test');

const insert = {
  type: types.TestInsertOutputType,
  args: {
    status: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    clientId: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    doctorId: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
  resolve: async (root, args) => {
    try {
      const test = await Test.insert(args);
      return {
        data: test,
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
  testInsert: insert,
};
