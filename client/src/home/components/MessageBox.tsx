import userConversation from "@/zustand/useConversation";
import axios from "axios";
import { useState, useEffect } from "react";

const MessageBox = () => {
  const { selectedConversation } = userConversation();
  const [msgs, setMsgs] = useState<{ _id: string; message: string; senderId: string }[]>([]);

  const getChats = async () => {
    const selectedId = selectedConversation?._id;
    if (selectedId) {
      const res = await axios.get(`/api/message/${selectedId}`);
      setMsgs(res.data.messages);
    }
  };

  useEffect(() => {
    getChats();
  }, [selectedConversation]);

  return (
    <div>
      {msgs.map((msg) => (
        <div key={msg._id}>
          <p style={{ color: msg.senderId === selectedConversation?._id ? 'blue' : 'red' }}>
            {msg.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
