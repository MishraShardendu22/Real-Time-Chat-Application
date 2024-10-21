import MessageContainer from "./components/MessageContainer.tsx"
import Navbar from "./components/navbar.tsx"
import Sidebar from "./components/Sidebar.tsx"

const Home = () => {
  return (
    <>
      <Navbar />  
      <Sidebar/>
      <MessageContainer/>
    </>
  )
}

export default Home
