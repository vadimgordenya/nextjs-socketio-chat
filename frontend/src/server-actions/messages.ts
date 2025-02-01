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

    const existingChat = await ChatModel.findById(payload.chat);
    const existingUnreadCounts = existingChat.unreadCounts;

    existingChat.users.forEach((user) => {
      const userIdInString = user.toString();

      if (userIdInString !== payload.sender) {
        existingUnreadCounts[userIdInString] = (existingUnreadCounts[userIdInString] || 0) + 1;
      }
    });

    await ChatModel.findByIdAndUpdate(payload.chat, {
      lastMessage: newMessage._id,
      unreadCounts: existingUnreadCounts
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

export const ReadAllMessages = async ({chatId, userId } : { chatId: string; userId: string; }) => {
  try {
    await MessageModel.updateMany(
      {
        chat: chatId,
        sender: { $ne: userId },
        readBy: {
          $nin: [userId]
        }
      },
      { $addToSet: { readBy: userId } }
    );

    const existingChat = await ChatModel.findById(chatId);
    const existingUnreadCounts = existingChat.unreadCounts;
    const newUnreadCounts = { ...existingUnreadCounts, [userId]: 0 };

    await ChatModel.findByIdAndUpdate(chatId, {
      unreadCounts: newUnreadCounts
    });

    return { message: "Message marked as read." };
  } catch (error) {
    return {
      error: error.message
    }
  }
}
