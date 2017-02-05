const express = require('express');
const graphqlHTTP = require('express-graphql');
const bluebird = require('bluebird');
const mongodb = require('mongodb');
const schema = require('./graphql/schema');

const app = express();

bluebird.promisifyAll(mongodb);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(8000, () => {
  console.log('Hi human! My name is graphql!');
  console.log('Access me on http://localhost:8000/graphql');
});
