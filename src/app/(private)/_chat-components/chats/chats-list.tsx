import { message } from 'antd';
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
    <div className='flex flex-col gap-5 mt-5'>
      {chats.map((chat) => <ChatCard chat={chat} />)}
    </div>
  </div>
}
