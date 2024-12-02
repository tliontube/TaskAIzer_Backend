import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./database/connection.js";
import config from "./config.js";
import task from "./api/routes/tasks.js";
import user from "./api/routes/user.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

task(app);
user(app);

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
