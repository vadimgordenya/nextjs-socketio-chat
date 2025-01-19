import { Button } from 'antd';
import React from 'react';

const NewMessage = () => {
  return (
    <div className="flex gap-5 p-3 bg-gray-100 border border-t border-gray-200">
      <div>

      </div>
      <div className="flex-1">
        <input
          type="text"
          placeholder="Type a message"
          className="w-full border border-solid border-gray-300 focus:outline-none focus:border-gray-500 h-[45px] px-5"
        />
      </div>
      <Button type="primary" className="h-[45px]">Send</Button>
    </div>
  );
};

export default NewMessage;
