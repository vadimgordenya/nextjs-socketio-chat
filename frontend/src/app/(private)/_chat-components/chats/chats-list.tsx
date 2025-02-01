import { message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '@/redux/chatSlice';
import { UserState } from '@/redux/userSlice';
import { GetAllChats } from '@/server-actions/chats';
import { ChatState } from '@/redux/chatSlice';
import ChatCard from '@/app/(private)/_chat-components/chats/chat-card';

export default function ChatsList() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUserData }: UserState = useSelector(state => state.user);
  const { chats }: ChatState = useSelector(state => state.chat);

  useEffect(() => {
    const getChats = async () => {
      try {
        setLoading(true);
        const response = await GetAllChats(currentUserData._id);

        if (response.error) {
          throw new Error(response.error);
        }

        dispatch(setChats(response));
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (currentUserData?._id) {
      getChats();
    }
  }, [currentUserData]);

  return <div>
    {chats.length > 0 && (
      <div className='flex flex-col gap-5 mt-5'>
        {chats.map((chat) => <ChatCard chat={chat} />)}
      </div>
    )}
    {loading && (
      <div className="flex mt-32 items-center justify-center">
        <div className="flex flex-col">
          <Spin />
          <span className="text-gray-500 text-sm my-5">Loading chats...</span>
        </div>
      </div>
    )}
  </div>
}
