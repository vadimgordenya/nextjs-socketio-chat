import React from 'react';
import { useSelector } from 'react-redux';
import Recipient from '@/app/(private)/_chat-components/chat-area/recipient';
import { ChatState } from '@/redux/chatSlice';

export default function ChatArea() {
  const { selectedChat }: ChatState = useSelector(state => state.chat);

  if (!selectedChat) {
    return <div className="flex-1 flex flex-col justify-center items-center h-full">
      <img src='/chat-icon.jpg' alt='image' className="h-60" />
      <span className="font-semibold text-gray-600 text-sm">
        Select a chat to start messaging.
      </span>
    </div>
  }

  return <div className="flex-1">
    {selectedChat && <Recipient />}
  </div>
}
