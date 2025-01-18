'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, message } from 'antd';
import { GetCurrentUserFromMongoDB } from '@/server-actions/users';
import { UserType } from '@/interfaces';
import CurrentUserInfo from '@/providers/layout-components/current-user-info';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathName = usePathname();
  const isPublicRoute = pathName.includes('sign-in') || pathName.includes('sign-up');
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showCurrentUserInfo, setShowCurrentUserInfo] = useState(false);

  useEffect(() => {
    if (isPublicRoute) {
      return;
    }

    const getCurrentUser = async () => {
      try {
        const response = await GetCurrentUserFromMongoDB();

        if (response.error) {
          throw new Error(response.error);
        }

        setCurrentUser(response);
      } catch (error) {
        message.error(error.message);
      }
    }

    getCurrentUser();
  }, [isPublicRoute]);

  if (isPublicRoute) {
    return null;
  }

  return <div className="bg-gray-200 w-full p-5 flex justify-between items-center border-b border-solid border-gray-300">
    <div>
      <h1 className="text-2xl font-bold text-primary uppercase">Chat</h1>
    </div>
    <div className="gap-5 flex items-center">
      <span className="text-sm">Current user: {currentUser?.name}</span>
      <Avatar
        className="cursor-pointer"
        onClick={() => setShowCurrentUserInfo(true)}
        src={currentUser?.profilePicture}
      />
    </div>

    {showCurrentUserInfo &&
      <CurrentUserInfo
        currentUser={currentUser}
        setShowCurrentUserInfo={setShowCurrentUserInfo}
        showCurrentUserInfo={showCurrentUserInfo}
      />}
  </div>
}
