import { Button, Divider, message, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '@/interfaces';
import { GetAllUsers } from '@/server-actions/users';
import { UserState } from '@/redux/userSlice';
import { CreateNewChat } from '@/server-actions/chats';
import { ChatState, setChats } from '@/redux/chatSlice';

export default function NewChatModal({
  showNewChatModal,
  setShowNewChatModal
}: {
  showNewChatModal: boolean;
  setShowNewChatModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [users, setUsers] = useState<UserType[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectUserId] = useState<string, null>('');
  const { currentUserData }: UserState = useSelector(state => state.user);
  const { chats }: ChatState = useSelector(state => state.chat);
  const dispatch = useDispatch();

  const onAddToChat = async (userId: string) => {
    try {
      setSelectUserId(userId);
      setLoading(true);

      const response = await CreateNewChat({
        users: [userId, currentUserData?._id],
        createdBy: currentUserData?._id,
        isGroupChat: false
      });

      if (response.error) {
        throw new Error(response.error);
      }

      dispatch(setChats(response));
      message.success('Chat created successfully!');
      setShowNewChatModal(false);
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await GetAllUsers();

        if (response.error) {
          throw new Error('No users found.');
        }

        setUsers(response);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  return <div>
    <Modal
      open={showNewChatModal}
      onCancel={() => setShowNewChatModal(false)}
      footer={null}
      title={null}
      centered
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-primary text-center text-xl font-bold uppercase">
          Create New Chat
        </h1>
        {loading && !selectedUserId && <div className='flex justify-center my-20'><Spin /></div>}
        {!loading && users.length > 0 && (
          <div className="flex flex-col gap-5">
            {users.map((user) => {
              const chatAlreadyCreated = chats.find((chat) => chat.users.find(u => u._id === user._id));

              if (user._id === currentUserData._id || chatAlreadyCreated) {
                return null;
              }

              return (
                <>
                  <div
                    key={user._id}
                    className="flex justify-between items-center"
                  >
                    <div className='flex gap-5 items-center'>
                      <img src={user.profilePicture} alt='avatar' className="w-10 h-10 rounded-full" />
                      <span className="text-gray-500">
                      {user.name}
                    </span>
                    </div>
                    <Button
                      loading={loading && selectedUserId === user._id}
                      size="small"
                      onClick={() => onAddToChat(user._id)}
                    >Add To Chat</Button>
                  </div>
                  {users.length > 2 && <Divider className="border-gray-200 my-[1px]" />}
                </>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  </div>
}
