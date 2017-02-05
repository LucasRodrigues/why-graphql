const mongodb = require('mongodb');

const Doctor = require('./doctor');
const Client = require('./client');

const COLLECTION_NAME = 'test';

const insert = async (test) => {
  const db = await mongodb.MongoClient.connect(process.env.MONGODB);
  const collection = await db.collection(COLLECTION_NAME);

  const doctor = await Doctor.getById(test.doctorId);
  const client = await Client.getById(test.clientId);

  if (!doctor) {
    throw 'Médico não existe no sistema';
  }

  if (!client) {
    throw 'Cliente não existe no sistema';
  }

  const inserted = (await collection.insert(test)).ops[0];

  await db.close();

  return inserted;
};

const get = async () => {
  const db = await mongodb.MongoClient.connect(process.env.MONGODB);
  const collection = await db.collection(COLLECTION_NAME);

  const tests = await collection.find({}).toArray();

  await db.close();

  return tests;
};

const getById = async (_id) => {
  const db = await mongodb.MongoClient.connect(process.env.MONGODB);
  const collection = await db.collection(COLLECTION_NAME);

  const test = await collection.findOne({ _id: new mongodb.ObjectID(_id) });

  await db.close();

  return test;
};

const getByClientId = async (clientId) => {
  const db = await mongodb.MongoClient.connect(process.env.MONGODB);
  const collection = await db.collection(COLLECTION_NAME);

  const test = await collection.findOne({ clientId });

  await db.close();

  return test;
};

const getByDoctorId = async (doctorId) => {
  const db = await mongodb.MongoClient.connect(process.env.MONGODB);
  const collection = await db.collection(COLLECTION_NAME);

  const test = await collection.findOne({ doctorId });

  await db.close();

  return test;
};


module.exports = {
  insert,
  get,
  getById,
  getByClientId,
  getByDoctorId,
};
