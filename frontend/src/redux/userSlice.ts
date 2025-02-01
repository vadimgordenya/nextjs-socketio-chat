import { createSlice } from '@reduxjs/toolkit';
import { UserType } from '@/interfaces';

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

export const { setCurrentUser, setCurrentUserId } = userSlice.actions;
export default userSlice;

export interface UserState {
  currentUserData: UserType | null,
  currentUserId: string
}
