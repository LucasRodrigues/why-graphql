const mongodb = require('mongodb');

const COLLECTION_NAME = 'doctor';

const insert = async (doctor) => {
  const db = await mongodb.MongoClient.connect(process.env.MONGODB);
  const collection = await db.collection(COLLECTION_NAME);
  const find = { crm: doctor.crm };
  const dbDoctor = await collection.findOne(find);

  if (dbDoctor) {
    throw 'Médico já cadastro com o crm informado';
  }

  const inserted = (await collection.insert(doctor)).ops[0];

  await db.close();

  return inserted;
};

const get = async () => {
  const db = await mongodb.MongoClient.connect(process.env.MONGODB);
  const collection = await db.collection(COLLECTION_NAME);

  const doctors = await collection.find({}).toArray();

  await db.close();

  return doctors;
};

const getById = async (_id) => {
  const db = await mongodb.MongoClient.connect(process.env.MONGODB);
  const collection = await db.collection(COLLECTION_NAME);

  const doctor = await collection.findOne({ _id: new mongodb.ObjectID(_id) });

  await db.close();

  return doctor;
};

module.exports = {
  insert,
  get,
  getById,
};
