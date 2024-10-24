/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Define a Message type for better type safety
interface Message {
    senderId: string;
    receiverId: string;
    message: string;
}

interface UserConversationState {
    selectedConversation: {
      participants: any; _id: string; username: string; profilePic: string; gender: string 
} | null;
    setSelectedConversation: (selectedConversation: { _id: string; username: string; profilePic: string; gender: string } | null) => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
}

const userConversation = create<UserConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default userConversation;