import React from 'react';
import { MessageType } from '@/interfaces';
import { useSelector } from 'react-redux';
import { formatDateTime } from '@/helpers/date-formats';
import { ChatState } from '@/redux/chatSlice';
import { UserState } from '@/redux/userSlice';

const Message = ({ message }: { message: MessageType }) => {
  const { selectedChat }: ChatState = useSelector(state => state.chat);
  const { currentUserData }: UserState = useSelector(state => state.user);

  const isLoggedInUserMessage = currentUserData._id === message.sender._id;

  return isLoggedInUserMessage ? (
    <div className="flex justify-end gap-x-2">
      <div className="flex flex-col gap-2">
        <p className="bg-primary text-white py-1 px-5 rounded-xl rounded-tl-none text-sm">{message.text}</p>
        <span className="text-gray-500 text-xs">
          {formatDateTime(message.createdAt)}
        </span>
      </div>
      <img src={message.sender.profilePicture} alt='avatar' className="w-6 h-6 rounded-full" />
    </div>
  ) : (
    <div className="flex justify-start gap-x-2">
      <img src={message.sender.profilePicture} alt='avatar' className="w-6 h-6 rounded-full" />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col bg-gray-200 py-1 px-7 rounded-xl rounded-tr-none ">
          <span className="text-blue-500 text-xs font-semibold">{message.sender.name}</span>
          <p className="text-black m-none pt-1 text-sm">
            {message.text}
          </p>
        </div>
        <span className="text-gray-500 text-xs">
          {formatDateTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Message;
