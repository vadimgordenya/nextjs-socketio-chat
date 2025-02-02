import { Button, message } from 'antd';
import dayjs from 'dayjs';
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserState } from '@/redux/userSlice';
import { ChatState } from '@/redux/chatSlice';
import { SendNewMessage } from '@/server-actions/messages';
import socket from '@/config/socket-config';
import ImageSelector from '@/app/(private)/_chat-components/chat-area/image-selector';
import { uploadImageToFirebaseStorageAndReturnUrl } from '@/helpers/image-upload';

const NewMessage = () => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const { currentUserData }: UserState = useSelector(state => state.user);
  const { selectedChat}: ChatState = useSelector(state => state.chat);

  const onSend = async () => {
    if (!text && !selectedImageFile) {
      return;
    }

    setLoading(true);

    try {
      let image = '';

      if (selectedImageFile) {
        image = await uploadImageToFirebaseStorageAndReturnUrl(selectedImageFile);
      }

      const commonPayload = {
        text,
        image,
        socketMessageId: dayjs().unix(),
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
        readBy: []
      };

      const socketPayload = {
        ...commonPayload,
        chat: selectedChat,
        sender: currentUserData
      };

      socket.emit('send-new-message', socketPayload);

      setText('');
      setSelectedImageFile(null);
      setShowImageSelector(false);
      setShowEmojiPicker(false);

      const dbPayload = {
        ...commonPayload,
        sender: currentUserData?._id!,
        chat: selectedChat._id!
      };
      SendNewMessage(dbPayload);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (text) {
      socket.emit('typing', {
        chat: selectedChat,
        senderId: currentUserData._id,
        senderName: currentUserData.name.split(' ')[0]
      });
    }
  }, [selectedChat, text]);

  return (
    <div className="flex gap-5 p-3 bg-gray-100 border border-t border-gray-200 relative">
      <div className="flex gap-5">
        {showEmojiPicker && (
          <div className="absolute lef-10 bottom-14">
            <EmojiPicker
              height={350}
              onEmojiClick={(emojiObject) => {
                setText((prevText) => prevText + emojiObject.emoji);
                inputRef.current?.focus();
              }}
            />
          </div>
        )}
        <Button onClick={() => setShowImageSelector(!showImageSelector)} className="border-gray-200 h-[45px]">
          { showEmojiPicker ? <i className="ri-image-ai-line"></i> : <i className="ri-folder-image-line"></i>}
        </Button>
        <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="border-gray-200 h-[45px]">
          { showEmojiPicker ? <i className="ri-keyboard-line"></i> : <i className="ri-emoji-sticker-line"></i>}
        </Button>
      </div>
      <div className="flex-1">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message"
          className="w-full border border-solid border-gray-300 focus:outline-none focus:border-gray-500 h-[45px] px-5"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={async (event) => {
            if (event.key === 'Enter') {
              await onSend();
            }
          }}
        />
      </div>
      <Button disabled={!text} type="primary" className="h-[45px]" onClick={onSend}>Send</Button>

      {showImageSelector && <ImageSelector
        showImageSelector={showImageSelector}
        setShowImageSelector={setShowImageSelector}
        selectedImageFile={selectedImageFile}
        setSelectedImageFile={setSelectedImageFile}
        onSend={onSend}
        loading={loading}
      />}
    </div>
  );
};

export default NewMessage;
