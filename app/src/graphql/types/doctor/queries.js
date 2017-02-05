const graphql = require('graphql');
const types = require('./types');
const Doctor = require('../../../domain/doctor');

const doctors = {
  type: new graphql.GraphQLList(types.Doctor),
  resolve: async () => Doctor.get(),
};

const doctor = {
  type: types.Doctor,
  args: {
    _id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
  },
  resolve: async (root, { _id }) => Doctor.getById(_id),
};

module.exports = {
  doctors,
  doctor,
};
