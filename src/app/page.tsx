import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { connectMongoDB } from '@/config/db-config';
import { GetCurrentUserFromMongoDB } from '@/server-actions/users';

export default async function Home() {
  return (
    <div className="p-5">
      <h1 className="text-sm">Homepage</h1>
    </div>
  )
}
