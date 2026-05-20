# DigiCurriculum Backend

Backend API for the DigiCurriculum project - an initiative to digitize the Ghana Education Service (GES) curriculum.

## Description

This backend service provides APIs for managing educational curriculum, teacher resources, student assessments, and AI-powered tutoring features. Built with Express.js and Node.js, it integrates with MongoDB for data persistence and Pinecone for vector search capabilities.

## Backend Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data persistence
- **Mongoose**: MongoDB ODM and validation
- **JWT**: Authentication and authorization
- **Pinecone**: Vector database for semantic search
- **Generative AI**: Integration with Google's Generative AI for intelligent tutoring

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - [Install Locally](https://docs.mongodb.com/manual/installation/) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)
- **Git** - [Download](https://git-scm.com/)

### Optional Services

- **Pinecone Account** - For vector search features ([Sign up](https://www.pinecone.io/))
- **Google Generative AI API Key** - For AI tutoring features

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mestafrica/digitizing-the-ges-curriculum.git
cd digitizing-the-ges-curriculum/backend
```

### 2. Install Dependencies

```bash
npm install
```

For consistent development across team members, we use `package-lock.json` to lock dependency versions. Use:

```bash
npm ci
```

### 3. Environment Configuration

Create a `.env` file by copying the example:

```bash
cp ../.env.example .env
```

Configure the following environment variables:

```env
# Database
MONGODB_URL=mongodb://localhost:27017/digicurriculum
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/database

# Session & Authentication
SESSION_SECRET=your-session-secret-key-here
JWT_PRIVATE_KEY=your-jwt-private-key-here

# Pinecone (Vector Search) - Optional
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_INDEX_NAME=your-index-name

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Google Generative AI - Optional
GOOGLE_API_KEY=your-google-api-key
```

### 4. Running the Backend

**Development Mode** (with auto-reload using nodemon):

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or configured port)

**Production Mode**:

```bash
npm start
```

### 5. Running Tests

**Run all tests**:

```bash
npm test
```

**Run admin tests with watch mode**:

```bash
npm run test:admin
```

**Run user tests**:

```bash
npm run test:users
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middlewares/      # Custom middleware
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   └── validators/      # Input validation
├── tests/               # Test files
├── config/              # Configuration files
├── package.json         # Dependencies
├── .env.example         # Environment variables template
└── index.js            # Application entry point
```

## API Documentation

API endpoints are documented using Swagger/OpenAPI. Once the server is running, visit:

```
http://localhost:3000/api-docs
```

## Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. **Fork the repository** on GitHub
2. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and ensure tests pass
4. **Commit with clear messages**:

   ```bash
   git commit -m "feat: add new feature" -m "Brief description of changes"
   ```

5. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on the main repository

### Code Standards

- Follow **ES6+ JavaScript** standards
- Use **meaningful variable and function names**
- Add **JSDoc comments** for functions
- Write **tests** for new features
- Ensure **no console errors or warnings**
- Run `npm test` before submitting PR

### Commit Message Format

```
type: subject

body (optional)
footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:

```
feat: add curriculum search endpoint

Implement full-text search for curriculum items with pagination.
Closes #123
```

### Pull Request Guidelines

- Keep PRs focused on a single feature/fix
- Include description of changes and why they're needed
- Reference related issues
- Ensure all tests pass
- Request review from maintainers

## Troubleshooting

### Common Issues

**MongoDB Connection Error**

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

Solution: Ensure MongoDB is running. Start MongoDB service or use MongoDB Atlas connection string.

**Port Already in Use**

```
Error: listen EADDRINUSE: address already in use :::3000
```

Solution: Change the port in `.env` or kill the process using port 3000.

**Missing Environment Variables**

```
Error: MONGODB_URL is required
```

Solution: Check your `.env` file has all required variables set.

**JWT Token Errors**

```
Error: jwt malformed
```

Solution: Ensure `JWT_PRIVATE_KEY` is correctly set in `.env` and the token is properly formatted.

### Getting Help

- **Check existing issues**: <https://github.com/mestafrica/digitizing-the-ges-curriculum/issues>
- **Create a new issue**: Include error logs and reproduction steps
- **Join discussions**: Participate in GitHub Discussions

## License

This project is licensed under the MIT License - see the LICENSE file in the root directory.

## Support

- 📧 Email: <contact@mestafrica.org>
- 🐛 Report bugs on GitHub Issues
- 💬 Start discussions for feature requests
- 📚 Check documentation in the root README.md
