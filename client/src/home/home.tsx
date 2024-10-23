// Home.tsx or Layout.tsx
import React from 'react';
import Navbar from './components/navbar';
import SearchBar from './components/SearchBar';
import SideBar from './components/Sidebar';
import SendMessage from './components/SendMessage';
import MessageBox from './components/MessageBox';


const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <SearchBar />
      <SideBar />
      <SendMessage />
      <MessageBox />
    </div>
  );
};

export default Home;
