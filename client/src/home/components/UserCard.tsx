// components/UserCard.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface User {
  _id: string;
  username: string;
  fullname: string;
  profilepic: string;
}

interface UserCardProps {
  user: User;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => (
  <motion.div
    whileHover={{ backgroundColor: "rgba(169, 169, 169, 1)" }}
    onClick={onClick}
    className="p-3 rounded-lg cursor-pointer"
  >
    <div className="flex items-center space-x-3">
      <img
        src={user.profilepic}
        alt={`${user.username}'s profile`}
        className="w-10 h-10 rounded-full object-cover border border-border"
      />
      <span className="font-medium text-sm text-foreground">
        {user.fullname || user.username}
      </span>
    </div>
  </motion.div>
);

export default UserCard;
