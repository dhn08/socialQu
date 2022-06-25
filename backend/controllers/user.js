import { sendEmail } from "../middleware/sendEmail.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
export const register = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    let u = await User.findOne({ email });
    const mycloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatar",
    });
    if (u) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    u = await User.create({
      name,
      email,
      password,
      avatar: { public_id: mycloud.public_id, url: mycloud.secure_url },
    });

    const token = await u.generateToken();
    res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        u,
        token,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .select("+password")
      .populate("followers following");
    if (!user) {
      return res.status(400).json({ success: false, msg: "Incorrect user id" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Incorrect password" });
    }
    const token = await user.generateToken();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        user,
        token,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const followUnfollowUser = async (req, res) => {
  try {
    const userfollow = await User.findById(req.params.id);

    const currentUser = await User.findById(req.user._id);
    if (!userfollow) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    if (currentUser.following.includes(req.params.id)) {
      const index1 = currentUser.following.indexOf(req.params.id);
      const index2 = userfollow.followers.indexOf(currentUser._id);
      currentUser.following.splice(index1, 1);
      userfollow.followers.splice(index2, 1);
      await currentUser.save();
      await userfollow.save();
      return res.status(200).json({ success: true, message: "Unfollowed" });
    } else {
      currentUser.following.push(req.params.id);
      userfollow.followers.push(currentUser._id);
      await currentUser.save();
      await userfollow.save();
      return res.status(200).json({ success: true, message: "followed" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        msg: "Logout!",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).json({
        success: false,
        message: "Provide both newpassword and oldpassword",
      });
    }
    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect old password" });
    }
    user.password = newPassword;
    await user.save();
    return res.status(200).json({ success: true, message: "Password Changed" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, avatar } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (avatar) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);
      const mycloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatar",
      });

      user.avatar = {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      };
    }

    await user.save();
    return res.status(200).json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;
    //Deleting avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    await user.remove();
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Profile Deleted!",
      });
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await post.remove();
    }
    //removing user from followers and following

    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    for (let i = 0; i < following.length; i++) {
      const follows = await User.findById(following[i]);
      const index = follows.followers.indexOf(userId);
      follows.followers.splice(index, 1);
      await follows.save();
    }
    //Removing all comments of the user from the post
    const p = await Post.find();
    for (let i = 0; i < p.length; i++) {
      const post = await Post.find();
      for (let j = 0; j < post.comments.length; j++) {
        if (post.comments[j].user === userId) {
          post.comments.splice(j, 1);
        }
      }
      await post.save();
    }
    //Removing all likes of the user from the post

    for (let i = 0; i < p.length; i++) {
      const post = await Post.find();
      for (let j = 0; j < post.likes.length; j++) {
        if (post.likes[j] === userId) {
          post.likes.splice(j, 1);
        }
      }
      await post.save();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const myprofile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "posts followers following"
    );
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user id" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    if (!users) {
      return res.status(400).json({ success: false, msg: "Incorrect user id" });
    }
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const resetPasswordToken = await user.getResetpasswordToken();

    await user.save();
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;
    const message = `Reset your password by clicking on the link below:\n\n ${resetUrl}`;
    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });
      res
        .status(200)
        .json({ success: true, message: `Email send to ${user.email}` });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Token Expired or invalid" });
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password reset succesful" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getUserPost = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user id" });
    }
    const posts = [];
    for (let i = 0; i < user.posts.length; i++) {
      const post = await Post.findById(user.posts[i]).populate(
        "likes comments.user owner"
      );
      posts.push(post);
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
