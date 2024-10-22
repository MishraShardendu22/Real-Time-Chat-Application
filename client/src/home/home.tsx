// Home.tsx or Layout.tsx
import React from 'react';
import Sidebar from './components/Sidebar'; // Your sidebar component
import MessageContainer from './components/MessageContainer'; // The message container we just created

const Home: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = React.useState(null);

  return (
    <div className="flex h-screen">
      <Sidebar setSelectedConversation={setSelectedConversation} />
      <div className="flex-1">
        <MessageContainer
          selectedConversation={selectedConversation}
          onBackUser={() => setSelectedConversation(null)}
        />
      </div>
    </div>
  );
};

export default Home;
