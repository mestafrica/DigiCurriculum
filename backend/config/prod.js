export default {
  allowedOrigins: (process.env.PROD_ALLOWED_ORIGINS || "").split(","),
};
