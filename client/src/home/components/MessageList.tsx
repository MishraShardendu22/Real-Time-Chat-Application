/* eslint-disable @typescript-eslint/no-explicit-any */
// components/MessageList.tsx
import React, { useRef } from 'react';

const MessageList: React.FC<{ messages: any[], loading: boolean, authUserId: string }> = ({ messages, loading, authUserId }) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  return (
    <div className='flex-1 overflow-auto'>
      {loading && (
        <div className="flex w-full h-full flex-col items-center justify-center gap-4 bg-transparent">
          <div className="loading loading-spinner"></div>
        </div>
      )}
      {!loading && messages.length === 0 && (
        <p className='text-center text-white items-center'>Send a message to start Conversation</p>
      )}
      {!loading && messages.length > 0 && messages.map((message) => (
        <div className='text-white' key={message?._id} ref={lastMessageRef}>
          <div className={`chat ${message.senderId === authUserId ? 'chat-end' : 'chat-start'}`}>
            <div className='chat-image avatar'></div>
            <div className={`chat-bubble ${message.senderId === authUserId ? 'bg-sky-600' : ''}`}>
              {message?.message}
            </div>
            <div className="chat-footer text-[10px] opacity-80">
              {new Date(message?.createdAt).toLocaleDateString('en-IN')} {new Date(message?.createdAt).toLocaleTimeString('en-IN', { hour: 'numeric', minute: 'numeric' })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
