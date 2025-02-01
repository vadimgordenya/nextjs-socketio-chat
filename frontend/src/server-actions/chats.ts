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
    }).populate('users')
      .populate('lastMessage')
      .populate('createdBy')
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'sender'
        }
      })
      .sort({ updatedAt: -1 });

    return JSON.parse(JSON.stringify(chats));
  } catch (error) {
    return {
      error: error.message
    }
  }
}

export const GetChatDataById = async (chatId: string) => {
  try {
    const chat = await ChatModel.findById(chatId)
      .populate('users')
      .populate('lastMessage')
      .populate('createdBy')
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'sender'
        }
      });

    return JSON.parse(JSON.stringify(chat));
  } catch (error) {
    return {
      error: error.message
    }
  }
};

export const UpdateChat = async ({ chatId, payload }: { chatId: string; payload: any }) => {
  try {
    await ChatModel.findByIdAndUpdate(chatId, payload);

    return {
      message: "Chat updated successfully!"
    }
  } catch (error) {
    return {
      message: error.message
    }
  }
}
