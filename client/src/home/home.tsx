import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/navbar';
import SearchBar from './components/SearchBar';
import SideBar from './components/Sidebar';
import SendMessage from './components/SendMessage';
import MessageBox from './components/MessageBox';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-screen bg-gray-50"
    >
      {/* Navbar - Fixed at top */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Sidebar */}
        <motion.div 
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-full max-w-sm border-r bg-white/50 backdrop-blur-sm flex flex-col h-full"
        >
          {/* Search Section */}
          <div className="p-4 border-b">
            <SearchBar />
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-hidden">
            <SideBar />
          </div>
        </motion.div>

        {/* Main Chat Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 flex flex-col bg-white/30 backdrop-blur-sm"
        >
          {/* Messages Container */}
          <div className="flex-1 overflow-hidden p-4">
            <MessageBox />
          </div>

          {/* Message Input - Fixed at bottom */}
          <div className="border-t bg-white/50 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto">
              <SendMessage />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;