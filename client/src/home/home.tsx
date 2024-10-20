import { useAuth } from "@/context/authContext"

const Home = () => {
  const authContext = useAuth()
  if (!authContext) {
    return <div>Loading...</div>
  }
  const { authUser } = authContext

   return (
    <div>
      <h1 className="text-3xl ">Hi {authUser.username}</h1>
    </div>
  )
}

export default Home
