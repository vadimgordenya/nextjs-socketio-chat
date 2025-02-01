import Link from 'next/link';
import React from 'react';
import GroupForm from '@/app/(private)/groups/_components/group-form';
import { UserType } from '@/interfaces';
import UserModel from '@/models/user-model';
import ChatModel from '@/models/chat-model';

const EditGroup = async ({ params }) => {
   const { id } = params;
   const users: UserType[] = await UserModel.find({});
   const chatData = await ChatModel.findById(id);

  return (
    <div className="p-5">
      <Link href='/' className="text-primary border border-primary px-5 py-2 no-underline">Back To Chats</Link>
      <h1 className="text-primary text-xl font-bold py-2">Create Group Chat</h1>

      <GroupForm
        initialData={chatData}
        users={
          JSON.parse(JSON.stringify(users))
        }
      />
    </div>
  );
};

export default EditGroup;
