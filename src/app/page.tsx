import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
  const { username, firstName, lastName, emailAddresses } = await currentUser();

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
        <span>First Name: {firstName}</span>
        <span>Last Name: {lastName}</span>
        <span>User Name: {username}</span>
        <span>Email: {emailAddresses?.[0]?.emailAddress || ''}</span>
      </div>
    </>
  )
}
