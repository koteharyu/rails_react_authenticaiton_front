import { useContext } from 'react'

import { AuthContext } from 'App'

const Home: React.FC = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext)

  return (
    <>
      {
        isSignedIn && currentUser ? (
          <>
            <h1>Singed in !!</h1>
            <h2>Email: {currentUser.email}</h2>
            <h2>Name: {currentUser.name}</h2>
          </>
        ) : (
          <h1>NOT SIGNED IN</h1>
        )
      }
    </>
  )
}

export default Home

