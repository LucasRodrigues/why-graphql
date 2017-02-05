const graphql = require('graphql');
const types = require('./types');
const Doctor = require('../../../domain/doctor');

const insert = {
  type: types.InsertOutputType,
  args: {
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    crm: { type: graphql.GraphQLString },
  },
  resolve: async (root, args) => {
    try {
      const doctor = await Doctor.insert(args);

      return {
        data: doctor,
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
  doctorInsert: insert,
};
