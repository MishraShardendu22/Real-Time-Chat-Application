// Home.tsx or Layout.tsx
import React from 'react';
import Navbar from './components/navbar';
import SearchBar from './components/SearchBar';
import SideBar from './components/Sidebar';
import SendMessage from './components/SendMessage';


const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <SearchBar />
      <SideBar />
      <SendMessage />
    </div>
  );
};

export default Home;
