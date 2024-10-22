// components/SidebarHeader.tsx
import React from 'react';
import { MessageSquare, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarHeaderProps {
  onSearchClick: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onSearchClick }) => (
  <div className="flex items-center justify-between p-4 space-y-4">
    <div className="flex items-center space-x-2">
      <MessageSquare className="h-5 w-5 text-primary" />
      <h2 className="font-semibold text-lg text-foreground">Messages</h2>
    </div>
    <Button 
      variant="ghost" 
      size="icon"
      onClick={onSearchClick}
      className="h-9 w-9"
    >
      <Search className="h-5 w-5" />
    </Button>
  </div>
);

export default SidebarHeader;
