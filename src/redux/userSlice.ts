import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUserData: null,
    currentUserId: ''
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUserData = action.payload;
    },
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    }
  }
});

export const { setCurrentUser, setCurrentUserId } = userSlice.reducer;
export default userSlice;
