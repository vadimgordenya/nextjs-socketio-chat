import { message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '@/redux/chatSlice';
import { UserState } from '@/redux/userSlice';
import { GetAllChats } from '@/server-actions/chats';
import { ChatState } from '@/redux/chatSlice';
import ChatCard from '@/app/(private)/_chat-components/chats/chat-card';
import socket from '@/config/socket-config';
import { MessageType } from '@/interfaces';
import store from '@/redux/store';
import { ChatType } from '@/interfaces/index';

export default function ChatsList() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUserData }: UserState = useSelector(state => state.user);
  const { chats, selectedChat }: ChatState = useSelector(state => state.chat);

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

  useEffect(() => {
    socket.on('new-message-received', (message: MessageType) => {
      const { chats }: ChatState = store.getState().chat;
      let prevChats = [...chats];

      const indexOfChatToUpdate = prevChats.findIndex((chat) => chat._id === message.chat._id);

      if (indexOfChatToUpdate === -1) {
        return;
      }

      let chatToUpdate = prevChats[indexOfChatToUpdate];

      if (chatToUpdate.lastMessage.socketeMessageId === message.socketMessageId) {
        return;
      }

      let chatToUpdateCopy: ChatType = { ...chatToUpdate };

      chatToUpdateCopy.lastMessage = message;
      chatToUpdateCopy.updatedAt = message.createdAt;
      chatToUpdateCopy.unreadCounts = { ...chatToUpdate.unreadCounts };

      if (message.sender?._id !== currentUserData?._id && selectedChat?._id !== message.chat?._id) {
        chatToUpdateCopy.unreadCounts[currentUserData._id] = chatToUpdateCopy.unreadCounts[currentUserData._id] + 1;
      }

      prevChats[indexOfChatToUpdate] = chatToUpdateCopy;

      prevChats = [
        prevChats[indexOfChatToUpdate],
        ...prevChats.filter((chat) => chat._id !== message.chat._id)
      ];

      console.log('prevChats', prevChats);

      dispatch(setChats(prevChats));
    });
  }, [selectedChat]);


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
