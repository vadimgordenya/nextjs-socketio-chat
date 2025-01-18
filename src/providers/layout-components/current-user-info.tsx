import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useClerk } from '@clerk/nextjs';
import { Button, Divider, Drawer, message } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { UserType } from '@/interfaces';

export default function CurrentUserInfo({ setShowCurrentUserInfo, showCurrentUserInfo }: {
  setShowCurrentUserInfo: (flag: boolean) => void,
  showCurrentUserInfo: boolean
}) {
  const { currentUserData }: UserType = useSelector(state => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const { signOut } = useClerk();
  const router = useRouter();

  const userDataMap = [
    { key: 'Name', value: currentUserData.name },
    { key: 'Username', value: currentUserData.userName },
    { key: 'Id', value: currentUserData._id },
    { key: 'Joined On', value: dayjs(currentUserData.createdAt).format('DD MM YYYY hh:mm A') },
  ];
  const getProperty = (key: string, value: string) => (
    <div className='flex flex-col'>
      <span className='font-semibold text-gray-700'>{key}</span>
      <span className='text-gray-600'>{value}</span>
    </div>);

  const onLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      setShowCurrentUserInfo(false);
      message.success('Logged out successfully');
      router.push('/sign-in');
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return <Drawer
    open={showCurrentUserInfo}
    onClose={() => setShowCurrentUserInfo(false)}
    title='Profile'
  >
    {currentUserData && <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <img src={currentUserData.profilePicture} alt='profile' className='w-28 h-28 rounded-full' />
        <span className='text-gray-500 cursor-pointer'>Change Profile Picture</span>
      </div>

      <Divider className='my-1 border-gray-200' />

      <div className='flex flex-col gap-5'>
        {userDataMap.map(({ key, value }) => getProperty(key, value))}
      </div>

      <div className="mt-5">
        <Button
          loading={loading}
          onClick={onLogout}
          className="w-full"
          block
        >
          Logout
        </Button>
      </div>
    </div>}
  </Drawer>;
}
