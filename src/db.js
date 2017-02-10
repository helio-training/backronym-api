import { MongoClient } from 'mongodb';

const connect = async () => await MongoClient.connect('mongodb://localhost:32768/backronym');


export default connect;

export const collection = async (collection) => {
  const db = await connect();
  return db.collection(collection);
};
