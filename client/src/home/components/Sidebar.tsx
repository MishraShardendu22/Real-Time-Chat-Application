import { useState, useEffect } from "react";
import axios from "axios";

interface Chat {
  _id: string;
  fullname: string;
  username: string;
}

const SideBar = () => {
  const [data, setData] = useState<Chat[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : data.length > 0 ? (
        data.map((chat) => (
          <div key={chat._id}>
            <h3>{chat.fullname}</h3>
            <p>{chat.username}</p>
          </div>
        ))
      ) : (
        <p>No chats</p>
      )}
    </div>
  );
};

export default SideBar;
