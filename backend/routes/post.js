import express from "express";
import {
  addComment,
  changeCaption,
  createPost,
  deleteComment,
  deletePost,
  getMyPost,
  getPostOfFollowing,
  likeandUnlikePost,
} from "../controllers/post.js";
import { isAuth } from "../middleware/auth.js";
const router = express.Router();
router.route("/posts").get(isAuth, getPostOfFollowing);
router.route("/getMyPost").get(isAuth, getMyPost);
router.route("/post/upload").post(isAuth, createPost);
router
  .route("/post/comment/:id")
  .post(isAuth, addComment)
  .delete(isAuth, deleteComment);

router.route("/post/delete/:id").delete(isAuth, deletePost);

router.route("/post/likeUnlike/:id").get(isAuth, likeandUnlikePost);
router.route("/post/changeCaption/:id").put(isAuth, changeCaption);

export default router;
