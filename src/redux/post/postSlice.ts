import { createSlice } from '@reduxjs/toolkit';
import { getDatabase, ref, set, push } from "firebase/database";

const initialState: PostsState = {
  posts: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    ADD_POST: (state, action) => {
      state.posts = action.payload
      console.log("action.payload --> ", action.payload)
    },
  },
})

export const { ADD_POST } = postSlice.actions;

export const addUserPost = (postData: Post) => async () => {
  try {
    const db = getDatabase();
    const usersRef = ref(db, 'posts');
    const newUserRef = push(usersRef);
    set(newUserRef, postData);

  } catch (e) {
    console.log("e=======>", e);
  }
};

export default postSlice.reducer;