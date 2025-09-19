const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect');

const collection = () => getDb().collection('books');

const getAll = async (req, res, next) => {
  try {
    const items = await collection().find({}).toArray();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const item = await collection().findOne({ _id: new ObjectId(id) });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const doc = {
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      genre: req.body.genre,
      pages: req.body.pages,
      publishedYear: req.body.publishedYear,
      language: req.body.language,
      rating: req.body.rating ?? null,
      createdAt: new Date()
    };
    const result = await collection().insertOne(doc);
    res.status(201).json({ _id: result.insertedId, ...doc });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const updateDoc = {
      $set: {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        genre: req.body.genre,
        pages: req.body.pages,
        publishedYear: req.body.publishedYear,
        language: req.body.language,
        rating: req.body.rating ?? null
      }
    };
    const result = await collection().updateOne({ _id: new ObjectId(id) }, updateDoc);
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Not found' });
    const updated = await collection().findOne({ _id: new ObjectId(id) });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const result = await collection().deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };
