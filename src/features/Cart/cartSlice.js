import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteFromCart, fetchingCart, updateInCart } from './cartsApi';
const initialState = {
  Carts: [],
  status: 'idle',
};


export const fetchAsyncCart = createAsyncThunk(
  'carts/fetchcarts',
  async () => {
    const response = await fetchingCart();
    return response.data;
  }
);
export const addAsync = createAsyncThunk(
  'carts/addToCart',
  async (item) => {
    const {id,title,thumbnail,price}=item
    const response = await addToCart({id,title,thumbnail,price,quantity:1});
    return response.data;
  }
);
export const deleteAsync = createAsyncThunk(
  'carts/deleteFromCart',
  async (id) => {
     await deleteFromCart(id);
    return id;
  }
);
export const UpdateAsync = createAsyncThunk(
  'carts/updateInCart',
  async ({id,change}) => {
    const response = await updateInCart(id,change);
    return response.data;
  } 
);

export const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsyncCart.fulfilled, (state, action) => {
        state.status = 'idle';
        state.Carts = action.payload; // Assuming the payload is an array
      })
      .addCase(addAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.Carts.push(action.payload);
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.Carts.findIndex(item=>item.id===action.payload)
        state.Carts.splice(index,1);
      })
      .addCase(UpdateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.Carts.findIndex(item=>item.id===action.payload.id)
        state.Carts.splice(index,1,action.payload);
      })
     ;
  },
});

// export const { } = productsSlice.actions;

export default cartsSlice.reducer;
