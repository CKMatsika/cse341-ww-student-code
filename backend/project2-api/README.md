# Project 2 API (Week 03)

Node.js + Express + MongoDB (native driver). Implements CRUD for `books` with validation and error handling, plus a basic `authors` collection. Swagger documentation included.

## Run locally
1. Create `.env` from `.env.example` and set values.
2. Install deps:
   ```bash
   npm install
   ```
   (Run this in `backend/project2-api/`)
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Health check: `GET http://localhost:8081/health`
5. Swagger UI: `http://localhost:8081/api-docs`
6. API base: `http://localhost:8081/api`

## Endpoints (Week 03)
- GET /api/books
- GET /api/books/:id
- POST /api/books
- PUT /api/books/:id
- DELETE /api/books/:id
- GET /api/authors
- POST /api/authors

## Collections
- `books` (≥7 fields)
- `authors` (secondary collection)

## Notes
- Uses native `mongodb` driver (no Mongoose).
- Validation via `joi`.
- Centralized error handling middleware.
- Ready for Render by setting `PORT`, `MONGODB_URI`, `DB_NAME` as environment variables.
