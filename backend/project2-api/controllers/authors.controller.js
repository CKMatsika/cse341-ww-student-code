const { getDb } = require('../db/connect');

const collection = () => getDb().collection('authors');

const getAll = async (req, res, next) => {
  try {
    const items = await collection().find({}).toArray();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const doc = {
      name: req.body.name,
      nationality: req.body.nationality || null,
      birthdate: req.body.birthdate || null,
      bio: req.body.bio || null,
      website: req.body.website || null,
      createdAt: new Date()
    };
    const result = await collection().insertOne(doc);
    res.status(201).json({ _id: result.insertedId, ...doc });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create };
