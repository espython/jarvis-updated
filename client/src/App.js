import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routes/PrivateRoute'
import ContextProvider, { AppConsumer } from './ContextProvider'
import Layout from './components/layout'
import { Home, Profile, Call, Landing, NotFound } from './components/pages'
import { Login, Register } from './components/auth'

// Check for token to keep user logged in

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  // Decode token and get user info and exp
  const decoded = jwtDecode(token)
  // Set user and isAuthenticated
  console.log('Decoded-from-App.js == ', decoded)
  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    console.log('Log out user')
    // Redirect to login
    window.location.href = './login'
  }
}

function App (decoded) {
  return (
    <ContextProvider>
      <Router>
        <Layout className='App'>
          <Fragment>
            <Switch>
              <Route exact path='/' render={props => <Landing {...props} />} />
              <Route path='/call' component={Call} />

              <Route path='/login' render={props => <Login {...props} />} />

              <Route path='/signup' render={props => <Register {...props} />} />

              <PrivateRoute exact path='/home' component={Home} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Fragment>
        </Layout>
      </Router>
    </ContextProvider>
  )
}

export default App
