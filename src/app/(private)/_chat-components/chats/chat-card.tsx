import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '@/redux/userSlice';
import { setSelectedChat } from '@/redux/chatSlice';
import { ChatState } from '@/redux/chatSlice';
import { ChatType } from '@/interfaces';
import { formatDateTime } from '@/helpers/date-formats';

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

  if (chat.lastMessage) {
    lastMessage = chat.lastMessage.text;
    lastMessageSenderName = chat.lastMessage.sender._id === currentUserData._id
      ? 'You'
      : chat.lastMessage.sender.name.split(' ')[0];
    lastMessageTime = formatDateTime(chat.lastMessage.createdAt);
  }

  const unreadCounts = () => {
    if (!chat.unreadCounts?.[currentUserData?._id]) {
      return null;
    }

    return (
      <div className="bg-green-700 h-5 w-5 rounded-full flex justify-center items-center">
        <span className="text-white text-xs">
          {chat.unreadCounts[currentUserData?._id]}
        </span>
      </div>
    );
  }

  return <div
    className={`flex justify-between hover:bg-gray-100 py-3 px-2 rounded cursor-pointer
    ${selectedChat?._id === chat?._id ? 'bg-gray-100 border border-gray-300' : ''}
    `}
    onClick={() => dispatch(setSelectedChat(chat))}
  >
    <div className="flex gap-5 items-center">
      <img src={chatImage} alt='avatar' className="w-10 h-10 rounded-full" />
      <div className="flex flex-col gap1">
        <span className="text-gray-700 text-sm">{chatName}</span>
        <span className="text-gray-700 text-sm">{lastMessageSenderName}: {lastMessage}</span>
      </div>
    </div>
    <div>
      {unreadCounts()}
      <span className="text-gray-500 text-xs">{lastMessageTime}</span>
    </div>
  </div>
}
