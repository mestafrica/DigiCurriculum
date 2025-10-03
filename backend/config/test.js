export default {
  allowedOrigins: (process.env.TEST_ALLOWED_ORIGINS || "").split(","),
};
