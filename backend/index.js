import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import usersRoute from "./routes/user.route.js";
import resumesRoute from "./routes/resume.route.js";
import aiRoute from "./routes/ai.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", usersRoute);
app.use("/api/resumes", resumesRoute);
app.use("/api/ai", aiRoute);

await connectDB();
app.listen(port, () => { 
  console.log("server is running on port " + port); 
});
