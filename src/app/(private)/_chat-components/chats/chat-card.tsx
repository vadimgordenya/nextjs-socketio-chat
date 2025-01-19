import React from 'react';
import { ChatType } from '@/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '@/redux/userSlice';
import { setSelectedChat } from '@/redux/chatSlice';
import { ChatState } from '@/redux/chatSlice';

export default function ChatCard({ chat }: { chat: ChatType }) {
  const dispatch = useDispatch();
  const { selectedChat }: ChatState = useSelector(state => state.chat);
  const { currentUserData }: UserState = useSelector(state => state.user);
  let chatName = '';
  let chatImage = '';

  let lastMessage = '';
  let lastMessageSenderName = '';
  let lastMessageTime = '';

  if (chat.isGroupChat) {
    chatName = chat.groupName;
    chatImage = chat.groupPicture;
  } else {
    const recipient = chat.users.find(user => user._id !== currentUserData._id);

    chatName = recipient.name;
    chatImage = recipient.profilePicture;
  }

  return <div
    className={`flex justify-between hover:bg-gray-100 py-3 px-2 rounded cursor-pointer
    ${selectedChat?._id === chat?._id ? 'bg-gray-100 border border-gray-300' : ''}
    `}
    onClick={() => dispatch(setSelectedChat(chat))}
  >
    <div className="flex gap-5 items-center">
      <img src={chatImage} alt='avatar' className="w-10 h-10 rounded-full" />
      <span className="text-gray-700 text-sm">{chatName}</span>
    </div>
    <div>
      <span>{lastMessageTime}</span>
    </div>
  </div>
}
