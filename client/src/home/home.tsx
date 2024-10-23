// Home.tsx or Layout.tsx
import React from 'react';
import Navbar from './components/navbar';
import SearchBar from './components/SearchBar';


const Home: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <SearchBar />
    </div>
  );
};

export default Home;
