import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';
import bcrypt from 'bcryptjs';

// Set env variables before importing controller
process.env.JWT_PRIVATE_KEY = 'test_jwt_secret_key';

const mockSelect = jest.fn();
const mockFindOne = jest.fn(() => ({ select: mockSelect }));

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
    mockFindOne.mockReturnValue({ select: mockSelect });
  });

  describe('POST /login', () => {
    it('should return 400 if email is invalid', async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'invalidemail', password: 'pass123' });
      expect(res.statusCode).toBe(400);
    });

    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'test@test.com' });
      expect(res.statusCode).toBe(400);
    });

    it('should return 404 if user does not exist', async () => {
      mockSelect.mockResolvedValue(null);
      const res = await request(app)
        .post('/login')
        .send({ email: 'nonexistent@test.com', password: 'pass123' });
      expect(res.statusCode).toBe(404);
    });

    it('should return 401 if password is incorrect', async () => {
      const hashedPassword = await bcrypt.hash('correctpassword', 10);
      mockSelect.mockResolvedValue({
        _id: '123',
        email: 'test@test.com',
        password: hashedPassword,
        isVerified: true,
      });
      const res = await request(app)
        .post('/login')
        .send({ email: 'test@test.com', password: 'wrongpassword' });
      expect(res.statusCode).toBe(401);
    });

    it('should return 403 if user is not verified', async () => {
      const hashedPassword = await bcrypt.hash('pass123', 10);
      mockSelect.mockResolvedValue({
        _id: '123',
        email: 'test@test.com',
        password: hashedPassword,
        isVerified: false,
      });
      const res = await request(app)
        .post('/login')
        .send({ email: 'test@test.com', password: 'pass123' });
      expect(res.statusCode).toBe(403);
    });

    it('should return 200 if login is successful', async () => {
      const hashedPassword = await bcrypt.hash('pass123', 10);
      mockSelect.mockResolvedValue({
        _id: '123',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'test@test.com',
        password: hashedPassword,
        isVerified: true,
        userType: 'Teacher',
      });
      const res = await request(app)
        .post('/login')
        .send({ email: 'test@test.com', password: 'pass123' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
  });

});
