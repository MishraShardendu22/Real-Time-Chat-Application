import React from 'react';

interface User {
  _id: string;
  username: string;
  email: string;
}

interface SearchResultsProps {
  searchResults: User[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <div>
      {searchResults.length > 0 && (
        <div>
          {searchResults.map((user) => (
            <div key={user._id}>
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
