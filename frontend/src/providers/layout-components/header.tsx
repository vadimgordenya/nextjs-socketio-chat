'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, message } from 'antd';
import { GetCurrentUserFromMongoDB } from '@/server-actions/users';
import CurrentUserInfo from '@/providers/layout-components/current-user-info';
import { usePathname } from 'next/navigation';
import { setCurrentUser, UserState } from '@/redux/userSlice';
import { UserType } from '@/interfaces';

export default function Header() {
  const pathName = usePathname();
  const isPublicRoute = pathName.includes('sign-in') || pathName.includes('sign-up');
  const { currentUserData }: UserState = useSelector(state => state.user);
  const [showCurrentUserInfo, setShowCurrentUserInfo] = useState(false);
  const dispatch = useDispatch();

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

        dispatch(setCurrentUser(response as UserType));
      } catch (error) {
        message.error(error.message);
      }
    }

    getCurrentUser();
  }, [isPublicRoute]);

  if (isPublicRoute || !currentUserData) {
    return null;
  }

  return (
    <div className="bg-gray-200 w-full py-5 px-3 flex justify-between items-center border-b border-solid border-gray-300">
      <div>
        <h1 className="text-2xl font-bold text-primary uppercase">Chat</h1>
      </div>
      <div className="gap-5 flex items-center">
        <span className="text-sm">{currentUserData?.name}</span>
        <Avatar
          className="cursor-pointer"
          onClick={() => setShowCurrentUserInfo(true)}
          src={currentUserData?.profilePicture}
        />
      </div>

      {showCurrentUserInfo &&
        <CurrentUserInfo
          setShowCurrentUserInfo={setShowCurrentUserInfo}
          showCurrentUserInfo={showCurrentUserInfo}
        />}
    </div>
  );
}
