/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import SearchResults from './SearchResult';

interface User {
  _id: string;
  username: string;
  email: string;
}

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`/api/user/search?search=${searchInput}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearchResults();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      <SearchResults searchResults={searchResults} />
    </div>
  );
};

export default SearchBar;
