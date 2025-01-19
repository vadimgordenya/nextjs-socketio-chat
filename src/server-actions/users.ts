'use server';
import { connectMongoDB } from '@/config/db-config';
import UserModel from '@/models/user-model';
import { currentUser } from '@clerk/nextjs/server';

connectMongoDB();

export const GetCurrentUserFromMongoDB = async () => {
  try {
    const clerkUser = await currentUser();
    // check if the user is already in the database based on clerkUserId
    const mongoUser = await UserModel.findOne({ clerkUserId: clerkUser?.id });

    if (mongoUser) {
      return JSON.parse(JSON.stringify(mongoUser));
    }

    // if the user is not in the database, create a new user in the database
    const newUserPayload = {
      clerkUserId: clerkUser.id,
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      userName: clerkUser.username,
      email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
      profilePicture: clerkUser.imageUrl
    };

    const newUser = await UserModel.create(newUserPayload);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    return {
      error: error.message
    }
  }
}

export const GetAllUsers = async () => {
  try {
    const users = await UserModel.find({});

    if (!users?.length) {
      throw new Error('Failed to get users!');
    }

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    return {
      error: error.message
    }
  }
}

export const UpdateUserProfile = async (userId: string, payload: any) => {
  try {
    const updateUser = await UserModel.findByIdAndUpdate(userId, payload, { new: true });

    return JSON.parse(JSON.stringify(updateUser));
  } catch (e) {
    return {
      error: error.message
    }
  }
}
