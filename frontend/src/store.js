import { configureStore } from "@reduxjs/toolkit";
import { getMyPost, getUserPost, likeReducer } from "./Reducers/Post";
import {
  allUserReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
} from "./Reducers/User";
const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUserReducer,
    like: likeReducer,
    myPost: getMyPost,
    userPosts: getUserPost,
    userProfile: userProfileReducer,
  },
});
export default store;
