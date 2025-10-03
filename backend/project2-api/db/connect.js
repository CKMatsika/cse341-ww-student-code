const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

let _client;

const initDb = async (callback) => {
  try {
    if (_client) {
      console.log('MongoDB already initialized');
      return callback(null, _client);
    }
    const uri = process.env.Mongo_url;
    if (!uri) throw new Error('Mongo_url not set');
    _client = await MongoClient.connect(uri, { 
      // options can be added here if needed
    });
    console.log('Connected to MongoDB');
    return callback(null, _client);
  } catch (err) {
    return callback(err);
  }
};

const getDb = () => {
  if (!_client) throw new Error('Db not initialized');
  const dbName = process.env.DB_NAME;
  if (!dbName) throw new Error('DB_NAME not set');
  return _client.db(dbName);
};

module.exports = { initDb, getDb };
