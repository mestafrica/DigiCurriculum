import request from "supertest";
import { userModel } from "../../../src/models/userModel.js";
import { app } from "../../setup/testSetup.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("User Endpoints", () => {
  let testUser;
  let userToken;

  beforeEach(async () => {
    // Clear the user collection
    await userModel.deleteMany({});

    // Create a test user
    const hashedPassword = await bcrypt.hash("Password123", 10);
    testUser = await userModel.create({
      firstName: "Test",
      lastName: "User",
      email: "existing@test.com",
      password: hashedPassword,
      school: "Test University",
      userType: "Student",
      country: "Ghana",
      isVerified: true,
    });

    // Generate token for authenticated requests (if needed)
    userToken = jwt.sign({ id: testUser._id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "24h",
    });
  });

  // Signup/Registration tests
  describe("POST /signup", () => {
    it("should register a new user successfully", async () => {
      const newUser = {
        firstName: "John",
        lastName: "Doe",
        email: "john@test.com",
        password: "Password123",
        school: "Ghana University",
        userType: "Student",
        country: "Ghana",
      };

      const response = await request(app)
        .post("/signup")
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Signup successful");

      // Verify user was created in database
      const userInDb = await userModel.findOne({ email: newUser.email });
      expect(userInDb).toBeTruthy();
      expect(userInDb.email).toBe(newUser.email);
      expect(userInDb.firstName).toBe(newUser.firstName);
      expect(userInDb.isVerified).toBe(false);
      // expect(userInDb.otp).toBeTruthy();
    });

    it("should not register user with existing email", async () => {
      const duplicateUser = {
        firstName: "Jane",
        lastName: "Doe",
        email: "existing@test.com", // Same as testUser
        password: "Password123",
        school: "Test School",
        userType: "Student",
        country: "Ghana",
      };

      const response = await request(app)
        .post("/signup")
        .send(duplicateUser);

      expect(response.status).toBe(400);
      expect(response.body).toBe("User already exists");
    });

    it("should fail with invalid email format", async () => {
      const invalidEmailUser = {
        firstName: "Test",
        lastName: "User",
        email: "invalid-email",
        password: "Password123",
        school: "Test School",
        userType: "Student",
        country: "Ghana",
      };

      const response = await request(app)
        .post("/signup")
        .send(invalidEmailUser);

      expect(response.status).toBe(400);
      expect(response.body).toBe("Please enter a valid email");
    });

    it("should fail with weak password", async () => {
      const weakPasswordUser = {
        firstName: "Test",
        lastName: "User",
        email: "test@test.com",
        password: "weak",
        school: "Test School",
        userType: "Student",
        country: "Ghana",
      };

      const response = await request(app)
        .post("/signup")
        .send(weakPasswordUser);

      expect(response.status).toBe(400);
      expect(response.body).toBe(
        "Password must be at least 6 characters long and contain at least one letter and one number"
      );
    });
  });

  // Login tests
  describe("POST /login", () => {
    it("should login successfully with valid credentials", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "existing@test.com",
          password: "Password123",
        });

      expect(response.status).toBe(200);
      // expect(response.body).toHaveProperty("accessToken");
      // expect(response.body.message).toBe("User checked in!");
    });

    it("should fail with invalid password", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "existing@test.com",
          password: "wrongpassword",
        });

      expect(response.status).toBe(401);
      // expect(response.body).toBe("Invalid credentials");
    });

    it("should fail with non-existent email", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "nonexistent@test.com",
          password: "Password123",
        });

      expect(response.status).toBe(404);
      // expect(response.body).toBe("User not found");
    });

    it("should fail with invalid email format", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          email: "invalid-email",
          password: "Password123",
        });

      expect(response.status).toBe(400);
      expect(response.body).toBe("Please enter a valid email");
    });
  });

  // Get all users tests
  describe("GET /all-users", () => {
    it("should fetch all users successfully", async () => {
      const response = await request(app).get("/all-users");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Users fetched successfully");
      expect(Array.isArray(response.body.users)).toBe(true);
      expect(response.body.users.length).toBeGreaterThan(0);
    });

    it("should return 404 when no users exist", async () => {
      // Clear all users
      await userModel.deleteMany({});

      const response = await request(app).get("/all-users");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No users found");
    });
  });

  // Get single user tests
  describe("GET /user/:id", () => {
    it("should fetch a single user by ID", async () => {
      const response = await request(app).get(`/user/${testUser._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("user fetched successfully");
      expect(response.body.user).toBeTruthy();
      expect(response.body.user.email).toBe(testUser.email);
      expect(response.body.user.firstName).toBe(testUser.firstName);
    });

    it("should return 500 for invalid user ID", async () => {
      const response = await request(app).get("/user/invalid-id");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal server error");
    });
  });

  // Update user tests
  describe("PATCH /update-user/:id", () => {
    it("should update user successfully", async () => {
      const updateData = {
        firstName: "Updated",
        lastName: "Name",
        school: "New University",
      };

      const response = await request(app)
        .patch(`/update-user/${testUser._id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("user updated successfully");
      expect(response.body.user.firstName).toBe(updateData.firstName);
      expect(response.body.user.lastName).toBe(updateData.lastName);
      expect(response.body.user.school).toBe(updateData.school);

      // Verify the update in database
      const updatedUser = await userModel.findById(testUser._id);
      expect(updatedUser.firstName).toBe(updateData.firstName);
    });

    it("should return 404 for non-existent user", async () => {
      const fakeId = "507f1f77bcf86cd799439011"; // Valid MongoDB ObjectId format
      const updateData = { firstName: "Test" };

      const response = await request(app)
        .patch(`/update-user/${fakeId}`)
        .send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });

  // Delete user tests
  describe("DELETE /delete-user/:id", () => {
    it("should delete user successfully", async () => {
      const response = await request(app).delete(`/delete-user/${testUser._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User deleted successfully");

      // Verify user was deleted from database
      const deletedUser = await userModel.findById(testUser._id);
      expect(deletedUser).toBeNull();
    });

    it("should return 404 for non-existent user", async () => {
      const fakeId = "507f1f77bcf86cd799439011"; // Valid MongoDB ObjectId format

      const response = await request(app).delete(`/delete-user/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });

  // OTP Verification tests
  describe("POST /verify-otp", () => {
    it("should verify valid OTP", async () => {
      // Set an OTP for the test user
      const otp = "1234";
      testUser.otp = otp;
      testUser.otpExpiry = new Date(Date.now() + 600000); // 10 minutes from now
      testUser.isVerified = false;
      await testUser.save();

      const response = await request(app)
        .post("/verify-otp")
        .send({
          email: testUser.email,
          otp: otp,
        });

      expect(response.status).toBe(200);
      expect(response.body).toBe("OTP verified successfully");

      // Verify user is now verified
      const verifiedUser = await userModel.findById(testUser._id);
      expect(verifiedUser.isVerified).toBe(true);
      expect(verifiedUser.otp).toBeUndefined();
    });

    it("should fail with invalid OTP", async () => {
      const otp = "1234";
      testUser.otp = otp;
      testUser.otpExpiry = new Date(Date.now() + 600000);
      await testUser.save();

      const response = await request(app)
        .post("/verify-otp")
        .send({
          email: testUser.email,
          otp: "9999", // Wrong OTP
        });

      expect(response.status).toBe(400);
      expect(response.body).toBe("Invalid or expired OTP");
    });

    it("should fail with expired OTP", async () => {
      const otp = "1234";
      testUser.otp = otp;
      testUser.otpExpiry = new Date(Date.now() - 1000); // Expired
      await testUser.save();

      const response = await request(app)
        .post("/verify-otp")
        .send({
          email: testUser.email,
          otp: otp,
        });

      expect(response.status).toBe(400);
      expect(response.body).toBe("Invalid or expired OTP");
    });

    it("should fail for non-existent user", async () => {
      const response = await request(app)
        .post("/verify-otp")
        .send({
          email: "nonexistent@test.com",
          otp: "1234",
        });

      expect(response.status).toBe(404);
      expect(response.body).toBe("User not found");
    });
  });

  // Resend OTP tests
  describe("POST /resend-otp", () => {
    it("should resend OTP successfully", async () => {
      const response = await request(app)
        .post("/resend-otp")
        .send({ email: testUser.email });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("OTP Resent successfully");

      // Verify OTP was updated in database
      const updatedUser = await userModel.findById(testUser._id);
      expect(updatedUser.otp).toBeTruthy();
      expect(updatedUser.otpExpiry).toBeTruthy();
    });

    it("should fail for non-existent user", async () => {
      const response = await request(app)
        .post("/resend-otp")
        .send({ email: "nonexistent@test.com" });

      expect(response.status).toBe(404);
      expect(response.body).toBe("User not found");
    });
  });

  // Password Reset tests
  describe("POST /reset-password", () => {
    it("should send password reset email", async () => {
      const response = await request(app)
        .post("/reset-password")
        .send({ email: testUser.email });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Password reset email sent");

      // Verify reset token was set
      const userWithToken = await userModel.findById(testUser._id);
      expect(userWithToken.resetPasswordToken).toBeTruthy();
      expect(userWithToken.resetPasswordExpire).toBeTruthy();
    });

    it("should fail for non-existent user", async () => {
      const response = await request(app)
        .post("/reset-password")
        .send({ email: "nonexistent@test.com" });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });

    it("should fail without email", async () => {
      const response = await request(app)
        .post("/reset-password")
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Email is required");
    });
  });

  // Verify Password Reset tests
  describe("POST /verify-token/:token", () => {
    it("should reset password with valid token", async () => {
      // Set reset token for test user
      const token = "validresettoken123";
      testUser.resetPasswordToken = token;
      testUser.resetPasswordExpire = new Date(Date.now() + 3600000); // 1 hour
      await testUser.save();

      const newPassword = "NewPassword123";
      const response = await request(app)
        .post(`/verify-token/${token}`)
        .send({
          newPassword: newPassword,
          confirmPassword: newPassword,
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Password has been reset successfully");

      // Verify password was changed
      const updatedUser = await userModel.findById(testUser._id);
      const passwordMatch = await bcrypt.compare(newPassword, updatedUser.password);
      expect(passwordMatch).toBe(true);
      expect(updatedUser.resetPasswordToken).toBeUndefined();
    });

    it("should fail when passwords do not match", async () => {
      const token = "validtoken";
      testUser.resetPasswordToken = token;
      testUser.resetPasswordExpire = new Date(Date.now() + 3600000);
      await testUser.save();

      const response = await request(app)
        .post(`/verify-token/${token}`)
        .send({
          newPassword: "NewPassword123",
          confirmPassword: "DifferentPassword123",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Passwords do not match");
    });

    it("should fail with expired token", async () => {
      const token = "expiredtoken";
      testUser.resetPasswordToken = token;
      testUser.resetPasswordExpire = new Date(Date.now() - 1000); // Expired
      await testUser.save();

      const response = await request(app)
        .post(`/verify-token/${token}`)
        .send({
          newPassword: "NewPassword123",
          confirmPassword: "NewPassword123",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Password reset token is invalid or has expired");
    });

    it("should fail with invalid token", async () => {
      const response = await request(app)
        .post("/verify-token/invalidtoken")
        .send({
          newPassword: "NewPassword123",
          confirmPassword: "NewPassword123",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Password reset token is invalid or has expired");
    });

    it("should fail without password", async () => {
      const token = "validtoken";
      testUser.resetPasswordToken = token;
      testUser.resetPasswordExpire = new Date(Date.now() + 3600000);
      await testUser.save();

      const response = await request(app)
        .post(`/verify-token/${token}`)
        .send({
          confirmPassword: "Password123",
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Passwords do not match");
    });
  });
});