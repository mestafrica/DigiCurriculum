import request from 'supertest';
import express from 'express';
import { jest } from '@jest/globals';

const mockSave = jest.fn().mockResolvedValue(true);
const mockFindOne = jest.fn();

jest.unstable_mockModule('../models/userModel.js', () => ({
  userModel: {
    findOne: mockFindOne,
  }
}));

jest.unstable_mockModule('../utils/nodemailerConfig.js', () => ({
  default: {
    sendMail: jest.fn().mockResolvedValue(true),
  }
}));

const { verifyOtp, resendOtp, resetPassword } = await import('../controllers/authControllers.js');

const app = express();
app.use(express.json());
app.post('/verify-otp', verifyOtp);
app.post('/resend-otp', resendOtp);
app.post('/reset-password', resetPassword);

describe('Auth Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /verify-otp', () => {
    it('should return 404 if user is not found', async () => {
      mockFindOne.mockResolvedValue(null);
      const res = await request(app)
        .post('/verify-otp')
        .send({ email: 'notfound@test.com', otp: '1234' });
      expect(res.statusCode).toBe(404);
    });

    it('should return 400 if otp is invalid', async () => {
      mockFindOne.mockResolvedValue({
        otp: '9999',
        otpExpiry: Date.now() + 10000,
        save: mockSave,
      });
      const res = await request(app)
        .post('/verify-otp')
        .send({ email: 'test@test.com', otp: '0000' });
      expect(res.statusCode).toBe(400);
    });

    it('should return 400 if otp is expired', async () => {
      mockFindOne.mockResolvedValue({
        otp: '1234',
        otpExpiry: Date.now() - 10000, // already expired
        save: mockSave,
      });
      const res = await request(app)
        .post('/verify-otp')
        .send({ email: 'test@test.com', otp: '1234' });
      expect(res.statusCode).toBe(400);
    });

    it('should return 200 if otp is valid', async () => {
      mockFindOne.mockResolvedValue({
        otp: '1234',
        otpExpiry: Date.now() + 10000,
        save: mockSave,
      });
      const res = await request(app)
        .post('/verify-otp')
        .send({ email: 'test@test.com', otp: '1234' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /resend-otp', () => {
    it('should return 404 if user is not found', async () => {
      mockFindOne.mockResolvedValue(null);
      const res = await request(app)
        .post('/resend-otp')
        .send({ email: 'notfound@test.com' });
      expect(res.statusCode).toBe(404);
    });

    it('should return 200 if otp is resent successfully', async () => {
      mockFindOne.mockResolvedValue({
        otp: '1234',
        otpExpiry: Date.now() + 10000,
        save: mockSave,
      });
      const res = await request(app)
        .post('/resend-otp')
        .send({ email: 'test@test.com' });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /reset-password', () => {
    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/reset-password')
        .send({});
      expect(res.statusCode).toBe(400);
    });

    it('should return 404 if user does not exist', async () => {
      mockFindOne.mockResolvedValue(null);
      const res = await request(app)
        .post('/reset-password')
        .send({ email: 'nonexistent@test.com' });
      expect(res.statusCode).toBe(404);
    });

    it('should return 200 if reset email is sent successfully', async () => {
      mockFindOne.mockResolvedValue({
        email: 'test@test.com',
        save: mockSave,
      });
      const res = await request(app)
        .post('/reset-password')
        .send({ email: 'test@test.com' });
      expect(res.statusCode).toBe(200);
    });
  });

});
