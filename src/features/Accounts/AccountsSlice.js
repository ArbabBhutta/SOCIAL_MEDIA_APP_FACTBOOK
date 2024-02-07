import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addUser, addUsersFriends, fetchingUsers } from './AccountsApi';
const initialState = {
  Users: [],
  status: 'idle',
};


export const fetchAsyncUsers = createAsyncThunk(
  'users/fetchingUsers',
  async () => {
    const response = await fetchingUsers();
    return response.data;
  }
);
export const addAsyncUser = createAsyncThunk(
  'users/addUsers',
  async (user) => {
    const response = await addUser(user);
    return response.data;
  }
);
export const addAsyncFriend = createAsyncThunk(
  'users/addUsersFriends',
  async ({id,user}) => {
    const response = await addUsersFriends(id,user);
    return response.data;
  }
);

export const accountsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.Users = action.payload;
      })
      .addCase(addAsyncUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAsyncUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.Users.push(action.payload)
      })
      .addCase(addAsyncFriend.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAsyncFriend.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.Users.findIndex(user=>user.id===action.payload.id)
        state.Users.splice(index,1,action.payload)
      });
  },
});

// export const { } = accountsSlice.actions;

export default accountsSlice.reducer;
