import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
export const likeReducer = createReducer(initialState, {
  likeRequest: (state) => {
    state.loading = true;
  },
  likeSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  likeFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  commentRequest: (state) => {
    state.loading = true;
  },
  commentSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  commentFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  commentDeleteRequest: (state) => {
    state.loading = true;
  },
  commentDeleteSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  commentDeleteFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  newPostRequest: (state) => {
    state.loading = true;
  },
  newPostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  newPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updatePostRequest: (state) => {
    state.loading = true;
  },
  updatePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updatePostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deletePostRequest: (state) => {
    state.loading = true;
  },
  deletePostSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deletePostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateUserProfileRequest: (state) => {
    state.loading = true;
  },
  updateUserProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateUserProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  updateUserPasswordRequest: (state) => {
    state.loading = true;
  },
  updateUserPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  updateUserPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  deleteUserProfileRequest: (state) => {
    state.loading = true;
  },
  deleteUserProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  deleteUserProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  forgetPasswordRequest: (state) => {
    state.loading = true;
  },
  forgetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  forgetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  resetPasswordRequest: (state) => {
    state.loading = true;
  },
  resetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  resetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  followUserRequest: (state) => {
    state.loading = true;
  },
  followUserSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  followUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearMessages: (state) => {
    state.message = null;
  },
});
export const getMyPost = createReducer(initialState, {
  myPostRequest: (state) => {
    state.loading = true;
  },
  myPostSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  myPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
export const getUserPost = createReducer(initialState, {
  userPostRequest: (state) => {
    state.loading = true;
  },
  userPostSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  userPostFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
