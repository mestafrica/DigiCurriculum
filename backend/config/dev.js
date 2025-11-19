export default {
  allowedOrigins: (process.env.DEV_ALLOWED_ORIGINS || "").split(","),
};
