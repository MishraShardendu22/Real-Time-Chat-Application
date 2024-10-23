/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthContext } from "@/context/authContext";
import { useContext, useState, useEffect } from "react";
import userConversation from "@/zustand/useConversation";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Removed UserCircle since it's not used
import axios from "axios";

const MessageContainer = () => {
  const useAuth = useContext(AuthContext);
  const authUser = useAuth?.authUser;
  const navigate = useNavigate();
  const { messages, selectedConversation, setSelectedConversation } = userConversation();

  const [loading, setLoading] = useState(false);

  const viewUser = () => {
    navigate("/profileReciver");
  };

  useEffect(() => {
    console.log(messages);
    console.log(selectedConversation?._id);
  }, [messages, selectedConversation]);

    const filteredMessages = messages.filter((message) => {
      return (
          (message.senderId === authUser?._id && message.reciverId === selectedConversation?._id) ||
          (message.senderId === selectedConversation?._id && message.reciverId === authUser?._id)
      );
    });


  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="py-4 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {selectedConversation == null ? (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Welcome back, <strong className="text-sm text-gray-500 dark:text-gray-400">{authUser?.username}</strong> Start Chatting !!
                    </h1>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <div 
                        onClick={viewUser}
                        className="relative w-12 h-12 rounded-full cursor-pointer transform transition-all duration-300 hover:scale-105"
                      >
                        <div className="absolute inset-0 rounded-full border-2 border-blue-500 dark:border-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                        
                        <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800">
                          <img
                            src={selectedConversation.profilepic}
                            alt={`${selectedConversation.username}'s profile`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedConversation.username}
                      </h2>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {selectedConversation.gender}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {selectedConversation && (
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Chats
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Display the filtered messages */}
      <div className="p-4">
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          <div className="flex flex-col space-y-2">
            {filteredMessages.map((message, index) => (
              <div key={index} className={`message ${message.senderId === authUser?._id ? 'text-left' : 'text-right'}`}>
                <div className={`inline-block p-2 rounded-lg max-w-xs ${message.senderId === authUser?._id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MessageContainer;
