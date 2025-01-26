'use server';

import ChatModel from '@/models/chat-model';
import MessageModel from '@/models/message-model';

export const SendNewMessage = async (payload: {
  text?: string;
  image?: string;
  chat: string;
  sender: string;
  readBY: string;
}) => {
  try {
    const newMessage = new MessageModel(payload);
    await newMessage.save();

    await ChatModel.findByIdAndUpdate(payload.chat, {
      lastMessage: newMessage._id
    });

    return { message: "Message sent successfully" };
  } catch (error) {
    return {
      error: error.message
    }
  }
}
