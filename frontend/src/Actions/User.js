import axios from "axios";
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(
      "/api/v1/user/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({
      type: "loginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error.response.data.msg,
    });
  }
};
export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });
      const { data } = await axios.post(
        "/api/v1/user/register",
        { name, email, password, avatar },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch({
        type: "RegisterSuccess",
        payload: data.u,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };
export const updateUserProfile = (name, email, avatar) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserProfileRequest",
    });
    const { data } = await axios.patch(
      "/api/v1/user/updateProfile",
      { name, email, avatar },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({
      type: "updateUserProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response.data.message,
    });
  }
};
export const updateUserPassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserPasswordRequest",
      });
      const { data } = await axios.patch(
        "/api/v1/user/changePassword",
        { oldPassword, newPassword },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch({
        type: "updateUserPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateUserPasswordFailure",
        payload: error.response.data.message,
      });
    }
  };
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    await axios.get("/api/v1/user/logout");
    dispatch({
      type: "logoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};
export const deleteUserProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserProfileRequest",
    });
    const { data } = await axios.delete("/api/v1/user/deleteProfile");
    dispatch({
      type: "deleteUserProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteUserProfileFailure",
      payload: error.response.data.message,
    });
  }
};
export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "forgetPasswordRequest",
    });
    const { data } = await axios.post(
      "/api/v1/forget/password",
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({
      type: "forgetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "forgetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};
export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "resetPasswordRequest",
    });
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      { password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({
      type: "resetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "resetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get("/api/v1/user/getProfile");
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};
export const getFollowingPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });
    const { data } = await axios.get("/api/v1/posts");
    dispatch({
      type: "postOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};
export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostRequest",
    });
    const { data } = await axios.get("/api/v1/getMyPost");
    dispatch({
      type: "myPostSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostFailure",
      payload: error.response.data.message,
    });
  }
};
export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "AllUserRequest",
      });
      const { data } = await axios.get(`/api/v1/user/getAllUser?name=${name}`);
      dispatch({
        type: "AllUserSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "AllUserFailure",
        payload: error.response.data.message,
      });
    }
  };
export const getUserPosts = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "userPostRequest",
    });
    const { data } = await axios.get(`/api/v1/userposts/${userId}`);
    dispatch({
      type: "userPostSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "userPostFailure",
      payload: error.response.data.message,
    });
  }
};
export const getUserProfile = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "userProfileRequest",
    });
    const { data } = await axios.get(`/api/v1/user/getUserProfile/${userId}`);
    dispatch({
      type: "userProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "userProfileFailure",
      payload: error.response.data.message,
    });
  }
};
export const followUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "followUserRequest",
    });
    const { data } = await axios.get(`/api/v1/user/followUnfollow/${userId}`);
    dispatch({
      type: "followUserSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followUserFailure",
      payload: error.response.data.message,
    });
  }
};
