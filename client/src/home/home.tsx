// Home.tsx or Layout.tsx
import React from 'react';
import Navbar from './components/navbar';
import SearchBar from './components/SearchBar';
import SideBar from './components/Sidebar';


const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <SearchBar />
      <SideBar />
    </div>
  );
};

export default Home;
