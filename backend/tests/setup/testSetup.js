import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import express from "express";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import adminRouter from "../../src/routes/adminRoutes.js";
import router from "../../src/routes/usersRoutes.js";
import { jest } from "@jest/globals"; 

export let app;
let mongoServer;

// Mock nodemailer before any tests run
nodemailer.createTransport = () => ({
  sendMail: async () => ({ messageId: "test-message-id" }),
});


beforeAll(async () => {
  // Set up mocks
  jest.unstable_mockModule("../../src/utils/otpUtils.js", () => ({
    sendOTPEmail: jest.fn().mockResolvedValue(true),
  }));

  // Setup MongoDB
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Setup Express
  app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(adminRouter);
  app.use(router);
}, 30000);
   

afterAll(async () => {
  try {
    await mongoose.disconnect();
    await mongoServer.stop();
  } catch (error) {
    console.error("Test cleanup failed:", error);
  }
});

afterEach(async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  } catch (error) {
    console.error("Collection cleanup failed:", error);
  }
});