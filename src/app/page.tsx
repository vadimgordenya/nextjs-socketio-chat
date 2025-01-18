import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { connectMongoDB } from '@/config/db-config';
import { GetCurrentUserFromMongoDB } from '@/server-actions/users';

connectMongoDB();

export default async function Home() {
  const { userName, name, email } = await GetCurrentUserFromMongoDB();

  return (
    <>
      <h1>NextJS - SocketIO Chat</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <div className='flex flex-col gap-3 text-3xl'>
        <span>Name: {name}</span>
        <span>User Name: {userName}</span>
        <span>Email: {email || ''}</span>
      </div>
    </>
  )
}
