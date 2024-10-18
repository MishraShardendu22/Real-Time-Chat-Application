/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageCircle, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Boxes } from "@/components/ui/background-boxes";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { SIGNUP_ROUTE,LOGIN_ROUTE } from "@/utils/constants";

const Auth = () => {
  const [Lpass, setLpass] = useState("");
  const [Lemail, setLemail] = useState("");

  const [Spass, setSpass] = useState("");
  const [Semail, setSemail] = useState("");
  const [SconfirmPass, setSconfirmPass] = useState("");

  const validateSignUp = () => {
    if (SconfirmPass !== Spass) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateSignUp()) {
      try {
        await apiClient.post(SIGNUP_ROUTE, {
          email: Semail,
          password: Spass,
          // if we dont set with credentials to true then the cookie wont be sent 
          // we wont be able to create a session 
          },{ 
            withCredentials: true,
          }
        ); 
        toast.success("You have successfully registered!");
      } catch (error) {
        toast.error("Registration failed. Please try again.");
      }
    }
  };
  

  const handleLogIn = async (event: React.FormEvent) => {
    event.preventDefault();
    try{
      console.log(LOGIN_ROUTE)
      await apiClient.post(LOGIN_ROUTE,{
        email: Lemail,
        password: Lpass,
      },{withCredentials:true});
    }catch(error){
      toast.error("Login failed. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex-col rounded-lg flex items-center justify-center min-h-screen ">
      <div className="absolute inset-0 w-full h-full  z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Card className="w-[400px] shadow-2xl rounded-lg overflow-hidden bg-gray-700 text-white">
          <CardHeader className="space-y-1 text-center bg-gray-800 p-8">
            <motion.div
              className="flex items-center justify-center space-x-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MessageCircle className="h-10 w-10 text-blue-400" />
              <CardTitle className="text-4xl font-bold text-blue-400">TeleChat</CardTitle>
            </motion.div>
            <CardDescription className="text-gray-300 mt-2">Welcome to the future of communication</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <Tabs defaultValue="Log-in" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-800 rounded-lg p-1">
                <TabsTrigger value="Log-in" className="text-sm font-medium transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white">Log In</TabsTrigger>
                <TabsTrigger value="Sign-up" className="text-sm font-medium transition-all data-[state=active]:bg-blue-500 data-[state=active]:text-white">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="Sign-up">
                <form onSubmit={handleSignUp} className="space-y-6">
                  <motion.div variants={inputVariants} className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      onChange={(event) => setSemail(event.target.value)}
                      type="email"
                      placeholder="E-mail"
                      value={Semail}
                      required
                      autoComplete="email"
                    />
                  </motion.div>
                  <motion.div variants={inputVariants} className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      onChange={(event) => setSpass(event.target.value)}
                      type="password"
                      placeholder="Password"
                      value={Spass}
                      required
                      autoComplete="new-password"
                    />
                  </motion.div>
                  <motion.div variants={inputVariants} className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      onChange={(event) => setSconfirmPass(event.target.value)}
                      type="password"
                      placeholder="Confirm Password"
                      value={SconfirmPass}
                      required
                      autoComplete="new-password"
                    />
                  </motion.div>
                  <motion.div 
                    variants={inputVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition duration-200 text-lg">
                      Create Account
                    </Button>
                  </motion.div> 
                </form>
              </TabsContent>

              <TabsContent value="Log-in">
                <form onSubmit={handleLogIn} className="space-y-6">
                  <motion.div variants={inputVariants} className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      onChange={(event) => setLemail(event.target.value)}
                      type="email"
                      placeholder="E-mail"
                      value={Lemail}
                      required
                      autoComplete="email"
                    />
                  </motion.div>
                  <motion.div variants={inputVariants} className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      onChange={(event) => setLpass(event.target.value)}
                      type="password"
                      placeholder="Password"
                      value={Lpass}
                      required
                      autoComplete="current-password"
                    />
                  </motion.div>
                  <motion.div 
                    variants={inputVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button type="submit" className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition duration-200 text-lg">
                      Sign In
                    </Button>
                  </motion.div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-sm text-center text-gray-400 bg-gray-800 p-6">
            Secure, fast, and always connected
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
