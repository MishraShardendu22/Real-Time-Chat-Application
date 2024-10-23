import React from 'react';
import { motion } from 'framer-motion';
import { Mail, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "../../components/ui/background-gradient";
import userConversation from "../../zustand/useConversation.ts";

const ProfileReceiver = () => {
  const { selectedConversation } = userConversation();
  const navigate = useNavigate();
  const { _id, fullname, username, gender, profilepic } = selectedConversation;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 0.5
      }
    }
  };

  return (
    <div className="min-h-1/2-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="z-10 mx-9 my-9 absolute top-4 left-4 sm:top-8 sm:left-8"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/")}
          className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          <p className="sr-only">Back to Home</p>
        </Button>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        <BackgroundGradient>
          {/* Adjusted padding to reduce height */}
          <Card className="w-full bg-white dark:bg-gray-800 shadow-2xl overflow-hidden rounded-2xl border-t-4 border-blue-500 dark:border-blue-400">
            <CardHeader className="pt-4 relative pb-0"> {/* Changed pt-8 to pt-4 */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <Avatar className="h-32 w-32 mb-4 ring-4 ring-blue-400 dark:ring-blue-500 shadow-lg">
                  <AvatarImage src={profilepic} alt={username} />
                  <AvatarFallback className="text-4xl font-bold bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                    {username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-3xl font-extrabold text-center mb-2 text-gray-800 dark:text-gray-100">
                  {fullname}
                </CardTitle>
                <Badge variant="secondary" className="mb-4 px-4 py-1 text-lg font-semibold bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                  Username: {username}
                </Badge>
              </motion.div>
            </CardHeader>
            <CardContent className="pt-4 pb-6 px-6">
              <motion.div variants={itemVariants} className="space-y-4">
                <ProfileItem icon={<Mail className="text-blue-500" size={24} />} label="Email" text={username} />
                <ProfileItem icon={<User className="text-green-500" size={24} />} label="User ID" text={_id} />
                <ProfileItem icon={<User className="text-purple-500" size={24} />} label="Gender" text={gender} />
              </motion.div>
            </CardContent>
          </Card>
        </BackgroundGradient>
      </motion.div>
    </div>
  );
};

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  text: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, label, text }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md transition-all duration-200 ease-in-out hover:shadow-lg"
  >
    <div className="flex-shrink-0 bg-white dark:bg-gray-600 p-2 rounded-full shadow-inner">
      {icon}
    </div>
    <div className="flex-grow">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-lg font-semibold text-gray-900 dark:text-white">{text}</p>
    </div>
  </motion.div>
);

export default ProfileReceiver;
