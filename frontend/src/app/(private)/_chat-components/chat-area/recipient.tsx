import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatState } from '@/redux/chatSlice';
import RecipientInfo from '@/app/(private)/_chat-components/chat-area/recipients-info';
import { UserState } from '@/redux/userSlice';
import socket from '@/config/socket-config';

const Recipient = () => {
  const [typing, setTyping] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [showRecipientInfo, setShowRecipientInfo] = useState(false);
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

  const typingAnimation = () => {
    if (typing) {
      return <span className="text-green-700 font-semibold text-xs">
        {senderName ? `${senderName} is typing...` : 'Typing...'}
      </span>
    }
  }

  useEffect(() => {
    socket.on('typing', ({ chat, senderName }) => {
      if (selectedChat._id === chat._id) {
        setTyping(true);

        if (chat.isGroupChat) {
          setSenderName(senderName);
        }
      }

      setTimeout(() => {
        setTyping(false);
      }, 2000);
    });

    return () => {
      socket.off('typing');
    }
  }, [selectedChat])

  return (
    <div className="flex justify-between py-3 px-5 border-0 border-b border-gray-200 bg-gray-400/5">
      <div
        className="flex gap-5 items-center cursor-pointer"
        onClick={() => {
          setShowRecipientInfo(!showRecipientInfo);
        }}
      >
        <img src={chatImage} alt='avatar' className="w-10 h-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <span className="text-gray-700 text-sm">{chatName}</span>
          {typingAnimation()}
        </div>
      </div>
      {showRecipientInfo && (
        <RecipientInfo showRecipientInfo={showRecipientInfo} setShowRecipientInfo={setShowRecipientInfo} />
      )}
    </div>
  );
};

export default Recipient;
