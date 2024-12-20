import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  getPost,
  addComment,
} from "../controllers/postController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/search").get(getPostsBySearch);
router.route("/").get(getPosts).post(authenticateUser, createPost);
router
  .route("/:id")
  .get(getPost)
  .patch(authenticateUser, updatePost)
  .delete(authenticateUser, deletePost);
router.route("/:id/likePost").patch(authenticateUser, likePost);
router.route("/:id/commentPost").post(authenticateUser, addComment);

export default router;
