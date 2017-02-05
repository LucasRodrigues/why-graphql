const graphql = require('graphql');

const TYPE_TEST = 'test';
const TYPE_DOCTOR = 'doctor';
const TYPE_CLIENT = 'client';
const types = {
  mutations:
  [
    TYPE_CLIENT,
    TYPE_DOCTOR,
    TYPE_TEST,
  ],
  queries:
  [
    TYPE_CLIENT,
    TYPE_DOCTOR,
    TYPE_TEST,
  ],
};

const queries = {};
types.queries.forEach((type) => {
  const queriesPath = `./types/${type}/queries`;

  try {
    require.resolve(queriesPath);
    Object.assign(queries, require(queriesPath));
  } catch (e) {
    console.log(e);
    console.info(`Queries: '${type}' not found.`);
  }
});


const mutations = {};
types.mutations.forEach((type) => {
  const mutationsPath = `./types/${type}/mutations`;

  try {
    require.resolve(mutationsPath);
    Object.assign(mutations, require(mutationsPath));
  } catch (e) {
    console.log(e);
    console.info(`Mutations: '${type}' not found.`);
  }
});

const querySchema = new graphql.GraphQLObjectType({
  name: 'QUERIES',
  fields: {
    mendelics: {
      resolve: () => (true),
      type: new graphql.GraphQLObjectType({
        name: 'queries',
        fields: queries,
      }),
    },
  },
});

const mutationSchema = new graphql.GraphQLObjectType({
  name: 'MUTATIONS',
  fields: {
    mendelics: {
      resolve: () => (true),
      type: new graphql.GraphQLObjectType({
        name: 'mutations',
        fields: mutations,
      }),
    },
  },
});

const schema = new graphql.GraphQLSchema({
  query: querySchema,
  mutation: mutationSchema,
});

module.exports = schema;
