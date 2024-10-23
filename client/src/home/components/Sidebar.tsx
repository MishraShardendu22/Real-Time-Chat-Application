/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useAuth } from "@/context/authContext";
import userConversation from "@/zustand/useConversation";
import axios from "axios";
import { motion } from "framer-motion";
import { Search, MessageSquare, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";


interface User {
  _id: string;
  username: string;
  fullname: string;
  profilepic: string;
}

interface UserCardProps {
  user: User;
  onClick: () => void;
}

const UserSkeleton: React.FC = () => (
  <div className="flex items-center space-x-4 p-4">
    <Skeleton className="h-10 w-10 rounded-full" />
    <Skeleton className="h-4 w-[120px]" />
  </div>
);

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => (
  <motion.div
    // Use specific HSL or RGBA values for animation
    initial={{ backgroundColor: "rgba(128, 0, 128, 0.5)" }}
    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
    onClick={onClick}
    className="p-3 rounded-lg cursor-pointer"
  >
    <div className="flex items-center space-x-3">
      <img 
        src={user.profilepic} 
        alt={`${user.username}'s profile`} 
        className="w-10 h-10 rounded-full object-cover border border-border"
      />
      <span className="font-medium text-sm text-foreground">
        {user.fullname || user.username}
      </span>
    </div>
  </motion.div>
);

const SearchModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { setSelectedConversation } = userConversation();
  const [searchUser, setSearchUser] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchedUser, setSearchedUser] = useState<User[]>([]);
  const authContext = useAuth();
  const authUser = authContext?.authUser;
  
  const handleSearch = async () => {
    if (searchUser) {
      setSearchLoading(true);
      // Removed this line as it sets searchedUser incorrectly
      // setSearchedUser(authUser?._id);
      try {
        const res = await axios.get(`/api/user/search?search=${searchUser}`);
        if (res.status === 200) {
          await new Promise((resolve) => setTimeout(resolve, 1000)); 
          setSearchedUser(res.data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setSearchLoading(false);
      }
    } else {
      setSearchedUser([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/90 flex flex-col items-center justify-center p-4"
    >
      <div className="bg-background p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Search Users</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
            className="h-9"
          />
          <Button 
            onClick={handleSearch} 
            size="icon"
            className="h-9 w-9"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-64">
          <div className="space-y-2">
            {searchLoading ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <UserSkeleton key={i} />
                ))}
              </>
            ) : searchedUser.length === 0 ? (
              <div className="text-center text-muted-foreground">
                <Users className="h-12 w-12 mb-2 opacity-50" />
                <p>No users found</p>
              </div>
            ) : (
              searchedUser.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  onClick={() => {
                    setSelectedConversation(user);
                    onClose();
                  }}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </motion.div>
  );
};

const Sidebar: React.FC = () => {
  const authContext = useAuth();
  // console.log(authContext)
  const authUser = authContext?.authUser;
  // console.log(authUser)

  const { messages,setMessage, setSelectedConversation } = userConversation();
  const [loading, setLoading] = useState<boolean>(false);
  const [chats, setChats] = useState<User[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [msgs, setMsgs] = useState<any>([]);
  const [userId, setUserId] = useState<string>("");

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/message/${authUser?._id}`); // Ensure senderId is included in the request
        // console.log("res",res);
        if (res.status !== 200) {
          console.error("There was an Error fetching messages");
        } else {
          // Properly handle the response structure (res.data.messages)
          setMessage(res.data.messages);
        }

        console.log(messages)
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };


  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/user/currentChats");
      if (response.status === 200) {
        setChats(response.data);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <>
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 h-screen border-r border-border bg-background flex flex-col"
      >
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-lg text-foreground">Messages</h2>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="h-9 w-9"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Separator />

        <ScrollArea className="flex-1">
          <div className="p-2">
            {loading ? (
              <div className="space-y-2">
                {[...Array(8)].map((_, i) => (
                  <UserSkeleton key={i} />
                ))}
              </div>
            ) : chats.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <MessageSquare className="h-12 w-12 mb-2 text-primary opacity-50" />
                <p className="font-medium text-foreground">Welcome, {authUser.username}!</p>
                <p className="text-sm text-muted-foreground">Start chatting with others</p>
              </div>
            ) : (
              <div className="space-y-1">
                {
                  chats.map((chat) => (
                    <UserCard
                      key={chat._id}
                      user={chat}
                      onClick={() => {
                        setSelectedConversation(chat);
                        fetchMessages()
                      }}
                    />
                  ))
                }
              </div>
            )}
          </div>
        </ScrollArea>
      </motion.div>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Sidebar;