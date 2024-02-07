import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/Posts/postsSlice"
import cartReducer from "../features/Cart/cartSlice"
import accountReducer from "../features/Accounts/AccountsSlice"

export const store = configureStore({
  reducer: {
    posted: postsReducer,
    user:accountReducer,
    cart:cartReducer
  },
});
