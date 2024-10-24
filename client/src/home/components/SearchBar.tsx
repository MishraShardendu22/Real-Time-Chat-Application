import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, ArrowLeft } from 'lucide-react';
import SearchResults from './SearchResult';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface User {
  _id: string;
  fullname: string;
  username: string;
  gender: string;
  email: string;
  profilepic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fetchSearchResults = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/user/search?search=${searchInput}`);
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSearchResults();
  };

  const handleBack = () => {
    setShowResults(false);
    setSearchInput('');
  };

  const handleClose = () => {
    setIsSearchOpen(false);
    setShowResults(false);
    setSearchInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Button 
        onClick={() => setIsSearchOpen(true)}
        className="flex items-center gap-2"
      >
        <Search className="h-4 w-4" />
        Search Users
      </Button>

      <Dialog open={isSearchOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              {showResults ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="mr-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              ) : null}
              <DialogTitle>{showResults ? 'Search Results' : 'Search Users'}</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
              >
              </Button>
            </div>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {!showResults && (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="relative flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search users..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="pl-10 w-full"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !searchInput.trim()}
                    className="min-w-[100px]"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      'Search'
                    )}
                  </Button>
                </div>
              </form>
            )}

            <AnimatePresence mode="wait">
              {showResults && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4"
                >
                  <SearchResults searchResults={searchResults} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBar;