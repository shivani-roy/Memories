import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// routers
import postRouter from "./routes/postRouter.js";
import userRouter from "./routes/userRouter.js";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

const app = express();
const port = process.env.PORT || 5100;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./public")));

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use(errorHandlerMiddleware);
try {
  await mongoose.connect(process.env.MONGO_URI);

  app.listen(port, () => {
    console.log(`server is listening on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
