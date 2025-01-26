'use server';
import ChatModel from '@/models/chat-model';

export const CreateNewChat = async (payload) => {
  try {
    await ChatModel.create(payload);

    const newChats = await ChatModel.find({
      users: {
        $in: [payload.createdBy]
      }
    }).populate('users').sort({ updatedAt: -1 });

    return JSON.parse(JSON.stringify(newChats));
  } catch (error) {
    return {
      error: error.message
    }
  }
};

export const GetAllChats = async (userId) => {
  try {
    const chats = await ChatModel.find({
      users: {
        $in: [userId]
      }
    }).populate('users').populate('lastMessage').sort({ updatedAt: -1 });

    return JSON.parse(JSON.stringify(chats));
  } catch (error) {
    return {
      error: error.message
    }
  }
}
