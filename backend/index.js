import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import CalendarRouter from "./src/routes/calendarRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/utils/swagger.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import apiKeyRoutes from "./src/routes/apiKeyRoutes.js"
import developerRouter from "./src/routes/developerRoutes.js"
// import helmet from 'helmet';

import adminRouter from "./src/routes/adminRoutes.js";
import curriculumRoutes from "./src/routes/curriculumRoutes.js";
import assessmentRoutes from "./src/routes/assessmentRoutes.js";
import lessonRoutes from "./src/routes/lessonPlanRoutes.js";
import searchRoutes from "./src/routes/searchRoutes.js";
import statisticsRouter from "./src/routes/statisticsRoutes.js";

dotenv.config();
const app = express();


const PORT = 8080

app.use(express.json());
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://cool-selkie-833e95.netlify.app",
  "https://gesadmin.netlify.app",
  "https://gesdev.netlify.app"
]
app.use((req, res, next) => {
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })(req, res, next);
});

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
.connect(mongoUrl, {
  useNewUrlParser: true,})
.then(() => {
    console.log("Database is connected");
  })
  .catch((error) => console.log(error));


app.use(apiKeyRoutes)
app.use(developerRouter)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(CalendarRouter)
app.use(adminRouter)
app.use(searchRoutes)
app.use(curriculumRoutes)
app.use(assessmentRoutes)
app.use(lessonRoutes)
app.use(statisticsRouter)


app.listen(PORT, () => {
  console.log(`The server is running! on ${PORT}`);
});
