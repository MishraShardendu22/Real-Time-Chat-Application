/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Define a proper type for the state to avoid 'any' usage
interface UserConversationState {
    selectedConversation: any;
    setSelectedConversation: (selectedConversation: any) => void; // Specify string or null
    messages: any[]; // You can also define a Message type here
    setMessage: (messages: any[]) => void;
}

const userConversation = create<UserConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessage: (messages) => set({ messages }),
}));

export default userConversation;
