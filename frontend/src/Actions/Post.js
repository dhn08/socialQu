import axios from "axios";
export const likePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });
    const { data } = await axios.get(`/api/v1/post/likeUnlike/${postId}`);
    dispatch({
      type: "likeSuccess",
      payload: data.msg,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};
export const addComment = (postId, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "commentRequest",
    });
    const { data } = await axios.post(
      `/api/v1/post/comment/${postId}`,
      {
        comment,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch({
      type: "commentSuccess",
      payload: data.msg,
    });
  } catch (error) {
    dispatch({
      type: "commentFailure",
      payload: error.response.data.msg,
    });
  }
};
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "commentDeleteRequest",
    });
    const { data } = await axios.delete(`/api/v1/post/comment/${postId}`, {
      data: { commentId },
    });
    dispatch({
      type: "commentDeleteSuccess",
      payload: data.msg,
    });
  } catch (error) {
    dispatch({
      type: "commentDeleteFailure",
      payload: error.response.data.msg,
    });
  }
};
export const newPost = (image, caption) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });
    const { data } = await axios.post(
      `/api/v1/post/upload`,
      {
        caption,
        image,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({
      type: "newPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.msg,
    });
  }
};

export const updatePost = (postId, caption) => async (dispatch) => {
  try {
    dispatch({
      type: "updatePostRequest",
    });
    const { data } = await axios.put(
      `api/v1/post/changeCaption/${postId}`,
      {
        caption,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    dispatch({
      type: "updatePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updatePostFailure",
      payload: error.response.data.msg,
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });
    const { data } = await axios.delete(`/api/v1/post/delete/${postId}`);
    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};
