import React, { useEffect, useState } from 'react';
import userConversation from '../../zustand/useConversation';
import { useAuth } from '../../context/authContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import WelcomeMessage from './WelcomeMessage';
import axios from 'axios';

const MessageContainer: React.FC<{ selectedConversation: any, onBackUser: () => void }> = ({ selectedConversation, onBackUser }) => {
  const { messages, setMessage } = userConversation();
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      if (selectedConversation?._id) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3000/api/message/${authUser._id}`);
          const data = response.data;
          if (!data.success) {
            console.log(data.message);
          } else {
            setMessage(data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessage]);

  const handleSendMessage = async (message: string) => {
    setSending(true);
    try {
      const res = await axios.post(`http://localhost:3000/api/message/send/${selectedConversation?._id}`, { messages: message });
      const data = res.data;
      if (!data.success) {
        console.log(data.message);
      } else {
        setMessage([...messages, data]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className='md:min-w-[500px] h-full flex flex-col py-2'>
      {selectedConversation === null ? (
        <WelcomeMessage username={authUser.username} />
      ) : (
        <>
          <div className='flex justify-between gap-1 bg-sky-600 md:px-2 rounded-lg h-10 md:h-12'>
            <div className='flex gap-2 md:justify-between items-center w-full'>
              <button onClick={onBackUser} className='bg-white rounded-full px-2 py-1'>
                {/* Back Button Icon */}
              </button>
              <span className='text-gray-950 self-center text-sm md:text-xl font-bold'>
                {selectedConversation?.username}
              </span>
            </div>
          </div>
          <MessageList messages={messages} loading={loading} authUserId={authUser._id} />
          <MessageInput onSend={handleSendMessage} sending={sending} />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
