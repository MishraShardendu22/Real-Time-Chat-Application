import React from 'react';
import userConversation from "../../zustand/useConversation.ts";

// Define the User interface
interface User {
  _id: string;
  fullname: string;
  username: string;
  email: string;
  gender: string;
  profilepic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the props interface for SearchResults component
interface SearchResultsProps {
  searchResults: User[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  const { setSelectedConversation } = userConversation();

  const handleClick = async (user: User) => {
    console.log(user);
    const { _id, username, profilepic, gender } = user;
    setSelectedConversation({ _id, username, profilePic: profilepic, gender });
  };

  return (
    <div>
      {searchResults.length > 0 && (
        <div>
          {searchResults.map((user) => (
            <div
              onClick={() => handleClick(user)}
              key={user._id}
              style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
            >
              <h3>{user.username}</h3>
              <p>{user.email}</p>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
