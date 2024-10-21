import MessageContainer from "./components/MessageContainer.tsx"
import Navbar from "./components/navbar.tsx"
import Sidebar from "./components/Sidebar.tsx"

const Home = () => {
  return (
    <div>
      <Navbar />
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home
