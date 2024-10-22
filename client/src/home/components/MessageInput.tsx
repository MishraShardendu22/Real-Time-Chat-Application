// components/MessageInput.tsx
import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';

const MessageInput: React.FC<{ onSend: (message: string) => void, sending: boolean }> = ({ onSend, sending }) => {
  const [sendData, setSendData] = useState("");

  const handleMessages = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendData(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendData.trim()) {
      onSend(sendData);
      setSendData('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='rounded-full text-black'>
      <div className='w-full rounded-full flex items-center bg-white'>
        <input
          value={sendData}
          onChange={handleMessages}
          required
          id='message'
          type='text'
          className='w-full bg-transparent outline-none px-4 rounded-full'
        />
        <button type='submit'>
          {sending ? <div className='loading loading-spinner'></div> :
            <IoSend size={25} className='text-sky-700 cursor-pointer rounded-full bg-gray-800 w-10 h-auto p-1' />
          }
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
