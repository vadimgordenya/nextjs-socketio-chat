import { Button, message } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserState } from '@/redux/userSlice';
import { ChatState } from '@/redux/chatSlice';
import { SendNewMessage } from '@/server-actions/messages';

const NewMessage = () => {
  const [text, setText] = useState('');
  const { currentUserData }: UserState = useSelector(state => state.user);
  const { selectedChat}: ChatState = useSelector(state => state.chat);

  const onSend = async () => {
    try {
      const dbPayload = {
        text,
        image: '',
        sender: currentUserData?._id!,
        chat: selectedChat._id!
      };
      const response = await SendNewMessage(dbPayload);

      if (response.error) {
        throw new Error(response.error);
      }

      setText('');
    } catch (error) {
      message.error(error.message);
    }
  }

  return (
    <div className="flex gap-5 p-3 bg-gray-100 border border-t border-gray-200">
      <div>

      </div>
      <div className="flex-1">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full border border-solid border-gray-300 focus:outline-none focus:border-gray-500 h-[45px] px-5"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <Button disabled={!text} type="primary" className="h-[45px]" onClick={onSend}>Send</Button>
    </div>
  );
};

export default NewMessage;
