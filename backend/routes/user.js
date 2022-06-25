import express from "express";

import {
  deleteMyProfile,
  followUnfollowUser,
  forgetPassword,
  getAllUser,
  getUserPost,
  getUserProfile,
  login,
  logout,
  myprofile,
  register,
  resetPassword,
  updatePassword,
  updateProfile,
} from "../controllers/user.js";
import { isAuth } from "../middleware/auth.js";
const router = express.Router();

router.route("/user/register").post(register);
router.route("/user/login").post(login);
router.route("/user/logout").get(isAuth, logout);
router.route("/user/getProfile").get(isAuth, myprofile);
router.route("/user/getUserProfile/:id").get(isAuth, getUserProfile);
router.route("/user/getAllUser").get(isAuth, getAllUser);
router.route("/userposts/:id").get(isAuth, getUserPost);

router.route("/user/changePassword").patch(isAuth, updatePassword);
router.route("/user/updateProfile").patch(isAuth, updateProfile);
router.route("/user/deleteProfile").delete(isAuth, deleteMyProfile);
router.route("/user/followUnfollow/:id").get(isAuth, followUnfollowUser);
router.route("/forget/password").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);

export default router;
