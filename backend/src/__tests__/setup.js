import mongoose from 'mongoose';
import { jest } from '@jest/globals';

// Mock mongoose to prevent real DB connections
jest.mock('mongoose');

// Mock the userModel
jest.mock('../models/userModel.js', () => ({
  userModel: {
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
  }
}));

// Mock the adminModel
jest.mock('../models/adminModel.js', () => ({
  adminModel: {
    findOne: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
  }
}));
