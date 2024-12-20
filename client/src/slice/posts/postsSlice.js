import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";

const initialState = {
  posts: [],
  isLoading: true,
  currentPage: 1,
  numOfPages: 1,
  post: {},
};

export const getPosts = createAsyncThunk("posts/getPosts", async (page) => {
  try {
    const { data } = await api.fetchPosts(page);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ postData, name, navigate }) => {
    try {
      const { data } = await api.createPost({ ...postData, name });
      navigate(`/posts/${data.post._id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ currentId: id, postData: post, name }, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState());
      const { data } = await api.updatePost(id, { ...post, name });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    await api.deletePost(id);
    return id;
  } catch (error) {
    console.log(error);
  }
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  try {
    const { data } = await api.likePost(id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const getPostsBySearch = createAsyncThunk(
  "posts/getPostsBySearch",
  async (searchQuery) => {
    try {
      const { data } = await api.fetchPostsBySearch(searchQuery);
      // console.log(searchQuery, data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPost = createAsyncThunk("posts/getPost", async (id) => {
  try {
    const { data } = await api.fetchPost(id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ finalComment: value, id }) => {
    try {
      const { data } = await api.addComment(id, value);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // createPost: (state, action) => {
    //   state.posts = [...state.posts, action.payload];
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload);

        state.posts = action.payload.posts;
        state.currentPage = action.payload.currentPage;
        state.numOfPages = action.payload.numOfPages;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = [...state.posts, action.payload.post];
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { _id } = action.payload.post;

        state.posts = state.posts.map((post) => {
          if (post._id === _id) {
            return action.payload.post;
          }
          return post;
        });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { _id } = action.payload.post;

        state.posts = state.posts.map((post) => {
          if (post._id === _id) {
            return action.payload.post;
          }
          return post;
        });
      })
      .addCase(getPostsBySearch.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
      })
      .addCase(getPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.post = action.payload.post;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) {
            return action.payload.post;
          }
          return post;
        });
      });
  },
});

// console.log(postSlice);
// export const { createPost } = postSlice.actions;
export default postSlice.reducer;
