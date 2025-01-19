import React from 'react';
import { useSelector } from 'react-redux';
import { ChatState } from '@/redux/chatSlice';
import { UserState } from 'src/redux/userSlice';

const Recipient = () => {
  const { selectedChat }: ChatState = useSelector(state => state.chat);
  const { currentUserData }: UserState = useSelector(state => state.user);

  let chatName = '';
  let chatImage = '';

  if (selectedChat.isGroupChat) {
    chatName = selectedChat.groupName;
    chatImage = selectedChat.groupProfilePicture;
  } else {
    const recipient = selectedChat.users.find((user) => user._id !== currentUserData?._id);

    chatName = recipient.name;
    chatImage = recipient.profilePicture;
  }

  return (
    <div className="flex justify-between py-3 px-5 border-0 border-b border-gray-200 bg-gray-400/5">
      <div className="flex gap-5 items-center">
        <img src={chatImage} alt='avatar' className="w-10 h-10 rounded-full" />
        <span className="text-gray-700 text-sm">{chatName}</span>
      </div>
    </div>
  );
};

export default Recipient;
