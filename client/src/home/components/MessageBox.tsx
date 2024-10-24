import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Loader2 } from "lucide-react";
import userConversation from "@/zustand/useConversation";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

const MessageBox = () => {
  const { selectedConversation } = userConversation();
  const [msgs, setMsgs] = useState<{ _id: string; message: string; senderId: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getChats = async () => {
    const selectedId = selectedConversation?._id;
    if (selectedId) {
      try {
        const res = await axios.get(`/api/message/${selectedId}`);
        if (res.data?.messages) {
          setMsgs(res.data.messages);
        } else {
          setMsgs([]);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        setMsgs([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (selectedConversation) {
      setIsLoading(true);
      getChats();

      const interval = setInterval(getChats, 10000);
      return () => clearInterval(interval);
    } else {
      setMsgs([]);
      setIsLoading(false);
    }
  }, [selectedConversation]);

  if (!selectedConversation) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="w-full max-w-md p-6">
          <CardContent className="flex flex-col items-center space-y-4 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400" />
            <p className="text-lg font-medium text-gray-600">No conversation selected</p>
            <p className="text-sm text-gray-500">Choose a conversation to start messaging</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)] w-full p-4">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : msgs.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <Card className="w-full max-w-md p-6">
            <CardContent className="flex flex-col items-center space-y-4 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400" />
              <p className="text-lg font-medium text-gray-600">No messages yet</p>
              <p className="text-sm text-gray-500">Start the conversation by sending a message</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {msgs.map((msg) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`flex ${
                  msg.senderId === selectedConversation._id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    msg.senderId === selectedConversation._id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="break-words text-sm">{msg.message}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </ScrollArea>
  );
};

export default MessageBox;