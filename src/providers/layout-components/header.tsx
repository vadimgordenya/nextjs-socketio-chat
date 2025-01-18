import React from 'react';

export default function Header() {
  return <div className="bg-gray-200 w-full p-5 flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-bold text-primary">Chat</h1>
    </div>
    <div>
      <span>Current user</span>
    </div>
  </div>
}
