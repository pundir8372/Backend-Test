const request = require('supertest');
const { app } = require('../src/server');

describe('User API', () => {
  describe('GET /health', () => {
    test('should return healthy status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body.status).toBe('healthy');
    });
  });

  describe('GET /api/users', () => {
    test('should return users with pagination', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
      expect(response.body.users).toBeDefined();
      expect(response.body.pagination).toBeDefined();
    });
  });

  describe('POST /api/users', () => {
    test('should create a new user', async () => {
      const userData = { name: 'Test User', email: 'test@example.com' };
      const response = await request(app)
        .post('/api/users')
        .send(userData);
      
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
    });

    test('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('required');
    });

    test('should validate email format', async () => {
      const userData = { name: 'Test User', email: 'invalid-email' };
      const response = await request(app)
        .post('/api/users')
        .send(userData);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid email format');
    });
  });

  describe('GET /api/users/:id', () => {
    test('should return user by id', async () => {
      const response = await request(app).get('/api/users/1');
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(1);
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/users/999');
      expect(response.status).toBe(404);
    });
  });
});
