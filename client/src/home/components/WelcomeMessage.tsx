// components/WelcomeMessage.tsx
import React from 'react';
import { TiMessages } from "react-icons/ti";

const WelcomeMessage: React.FC<{ username: string }> = ({ username }) => (
  <div className='flex items-center justify-center w-full h-full'>
    <div className='px-4 text-center text-2xl text-gray-950 font-semibold flex flex-col items-center gap-2'>
      <p className='text-2xl'>Welcome!!👋 {username}😉</p>
      <p className="text-lg">Select a chat to start messaging</p>
      <TiMessages className='text-6xl text-center' />
    </div>
  </div>
);

export default WelcomeMessage;
