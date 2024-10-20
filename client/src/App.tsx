import { Routes, Route } from "react-router-dom";
import Login from "./login/login.tsx";
import Register from "./register/register.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";
import { Toaster } from "sonner";
import { Boxes } from "./components/ui/background-boxes.tsx";

const App = () => {
  return (
    <AuthContextProvider>
      {/* routes for login and register start here*/}
      <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,grey)] pointer-events-none" />
        <Boxes />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      {/* routes for login and register end here*/}

{/* -------------------------------------------------------------------------------------------------------------------------------------------- */}

      {/* routes for the rest of the app start here*/}

      {/* routes for the rest of the app end here*/}
      <Toaster />
    </AuthContextProvider>
  );
}

export default App;
