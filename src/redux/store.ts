import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/redux/userSlice';
import chatSlice from '@/redux/chatSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export default store;
