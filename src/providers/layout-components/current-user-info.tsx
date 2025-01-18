import { useClerk } from '@clerk/nextjs';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { UserType } from '@/interfaces';

export default function CurrentUserInfo({ currentUser, setShowCurrentUserInfo, showCurrentUserInfo }: {
  currentUser: UserType,
  setShowCurrentUserInfo: (flag: boolean) => void,
  showCurrentUserInfo: boolean
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { signOut } = useClerk();
  const router = useRouter();

  const userDataMap = [
    { key: 'Name', value: currentUser.name },
    { key: 'Username', value: currentUser.userName },
    { key: 'Id', value: currentUser._id },
    { key: 'Joined On', value: dayjs(currentUser.createdAt).format('DD MM YYYY hh:mm A') },
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
    {currentUser && <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <img src={currentUser.profilePicture} alt='profile' className='w-28 h-28 rounded-full' />
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
