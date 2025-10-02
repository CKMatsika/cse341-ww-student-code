module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Project 2 API with Authentication',
    version: '1.0.0',
    description: 'CRUD API for Books with Authentication and Authors secondary collection'
  },
  servers: [
    { url: 'http://localhost:' + (process.env.PORT || 8081) }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  paths: {
    '/api/users/register': {
      post: {
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  email: { type: 'string' },
                  password: { type: 'string' },
                  role: { type: 'string', enum: ['user', 'admin'] }
                },
                required: ['username', 'email', 'password']
              }
            }
          }
        },
        responses: {
          201: { description: 'User registered successfully' },
          400: { description: 'User already exists' }
        }
      }
    },
    '/api/users/login': {
      post: {
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' }
                },
                required: ['email', 'password']
              }
            }
          }
        },
        responses: {
          200: { description: 'Login successful' },
          401: { description: 'Invalid credentials' }
        }
      }
    },
    '/api/users/profile': {
      get: {
        summary: 'Get user profile',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'User profile' },
          401: { description: 'Unauthorized' }
        }
      }
    },
    '/api/books': {
      get: {
        summary: 'Get all books',
        responses: {
          200: { description: 'List of books' }
        }
      },
      post: {
        summary: 'Create a new book',
        security: [{ bearerAuth: [] }],
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
          400: { description: 'Validation error' },
          401: { description: 'Unauthorized' }
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
        security: [{ bearerAuth: [] }],
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
        responses: { 200: { description: 'Updated' }, 400: { description: 'Validation error' }, 401: { description: 'Unauthorized' }, 404: { description: 'Not found' } }
      },
      delete: {
        summary: 'Delete a book',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 204: { description: 'Deleted' }, 401: { description: 'Unauthorized' }, 404: { description: 'Not found' } }
      }
    },
    '/api/authors': {
      get: { summary: 'Get all authors', responses: { 200: { description: 'List of authors' } } },
      post: {
        summary: 'Create author',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] } } }
        },
        responses: { 201: { description: 'Created' }, 401: { description: 'Unauthorized' } }
      }
    }
  }
};
