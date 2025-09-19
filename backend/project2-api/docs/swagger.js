module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Project 2 API',
    version: '1.0.0',
    description: 'Week 03 CRUD API for Books (with Authors secondary collection)'
  },
  servers: [
    { url: 'http://localhost:' + (process.env.PORT || 8081) }
  ],
  paths: {
    '/api/books': {
      get: {
        summary: 'Get all books',
        responses: {
          200: { description: 'List of books' }
        }
      },
      post: {
        summary: 'Create a new book',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  author: { type: 'string' },
                  isbn: { type: 'string' },
                  genre: { type: 'string' },
                  pages: { type: 'integer' },
                  publishedYear: { type: 'integer' },
                  language: { type: 'string' },
                  rating: { type: 'number' }
                },
                required: ['title','author','isbn','genre','pages','publishedYear','language']
              }
            }
          }
        },
        responses: {
          201: { description: 'Created' },
          400: { description: 'Validation error' }
        }
      }
    },
    '/api/books/{id}': {
      get: {
        summary: 'Get a book by ID',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 200: { description: 'Book' }, 404: { description: 'Not found' } }
      },
      put: {
        summary: 'Update a book',
        parameters: [{ name: 'id', in: 'path', required: true }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  author: { type: 'string' },
                  isbn: { type: 'string' },
                  genre: { type: 'string' },
                  pages: { type: 'integer' },
                  publishedYear: { type: 'integer' },
                  language: { type: 'string' },
                  rating: { type: 'number' }
                },
                required: ['title','author','isbn','genre','pages','publishedYear','language']
              }
            }
          }
        },
        responses: { 200: { description: 'Updated' }, 400: { description: 'Validation error' }, 404: { description: 'Not found' } }
      },
      delete: {
        summary: 'Delete a book',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 204: { description: 'Deleted' }, 404: { description: 'Not found' } }
      }
    },
    '/api/authors': {
      get: { summary: 'Get all authors', responses: { 200: { description: 'List of authors' } } },
      post: {
        summary: 'Create author',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] } } }
        },
        responses: { 201: { description: 'Created' } }
      }
    }
  }
};
