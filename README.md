# Simple Backend API

Production-ready Node.js REST API with Express.js

## Features
- RESTful API endpoints for user management
- Input validation and error handling
- Security middleware (Helmet, CORS, Rate limiting)
- Pagination support
- Health check endpoint
- Unit tests with Jest
- Code quality with ESLint
- Graceful shutdown handling

## API Endpoints

### Health Check
- `GET /health` - Application health status

### Users
- `GET /api/users` - Get all users (with pagination)
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test

# Run linting
npm run lint
```

## Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Project Structure
```
src/
├── server.js              # Main application file
├── controllers/           # Route controllers
├── routes/               # API routes
└── middleware/           # Custom middleware
tests/                    # Test files
```
