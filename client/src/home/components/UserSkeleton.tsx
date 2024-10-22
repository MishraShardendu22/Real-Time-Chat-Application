// components/UserSkeleton.tsx
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const UserSkeleton: React.FC = () => (
  <div className="flex items-center space-x-4 p-4">
    <Skeleton className="h-10 w-10 rounded-full" />
    <Skeleton className="h-4 w-[120px]" />
  </div>
);

export default UserSkeleton;
