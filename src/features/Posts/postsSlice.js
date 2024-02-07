import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addPost, fetchingPosts, updateLikePosts,addUserInLike, postDelete } from './postsApi';
const initialState = {
  postGlobe: [],
  status: 'idle',
};


export const fetchAsyncPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetchingPosts();
    return response.data;
  }
);
export const deleteAsyncPost=createAsyncThunk(
  'posts/deletingPost',
  async (id)=>{
    const response=await postDelete(id);
    return id
  }
);
export const AddAsyncPosts = createAsyncThunk(
  'posts/addPost',
  async (post) => {
    const {userName,title,body,image,postedDate,liked_by,comments}=post
    const response = await addPost({userName,title,body,image,reactions:0,liked_by,postedDate,comments});
    return response.data;
  }
);
export const updateAsyncPosts = createAsyncThunk(
  'posts/updateLikePosts',
  async ({id,like}) => {
    const response = await updateLikePosts(id,like);
    return response.data;
  }
);
export const updateAsyncAccounts_likes = createAsyncThunk(
  'posts/addUserInLike',
  async ({id,user}) => {
    const response = await addUserInLike(id,user);
    return response.data;
  }
);
// for adding the commnets
export const AddAsyncComments = createAsyncThunk(
  'posts/updateLikePostsCommnets',
  async ({id,comnt}) => {
    const response = await updateLikePosts(id,comnt);
    return response.data;
  }
);


export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.postGlobe = action.payload;
      })
      .addCase(updateAsyncPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAsyncPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.postGlobe.findIndex(post=>post.id===action.payload.id)
        state.postGlobe.splice(index,1,action.payload) ;
      })
      .addCase(AddAsyncPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddAsyncPosts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.postGlobe.unshift(action.payload) ;
      })
      .addCase(updateAsyncAccounts_likes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAsyncAccounts_likes.fulfilled, (state, action) => {
        const index=state.postGlobe.findIndex(post=>post.id===action.payload.id)
        state.postGlobe.splice(index,1,action.payload) ;
      })
      .addCase(AddAsyncComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddAsyncComments.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.postGlobe.findIndex(post=>post.id===action.payload.id)
        state.postGlobe.splice(index,1,action.payload) ;
      })
      .addCase(deleteAsyncPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAsyncPost.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.postGlobe.findIndex(post=>post.id===action.payload)
        state.postGlobe.splice(index,1) ;
      });
  },
});

// export const { } = postsSlice.actions;

export default postsSlice.reducer;
