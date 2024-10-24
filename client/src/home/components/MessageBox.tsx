import userConversation from "@/zustand/useConversation";
import axios from "axios";
import { useState, useEffect } from "react";

const MessageBox = () => {
  const { selectedConversation } = userConversation();
  const [msgs, setMsgs] = useState<{ _id: string; message: string; senderId: string }[]>([]);

  const getChats = async () => {
    const selectedId = selectedConversation?._id;
    if (selectedId) {
      try {
        const res = await axios.get(`/api/message/${selectedId}`); // Fetching messages
        if (res.data?.messages) {
          setMsgs(res.data.messages);
        } else {
          setMsgs([]);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        setMsgs([]);
      }
    }
  };

  useEffect(() => {
    if (selectedConversation) {
      getChats(); // Initial fetch when selectedConversation changes

      // Set up an interval to fetch chats every 5 seconds
      const interval = setInterval(getChats, 10000); // 5000 ms = 5 seconds

      // Clear interval on component unmount or when selectedConversation changes
      return () => clearInterval(interval);
    } else {
      setMsgs([]);
    }
  }, [selectedConversation]);

  if (!selectedConversation) {
    return <div>No conversation selected</div>;
  }

  return (
    <div>
      {msgs.length === 0 ? (
        <div>No Chat yet</div>
      ) : (
        msgs.map((msg) => (
          <div key={msg._id}>
            <p style={{ color: msg.senderId === selectedConversation?._id ? 'blue' : 'red' }}>
              {msg.message}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MessageBox;
