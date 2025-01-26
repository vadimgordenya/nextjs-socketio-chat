'use server';

import ChatModel from '@/models/chat-model';
import MessageModel from '@/models/message-model';

export const SendNewMessage = async (payload: {
  text?: string;
  image?: string;
  chat: string;
  sender: string;
  readBy: string;
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

export const GetChatMessages = async (chatId: string) => {
  try {
    const messages = await MessageModel.find({ chat: chatId })
      .populate('sender')
      .sort({ createAt: 1 });

    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    return {
      error: error.message
    }
  }
}
