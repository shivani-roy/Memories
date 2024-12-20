import mongoose from "mongoose";
import PostMessage from "../models/PostModel.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/CustomError.js";

const getPosts = async (req, res) => {
  const { page } = req.query;
  const limit = 8;
  const startIndex = (Number(page) - 1) * limit;
  const total = await PostMessage.countDocuments({});

  const posts = await PostMessage.find({})
    .sort({ _id: -1 })
    .limit(limit)
    .skip(startIndex);

  res.status(StatusCodes.OK).json({
    posts,
    nbPosts: posts.length,
    currentPage: Number(page),
    numOfPages: Math.ceil(total / limit),
  });
};

const createPost = async (req, res) => {
  const post = await PostMessage.create({
    ...req.body,
    creator: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid ID");
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ post: updatedPost });
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid ID");
  }

  await PostMessage.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "post deleted" });
};

const likePost = async (req, res) => {
  const { id } = req.params;
  console.log(req.user, req.user.userId)

  if (!req.user.userId) {
    throw new UnauthenticatedError("Unauthenticated");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError("Invalid ID");
  }

  const post = await PostMessage.findById(id);
  const index = post.likes.findIndex((id) => id === String(req.user.userId));
  // console.log(req)
  if (index === -1) {
    post.likes.push(req.user.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.user.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ post: updatedPost });
};

const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  const title = new RegExp(searchQuery, "i"); //i is case insensitive

  const caseInsensitiveTags =
    tags === "" ? [] : tags.split(",").map((tag) => new RegExp(tag, "i"));

  const posts = await PostMessage.find({
    $or: [{ title }, { tags: { $in: caseInsensitiveTags } }],
  });

  // console.log(tags, searchQuery, caseInsensitiveTags)
  res.status(StatusCodes.OK).json({ posts });
};

const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await PostMessage.findById(id);

  res.status(StatusCodes.OK).json({ post });
};

const addComment = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);
  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ post: updatedPost });
};

export {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
  addComment,
};
