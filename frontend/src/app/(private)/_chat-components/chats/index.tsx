import React from 'react';
import ChatsHeader from '@/app/(private)/_chat-components/chats/chats-header';
import ChatsList from '@/app/(private)/_chat-components/chats/chats-list';

export default function Chats() {
  return <div className="w-[400px] h-full p-3">
    <ChatsHeader />
    <ChatsList />
  </div>
}
