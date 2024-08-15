import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import AccountRouter from "./src/routes/usersRoutes.js";
import calendarRouter from "./src/routes/calendarRoutes.js";
import curriculumRoutes from "./src/routes/curriculumRoutes.js";
import assessmentRoutes from "./src/routes/assessmentRoutes.js";
import lessonRoutes from "./src/routes/lessonPlanRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/utils/swagger.js";
import cookieParser from "cookie-parser";
import session from "express-session";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URI }));
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Make sure to set this in your .env file
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Set to true in production
  })
);

const mongoUrl = process.env.MONGODB_URL;
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((error) => console.log(error));

const PORT = process.env.PORT || 8080;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(AccountRouter);
app.use(calendarRouter);
app.use(curriculumRoutes);
app.use(assessmentRoutes);
app.use(lessonRoutes);

app.listen(PORT, () => {
  console.log(`The server is running! on ${PORT}`);
});
