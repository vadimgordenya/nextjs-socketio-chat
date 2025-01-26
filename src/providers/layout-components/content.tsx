import { usePathname } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '@/components/loader';
import { UserState } from '@/redux/userSlice';

export default function Content({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const publicRoutes = ['sign-in', 'sign-up'].includes(pathName);
  const {currentUserData}: UserState = useSelector(state => state.user);

  if (publicRoutes) {
    return children;
  }

  if (!currentUserData) {
    return <Loader />
  }

  return <div>{children}</div>
}
