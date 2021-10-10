import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { getCurrentUser } from 'lib/api/auth'
import { User } from 'interfaces/index'

function App() {

  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res.data.isLoding === true) {
        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        console.log(res.data.data)
      } else {
        console.log("No Current User")
      }
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <></>
    }
  }

  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <CommonLayout>
          <Switch>
            <Route exact path="/signup" component={SingUp} />
            <Route exact path="/signin" component={SingIn} />
            <Private>
              <Route exact path="/" component={Home} />
            </Private>
          </Switch>
        </CommonLayout>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
