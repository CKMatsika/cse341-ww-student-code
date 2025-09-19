const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  author: Joi.string().min(1).max(120).required(),
  isbn: Joi.string().min(3).max(40).required(),
  genre: Joi.string().min(1).max(60).required(),
  pages: Joi.number().integer().min(1).max(10000).required(),
  publishedYear: Joi.number().integer().min(1450).max(2100).required(),
  language: Joi.string().min(2).max(40).required(),
  rating: Joi.number().min(0).max(5).optional()
});

module.exports = { bookSchema };
