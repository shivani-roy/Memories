import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("PostMessage", PostSchema);
