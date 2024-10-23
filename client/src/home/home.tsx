// Home.tsx or Layout.tsx
import React from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/Sidebar';
import MessageContainer from './components/MessageContainer';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 bg-gray-700 p-4">
          <MessageContainer/>
        </div>
      </div>
    </div>
  );
};

export default Home;
