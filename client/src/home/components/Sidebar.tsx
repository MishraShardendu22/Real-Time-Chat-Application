/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import userConversation from "../../zustand/useConversation";


const SideBar = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState<string | null>(null);

  const { setSelectedConversation } = userConversation(); 

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/user/currentChats");
      console.log(response);
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch chats.");
    }
  };


  const handleClick = (user: any) => { 
    console.log(user);
    setSelectedConversation(user);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : data.length > 0 ? (
        data.map((user: any) => (
          <div
            key={user._id}
            onClick={() => handleClick(user)} 
            style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
          >
            <h3>{user.fullname}</h3>
            <p>{user.username}</p>
          </div>
        ))
      ) : (
        <p>No chats</p>
      )}
    </div>
  );
};

export default SideBar;
