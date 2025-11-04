import request from "supertest";
import { adminModel } from "../../../src/models/adminModel.js";
import { app } from "../../setup/testSetup.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

describe("Admin Endpoints", () => {
  let testAdmin;
  let adminToken;

  beforeEach(async () => {
    // Clear the admin collection
    await adminModel.deleteMany({});

    // Create a test admin
    const hashedPassword = await bcrypt.hash("Password123", 10);
    testAdmin = await adminModel.create({
      firstName: "Test",
      lastName: "Admin",
      email: "existing@admin.com", // Changed to different email
      password: hashedPassword,
      role: "admin",
      isVerified: true,
    });

    // Generate token for authenticated requests
    adminToken = jwt.sign({ id: testAdmin._id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "1h",
    });
  });

  // Registration tests
  describe("POST /admin/auth/register", () => {
    it("should register a new admin successfully", async () => {
      const newAdmin = {
        firstName: "Test",
        lastName: "Admin",
        email: "test@admin.com", // This is now unique
        password: "Password123",
        role: "admin",
      };

      const response = await request(app)
        .post("/admin/auth/register")
        .send(newAdmin);

      expect(response.status).toBe(201);
      expect(response.body).toBe("Registered admin, OTP sent");

      // Verify admin was created in database
      const adminInDb = await adminModel.findOne({ email: newAdmin.email });
      expect(adminInDb).toBeTruthy();
      expect(adminInDb.email).toBe(newAdmin.email);
      expect(adminInDb.firstName).toBe(newAdmin.firstName);
    });

    it("should not register admin with existing email", async () => {
      // First create an admin
      const existingAdmin = {
        firstName: "Existing",
        lastName: "Admin",
        email: "duplicate@admin.com",
        password: "Password123",
        role: "admin",
      };

      await request(app).post("/admin/auth/register").send(existingAdmin);

      // Try to create another admin with same email
      const response = await request(app)
        .post("/admin/auth/register")
        .send(existingAdmin);

      expect(response.status).toBe(409);
      expect(response.body).toBe("Admin already exists!");
    });
  });

  // Login tests
  describe("POST /admin/auth/login", () => {
    it("should login successfully with valid credentials", async () => {
      const response = await request(app).post("/admin/auth/login").send({
        email: "existing@admin.com",  
        password: "Password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body.message).toBe("User checked in!");
    });

    it("should fail with invalid password", async () => {
      const response = await request(app).post("/admin/auth/login").send({
        email: "existing@admin.com", // Use the email from beforeEach
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body).toBe("Invalid credentials!");
    });
  });

  // Profile Management tests
  describe("GET /admin/auth/me/:id", () => {
    it("should get admin profile with valid token", async () => {
      const response = await request(app)
        .get(`/admin/auth/me/${testAdmin._id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("email", testAdmin.email);
      expect(response.body).not.toHaveProperty("password");
    });

    it("should fail without auth token", async () => {
      const response = await request(app).get(
        `/admin/auth/me/${testAdmin._id}`
      );

      expect(response.status).toBe(401);
    });
  });

  // Get All Admins test
  describe("GET /admin/auth/me", () => {
    it("should get all admin profiles", async () => {
      const response = await request(app)
        .get("/admin/auth/me")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Update Profile tests
  describe("PATCH /admin/auth/me", () => {
    it("should update admin profile", async () => {
      const updateData = {
        firstName: "Updated",
        lastName: "Name",
        email: "updated@admin.com",
      };

      const response = await request(app)
        .patch("/admin/auth/me")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body).toBe("Admin profile updated");

      // Verify the update in database
      const updatedAdmin = await adminModel.findById(testAdmin._id);
      expect(updatedAdmin.firstName).toBe(updateData.firstName);
      expect(updatedAdmin.email).toBe(updateData.email);
    });
  });

  // Password Reset tests
  describe("POST /admin/reset-password", () => {
    it("should send password reset email", async () => {
      const response = await request(app)
        .post("/admin/reset-password")
        .send({ email: testAdmin.email });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Password reset email sent");
    });
  });

  // OTP Verification tests
  describe("POST /admin/verify-otp", () => {
    it("should verify valid OTP", async () => {
      // First set an OTP
      const otp = "1234";
      testAdmin.otp = otp;
      testAdmin.otpExpiry = new Date(Date.now() + 600000); // 10 minutes from now
      await testAdmin.save();

      const response = await request(app).post("/admin/verify-otp").send({
        email: testAdmin.email,
        otp: otp,
      });

      expect(response.status).toBe(200);
      expect(response.body).toBe("OTP verified successfully");
    });
  });

  // Logout test
  describe("POST /admin/auth/logout", () => {
    it("should logout successfully", async () => {
      const response = await request(app)
        .post("/admin/auth/logout")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBe("Admin checked-out");
    });
  });
});