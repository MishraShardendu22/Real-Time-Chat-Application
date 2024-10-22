/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import UserCard from './UserCard';
import UserSkeleton from './UserSkeleton';
import SidebarHeader from './SidebarHeader';
import SearchModal from './SearchModal';
import { useAuth } from "@/context/authContext";
import userConversation from "@/zustand/useConversation";

const Sidebar: React.FC = () => {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { setAuthUser } = authContext;
  const { setSelectedConversation } = userConversation();
  const [loading, setLoading] = useState<boolean>(false);
  const [chats, setChats] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

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
      <div className="w-64 h-screen border-r border-border bg-background flex flex-col">
        <SidebarHeader onSearchClick={() => setSearchOpen(true)} />
        <Separator />
        <ScrollArea className="flex-1 p-2">
          {loading ? (
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <UserSkeleton key={i} />
              ))}
            </div>
          ) : chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <p>No chats available</p>
            </div>
          ) : (
            chats.map((chat) => (
              <UserCard
                key={chat._id}
                user={chat}
                onClick={() => setSelectedConversation(chat._id)}
              />
            ))
          )}
        </ScrollArea>
      </div>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
};

export default Sidebar;
