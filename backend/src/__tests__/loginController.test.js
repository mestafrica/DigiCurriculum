import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';

const mockFindOne = jest.fn();

jest.unstable_mockModule('../models/userModel.js', () => ({
  userModel: {
    findOne: mockFindOne,
  }
}));

const { signIn } = await import('../controllers/loginControllers.js');

const app = express();
app.use(express.json());
app.post('/login', signIn);

describe('Login Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /login', () => {
    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/login')
        .send({ password: 'pass123' });
      expect(res.statusCode).toBe(400);
    });

    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'test@test.com' });
      expect(res.statusCode).toBe(400);
    });

    it('should return 404 if user does not exist', async () => {
      mockFindOne.mockResolvedValue(null);
      const res = await request(app)
        .post('/login')
        .send({ email: 'nonexistent@test.com', password: 'pass123' });
      expect(res.statusCode).toBe(404);
    });

    it('should return 401 if password is incorrect', async () => {
      mockFindOne.mockResolvedValue({
        _id: '123',
        email: 'test@test.com',
        password: 'hashedpassword',
        isVerified: true,
      });
      const res = await request(app)
        .post('/login')
        .send({ email: 'test@test.com', password: 'wrongpassword' });
      expect(res.statusCode).toBe(401);
    });
  });

});
