// components/SearchModal.tsx
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';
import { Search, Users, X } from "lucide-react";
import UserCard from './UserCard';  // Reuse UserCard
import UserSkeleton from './UserSkeleton';  // Reuse UserSkeleton
import axios from 'axios';
import userConversation from "@/zustand/useConversation";

interface User {
  _id: string;
  username: string;
  fullname: string;
  profilepic: string;
}

const SearchModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { setSelectedConversation } = userConversation();
  const [searchUser, setSearchUser] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [searchedUser, setSearchedUser] = useState<User[]>([]);

  const handleSearch = async () => {
    if (searchUser) {
      setSearchLoading(true);
      setSearchedUser([]);
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
                    setSelectedConversation(user._id);
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

export default SearchModal;
