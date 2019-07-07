import React, { Component } from 'react'

export const AppContext = React.createContext()
export const AppConsumer = AppContext.Consumer

class ContextProvider extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      errors: null,
      userData: null,
      posts: null,
      userPosts: null,
      userAvatar: null
    }
  }

  render () {
    const { children } = this.props
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          setError: error => this.setState({ errors: error }),
          setUserData: userData => this.setState({ userData }),
          setAuth: isAuth => this.setState({ isAuthenticated: isAuth }),
          setPosts: posts => {
            this.setState({ posts })
          },
          setProfilePosts: userPosts => this.setState({ userPosts }),
          setUserAvatar: userAvatar => this.setState({ userAvatar })
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}

export default ContextProvider
