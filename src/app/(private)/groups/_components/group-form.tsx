'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Input, message, Upload } from 'antd';
import { uploadImageToFirebaseStorageAndReturnUrl } from '@/helpers/image-upload';
import { UserType } from '@/interfaces/index';
import { UserState } from '@/redux/userSlice';
import { CreateNewChat } from '@/server-actions/chats';

const GroupForm = ({ users }: { users: UserType[] }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { currentUserData }: UserState = useSelector(state => state.user);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<File>();

  const onSelectUser = (user) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(user._id)) {
        return prevSelected.filter((userId) => userId !== user._id);
      }

      return [...prevSelected, user._id];
    })
  };

  const onFinish = async (values) => {
    try {
      setLoading(true)

      const payload = {
        groupName: values.groupName,
        groupBio: values.groupDescription,
        users: [...selectedUsers, currentUserData._id],
        createdBy: currentUserData._id,
        isGroupChat: true,
        groupProfilePicture: ''
      };

      if (selectedProfilePicture) {
        payload.groupProfilePicture = await uploadImageToFirebaseStorageAndReturnUrl(selectedProfilePicture);
      }

      const response = await CreateNewChat(payload);

      if (response.error) {
        throw new Error(response.error)
      }

      message.success('Group created successfully!');
      router.refresh();
      router.push('/');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col gap-5">
        <span className="text-gray-500 text-xs">
          Select user to add to group ({selectedUsers.length})
        </span>
        {users.map((user) => user._id === currentUserData?._id ? null : (
          <label key={user._id} htmlFor={user._id} className="flex gap-5 items-center cursor-pointer">
            <input id={user._id} type='checkbox' checked={selectedUsers.includes(user._id)} onChange={() => {
              onSelectUser(user);
            }} />
            <img src={user.profilePicture} alt='avatar' className="w-10 h-10 rounded-full" />
            <span className="text-gray-500 text-sm">{user.name}</span>
          </label>
        ))}
      </div>
      <div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="groupName" label="Group Name"
            rules={[{required: true, message: 'Please input group name!'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="groupDescription" label="Group Description">
            <Input />
          </Form.Item>

          <Upload
            beforeUpload={(file) => {
              setSelectedProfilePicture(file);
              return false;
            }}
            maxCount={1}
            listType="picture-card"
          >
            <span className="p-3 text-xs">Upload Profile Picture</span>
          </Upload>

          <div className="flex justify-end gap-5">
            <Button>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Create Group
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default GroupForm;
