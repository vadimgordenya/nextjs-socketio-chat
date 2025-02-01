import { createSlice } from '@reduxjs/toolkit';
import { ChatType } from '@/interfaces';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    selectedChat: null
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload
    }
  }
});

export const { setChats, setSelectedChat } = chatSlice.actions;
export default chatSlice;

export interface ChatState {
  chats: ChatType[],
  selectedChat: ChatType | null
}
