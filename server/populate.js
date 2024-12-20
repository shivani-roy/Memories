import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Post from "./models/PostModel.js";
import User from "./models/UserModel.js";

try {
  await mongoose.connect(process.env.MONGO_URI);

  const user = await User.findOne({ email: "john@mail.com" });

  const jsonPosts = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );

  const posts = jsonPosts.map((post) => {
    return { ...post, creator: user._id };
  });

  await Post.deleteMany({ creator: user._id });
  await Post.create(posts);
  console.log("Success!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
