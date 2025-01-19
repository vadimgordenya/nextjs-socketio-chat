'use client';
import ChatArea from '@/app/(private)/_chat-components/chat-area/index';
import Chats from '@/app/(private)/_chat-components/chats/index';
import { Divider } from 'antd';

export default async function Home() {
  return (
    <div className="flex h-[90vh]">
      <Chats />
      <Divider type="vertical" className="h-full border-gray-300 m-0" />
      <ChatArea />
    </div>
  )
}
