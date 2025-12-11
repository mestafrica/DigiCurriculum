export default {
    allowedOrigins: [
        ...(process.env.DEV_ALLOWED_ORIGINS || "").split(","),
        ...(process.env.PROD_ALLOWED_ORIGINS || "").split(","),
    ].filter(Boolean),
};
