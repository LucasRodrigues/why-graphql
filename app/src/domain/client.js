const mongodb = require('mongodb');

const COLLECTION_NAME = 'client';

const insert = async (client) => {
  const db = await mongodb.MongoClient.connect(process.env.MONGODB);
  const collection = await db.collection(COLLECTION_NAME);
  const find = { cpf: client.cpf };
  const dbClient = await collection.findOne(find);

  if (dbClient) {
    throw 'Usuário já cadastro com o cpf informado';
  }

  const inserted = (await collection.insert(client)).ops[0];

  await db.close();

  return inserted;
};

const get = async () => {
  const db = await mongodb.MongoClient.connect(process.env.MONGODB);
  const collection = await db.collection(COLLECTION_NAME);

  const clients = await collection.find({}).toArray();

  await db.close();

  return clients;
};

const getById = async (_id) => {
  const db = await mongodb.MongoClient.connect(process.env.MONGODB);
  const collection = await db.collection(COLLECTION_NAME);

  const client = await collection.findOne({ _id: new mongodb.ObjectID(_id) });

  await db.close();

  return client;
};

module.exports = {
  insert,
  get,
  getById,
};
