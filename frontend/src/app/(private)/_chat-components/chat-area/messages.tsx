import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { MessageType } from '@/interfaces';
import { ChatState } from 'sr@c/redux/chatSlice';
import { GetChatMessages } from '@/server-actions/messages';
import Message from '@/app/(private)/_chat-components/chat-area/message';
import { UserState } from '@/redux/userSlice';
import { ReadAllMessages } from '@/server-actions/messages';
import socket from '@/config/socket-config';

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { selectedChat }: ChatState = useSelector(state => state.chat);
  const { currentUserData }: UserState = useSelector(state => state.user);
  const messagesDivRef = useRef();

  useEffect(() => {
    if (!selectedChat._id) {
      return;
    }

    const getMessages = async () => {
      setLoading(true);

      try {
        const response = await GetChatMessages(selectedChat._id);

        if (response.error) {
          throw new Error(response.error.message);
        }

        setMessages(response);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getMessages();
    ReadAllMessages({
      chatId: selectedChat._id,
      userId: currentUserData._id
    });
  }, [selectedChat]);

  useEffect(() => {
    socket.on('new-message-received', (message: MessageType) => {
      if (selectedChat._id === message.chat._id) {
        setMessages((prev) => {
          const ifMessageAlreadyExists = prev.find((msg) => msg.socketMessageId === message.socketMessageId)

          if (ifMessageAlreadyExists) {
            return prev;
          }

          return [...prev, message];
        });
      }
    })
  }, []);

  useEffect(() => {
    if (messagesDivRef.current) {
      messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight + 100;
    }
  }, [messages]);


  return (
    <div className="flex-1 p-3 overflow-y-auto" ref={messagesDivRef}>
      <div className='flex flex-col gap-3'>
        {messages.map((message: MessageType) =>
          <Message key={message._id} message={message} />
        )}
      </div>
    </div>
  );
};

export default Messages;
