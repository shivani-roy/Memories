import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

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

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use(errorHandlerMiddleware);

app.get("/", (req, res) => {
  res.send("home page");
});

try {
  await mongoose.connect(process.env.MONGO_URI);

  app.listen(port, () => {
    console.log(`server is listening on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
