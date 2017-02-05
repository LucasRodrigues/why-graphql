const graphql = require('graphql');
const errorTypes = require('../error/types');

const Doctor = new graphql.GraphQLObjectType({
  name: 'DoctorType',
  description: 'Doctor Type',
  fields: () => ({
    _id: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    name: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
    crm: {
      type: new graphql.GraphQLNonNull(graphql.GraphQLString),
    },
  }),
});

const InsertOutputType = new graphql.GraphQLObjectType({
  name: 'DoctorInsertOutputType',
  description: 'Doctor Insert Output Type',
  fields: () => ({
    data: {
      type: Doctor,
    },
    errors: {
      type: errorTypes.ErrorsType,
    },
  }),
});

module.exports = {
  Doctor,
  InsertOutputType,
};
