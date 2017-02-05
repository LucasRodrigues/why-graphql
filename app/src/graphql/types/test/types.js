const graphql = require('graphql');

const ClientTypes = require('../client/types');
const DoctorTypes = require('../doctor/types');
const errorTypes = require('../error/types');

const Doctor = require('../../../domain/doctor');
const Client = require('../../../domain/client');

const TestType = new graphql.GraphQLObjectType({
  name: 'TestType',
  description: 'Test Type',
  fields: () => ({
    _id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    status: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    doctor: {
      type: DoctorTypes.Doctor,
      resolve: async root => Doctor.getById(root.doctorId),
    },
    client: {
      type: ClientTypes.ClientType,
      resolve: async root => Client.getById(root.clientId),
    },
  }),
});

const TestInsertOutputType = new graphql.GraphQLObjectType({
  name: 'TestInsertOutputType',
  description: 'Test Insert Output Type',
  fields: () => ({
    data: {
      type: TestType,
    },
    errors: {
      type: errorTypes.ErrorsType,
    },
  }),
});

module.exports = {
  TestType,
  TestInsertOutputType,
};
