import { expressjwt } from "express-jwt";

export const isAuthenticated = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
